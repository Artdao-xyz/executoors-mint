import { Fuel, Provider } from 'fuels';
import type { Account, CoinQuantity, FuelConnector } from 'fuels';
import { updateStoreBooleanField, updateStoreStringField } from '$store/updateStoreField';
import { PUBLIC_WCPROJECT_ID, PUBLIC_PROVIDER_URL } from '$env/static/public';

import type { WalletButton } from '$store/WalletButtonsStore';
import WalletButtonStore from '$store/WalletButtonsStore';
import walletStore from '$store/walletStore';

let fuel: Fuel;
let buttons: WalletButton[] = [];

let buttonsInitialized = false;

export const initFuels = async () => {
	console.log('initFuels');

	const { defaultConnectors } = await import('@fuels/connectors');

	const {
		FuelWalletConnector,
		FueletWalletConnector,
		WalletConnectConnector,
		SolanaConnector,
		BakoSafeConnector
	} = await import('@fuels/connectors');

	const provider = await Provider.create(PUBLIC_PROVIDER_URL.toString());

	fuel = new Fuel({
		connectors: [
			new FuelWalletConnector(),
			new FueletWalletConnector(),
			new BakoSafeConnector(),
			new WalletConnectConnector({
				fuelProvider: provider,
				projectId: PUBLIC_WCPROJECT_ID
			}),

			new SolanaConnector({
				fuelProvider: provider,
				projectId: PUBLIC_WCPROJECT_ID
			})

			/*
			...defaultConnectors({
				wcProjectId: PUBLIC_WCPROJECT_ID
			})
			*/
		]
	});

	console.log('connectors at init', fuel.connectors());

	buttons = initButtons();

	buttons = initButtonsConnectors(await fuel.connectors());

	WalletButtonStore.update((state) => {
		return { ...state, buttons: buttons, initialized: true };
	});

	buttonsInitialized = true;

	fuel?.on(fuel.events.connection, handleConnectEvent);
	fuel?.on(fuel.events.accounts, handleAccountsEvent);
	fuel?.on(fuel.events.currentAccount, handleCurrAccountEvent);
	fuel?.on(fuel.events.currentNetwork, handleCurrNetworkEvent);
	fuel?.on(fuel.events.networks, handleNetworksEvent);
	fuel?.on(fuel.events.connectors, handleConnectorsEvent);

	console.log('buttonsArray at init', buttons);
};

const initButtonsConnectors = (connectors: FuelConnector[]): WalletButton[] => {
	console.log('initialize button Connectors');

	buttons = connectors.map((connector) => {
		const button = buttons.find((btn) => btn.name === connector.name);

		if (button) {
			return { ...button, available: connector.installed };
		} else {
			return {
				name: connector.name,
				image: connector.metadata.image as string,
				available: connector.installed,
				install_url: ''
			};
		}
	});

	return buttons;
};

const handleConnectorsEvent = async (connectors: string[]) => {
	console.log('handleConnectorsEvent', connectors);

	//if (!buttonsInitialized) {
	console.log('initialize buttons');
	const cons = await fuel?.connectors();

	buttons = cons.map((connector) => {
		const button = buttons.find((btn) => btn.name === connector.name);

		if (button) {
			return { ...button, available: connector.installed };
		} else {
			return {
				name: connector.name,
				image: connector.metadata.image as string,
				available: connector.installed
			};
		}
	});

	WalletButtonStore.update((state) => {
		return { ...state, buttons: buttons, initialized: true };
	});

	//console.log('buttonsArray at connectors handle', buttons);
	//buttonsInitialized = true;
	//}
};

const handleConnectEvent = (connected: boolean) => {
	console.log('handleConnectEvent', connected);
};

const handleAccountsEvent = async (accounts: string[]) => {
	console.log('handleAccountsEvent', accounts);
};

const handleCurrAccountEvent = async (account: string) => {
	console.log('handleCurrAccountEvent', account);
	//const wallet = await fuel.getWallet(account);
	//TODO: check return values "0x... or fuel... adresses"
	updateStoreStringField(walletStore, 'currentAccount', account);
};

const handleCurrNetworkEvent = (network: string) => {
	console.log('handleCurrNetworkEvent', network);
};

const handleNetworksEvent = (networks: string[]) => {
	console.log('handleNetworksEvent', networks);
};

export const selectWalletByName = async (name: string): Promise<boolean> => {
	let isSelected = false;

	try {
		isSelected = await fuel.selectConnector(name);
		updateStoreStringField(walletStore, 'walletType', name);

		console.log(name, ' selected: ', isSelected);
	} catch (e) {
		console.log(e);
		return false;
	}

	return isSelected;
};

export const connectWallet = async (): Promise<boolean> => {
	let connectionState: boolean = false;
	try {
		connectionState = await fuel.connect();
		updateStoreBooleanField(walletStore, 'isConnected', connectionState);
	} catch (e) {
		console.log(e);
	}

	try {
		const currentAccount = await getCurrentAccount();
		if (currentAccount) {
			updateStoreStringField(walletStore, 'currentAccount', currentAccount);
			const wallet: Account = await fuel.getWallet(currentAccount);

			walletStore.update((state) => {
				return { ...state, account: wallet };
			});

			console.log('wallet  ', wallet);
			console.log('fuel wallet address', wallet.address.toString());
		}
	} catch (e) {
		console.log(e);
	}

	console.log('connects');

	return connectionState;
};

export const getCurrentAccount = async (): Promise<string | null> => {
	const account = await fuel.currentAccount();
	console.log('account', account);

	return await fuel.currentAccount();
};

export const disconnectWallet = async (): Promise<boolean> => {
	const connectionState = await fuel.disconnect();

	updateStoreBooleanField(walletStore, 'isConnected', false);
	updateStoreStringField(walletStore, 'walletType', '');
	updateStoreStringField(walletStore, 'currentAccount', '');

	console.log('disconnects');
	return connectionState;
};

export const getEthBalance = async (): Promise<string | null> => {
	let balance: string | null = null;
	try {
		const currentAccount = await getCurrentAccount();
		if (currentAccount) {
			const wallet = await fuel.getWallet(currentAccount);

			const balances: CoinQuantity[] = (await wallet.getBalances()).balances;
			console.log('balances', balances);

			const ETHbalance = await wallet.getBalance(
				'0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07'
			);

			balance = ETHbalance.format();
		}
	} catch (e) {
		console.log(e);
	}
	return balance;
};

const initButtons = (): WalletButton[] => {
	return [
		{
			name: 'Fuel Wallet',
			image: '/walletLogos/fuel-wallet.png',
			available: false,
			install_url: 'https://wallet.fuel.network/docs/install/'
		},
		{
			name: 'Fuelet Wallet',
			image: '/walletLogos/fuelet-wallet.png',
			available: false,
			install_url: 'https://fuelet.app/download/'
		},
		{
			name: 'Solana Wallets',
			image: '/walletLogos/solana-wallets.png',
			available: false,
			install_url: 'https://solana.com/docs/intro/wallets'
		},
		{
			name: 'Ethereum Wallets',
			image: '/walletLogos/ethereum-wallets.png',
			available: false,
			install_url: 'https://ethereum.org/en/wallets/'
		},
		{
			name: 'Bako Safe',
			image: '/walletLogos/bako-safe-wallet.png',
			available: false,
			install_url: 'https://safe.bako.global/'
		}
	];
};