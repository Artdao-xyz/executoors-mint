import walletStore from '$store/walletStore';
import { PUBLIC_COLLECTION_ID } from '$env/static/public';
import { Account, Wallet, Provider } from 'fuels';
import { PropsSDK, Collection, type MintResult } from '@props-labs/fuels';
import MintTransactionStore from '$store/MintTransactionStore';
import { transactionStatusType } from '$store/MintTransactionStore';
import {
	PUBLIC_TOTAL_SUPPLY,
	PUBLIC_DISPOSABLE_PRIVATE_KEY,
	PUBLIC_PROVIDER_URL
} from '$env/static/public';

let walletSubscripted: Account;
let propsClient: PropsSDK;
let collection: Collection;

const GATEWAY = 'https://ipfs.filebase.io/ipfs/';

//TODO: fix this typing.
walletStore.subscribe((state) => {
	walletSubscripted = state.account || walletSubscripted;
});

const handleSubmit = async (image: string, mintNumber: number) => {
	const response = await fetch('/api/bot-proxy', {
		method: 'POST',
		headers: {
			'Content-Type': 'text/plain'
		},
		body: `${image},${mintNumber}`
	});
	return response;
};

export const mintFromCollection = async (amount: number): Promise<number[]> => {
	if (!propsClient) {
		propsClient = new PropsSDK({
			network: 'testnet'
		});
	}
	// console.log('Minting from collection function called');

	const wallet: Account = walletSubscripted as Account;
	// console.log('wallet', wallet);

	collection = await Collection.fromContractIdAndWallet(PUBLIC_COLLECTION_ID, wallet);

	// console.log('total mints', await getTotalMints(collection));

	// console.log('events0 :', propsClient.editions.events);

	addCollectionEventListener(collection);

	MintTransactionStore.update((state) => {
		return { ...state, status: transactionStatusType.started };
	});

	const res = await collection.mint(wallet.address.toString(), amount);
	// console.log('collection mint res', res);

	const subIds = ((res as MintResult).transactionResult.mintedAssets as { subId: string }[]).map(
		(asset) => {
			return parseInt(asset.subId.slice(2), 16);
		}
	);
	// console.log('hexSubId:', subIds);

	let status: transactionStatusType = (res as MintResult).transactionResult.isStatusSuccess
		? transactionStatusType.confirmed
		: transactionStatusType.failed;

	// console.log('transaction status: ', status);
	MintTransactionStore.update((state) => {
		return { ...state, status };
	});

	let mintedTokenIds: number[] = subIds;

	const uri: string = collection.baseUri ?? '';
	//console.log('baseUri:', uri);

	const metadata = await fetchMetadata(uri, mintedTokenIds[0]);
	const imageUrl = getImageUrl(metadata, GATEWAY);

	//console.log('image url:', imageUrl);

	const response = handleSubmit(imageUrl, mintedTokenIds[0]);
	// console.log('handle response:', response);

	return mintedTokenIds;
};

async function fetchMetadata(cid: string, id: number) {
	cid = cid.replace('ipfs://', '');

	const url = `https://ipfs.filebase.io/ipfs/${cid}/${id}.json`;
	// console.log('fetching metadata from:', url);
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch metadata');
	}
	return await response.json();
}

function getImageUrl(metadata: any, gateway: string) {
	//console.log('metadata from filebase:', metadata);

	if (!metadata.image) {
		throw new Error('Image URL not found in metadata');
	}
	const imageCid = metadata.image.replace('ipfs://', '');
	//console.log('imageCid:', imageCid);

	return `${gateway}${imageCid}`;
}

//TODO: events not firing...
function addCollectionEventListener(collection: Collection) {
	// console.log('Adding event listeners for collection:');

	collection.on('error', (data) => {
		// console.log('Event catched:  ERROR: ', collection);
		// console.log(data);

		MintTransactionStore.update((state) => {
			return { ...state, status: transactionStatusType.failed };
		});
	});

	collection.on('transaction', (data) => {
		// console.log('Event: Transaction waiting for approval: ', collection);
		// console.log(
		// 	'Transaction: ',
		// 	data.transactionIndex,
		// 	data.transactionCount,
		// 	data.transactionHash
		// );
		MintTransactionStore.update((state) => {
			return { ...state, status: transactionStatusType.awaitingConfirmation };
		});
	});

	collection.on('waiting', (data) => {
		// console.log('Event: Waiting for transaction to clear:', data);
		MintTransactionStore.update((state) => {
			return { ...state, status: transactionStatusType.pending };
		});
	});
	// console.log('adds events');
}

async function getTotalMints(collection: Collection): Promise<number> {
	return (await collection.getTotalAssets()) as number;
}

export async function getAvailableMints(): Promise<any> {
	const collectionTemp = collection || (await getCollectionWithFixedWallet());
	return Number(PUBLIC_TOTAL_SUPPLY) - (await getTotalMints(collectionTemp));
}

async function getCollectionWithFixedWallet() {
	const provider = await Provider.create(PUBLIC_PROVIDER_URL.toString());
	const walletFixed = Wallet.fromPrivateKey(PUBLIC_DISPOSABLE_PRIVATE_KEY.toString(), provider);
	walletFixed.connect(provider);

	collection = await Collection.fromContractIdAndWallet(PUBLIC_COLLECTION_ID, walletFixed);

	return collection;
}
