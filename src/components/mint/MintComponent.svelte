<script lang="ts">
	import walletStore from '$store/walletStore';
	import { mintFromCollection, getAvailableMints } from '$lib/props-mint';
	import MintTransactionStore, { transactionStatusType } from '$store/MintTransactionStore';
	import { PUBLIC_MINT_PRICE, PUBLIC_IPFS_ADDRESS } from '$env/static/public';
	import { getEthBalance } from '$lib/web3';
	import { onMount } from 'svelte';

	let lastMintedTokenId: number[];
	let amount: number = 1;
	let enoughFunds: boolean = true;
	let availableAssets: number;
	let price: number = parseFloat(PUBLIC_MINT_PRICE);
	
    $: total  = price * amount;

	onMount(async () => {
		// availableAssets = await getAvailableMints();
		// console.log('Available assets on mount:', availableAssets);

		// $MintTransactionStore.status[4]
		// console.log(`${PUBLIC_IPFS_ADDRESS}${lastMintedTokenId[0].toString().padStart(4, '0')}.png`);
	});

	async function handleCollectionMint(): Promise<void> {

		let ethBalance = await getEthBalance();
		// console.log('ETH balance:', ethBalance);
		if (!ethBalance || Number(ethBalance) < amount * price) {
			// alert('Not enough funds to execuute');
			enoughFunds = false
		}

		// console.log('Minting from collection ', amount, ' tokens');
		lastMintedTokenId = await mintFromCollection(amount);

		// console.log('lastMintedTokenId', lastMintedTokenId);

		await updateMintStatus(lastMintedTokenId);
		availableAssets = await getAvailableMints();
	}

	async function updateMintStatus(editions: number[]) {
		try {
			const response = await fetch('/api/artworks/mint', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ editions })
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			// console.log('Record updated successfully:', result);
			return result;
		} catch (error) {
			console.error('Error updating record:', error);
			throw error;
		}
	}

	  // Function to reset the transaction status
	function resetTransactionStatus() {
		MintTransactionStore.update(currentState => ({
		...currentState, // Keep existing state properties
		status: transactionStatusType.idle // Update status to 'not started'
		}));
	}

	function validateInput(): void {
		const value: number = parseInt(String(amount), 10);
		if (!isNaN(value)) {
			amount = Math.min(6, Math.max(1, value));
		}
	}

	async function downloadAllImages() {
        for (const tokenId of lastMintedTokenId) {
            const imageUrl = `${PUBLIC_IPFS_ADDRESS}${tokenId.toString().padStart(4, '0')}.png`;
            
            try {
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                
                const link = document.createElement('a');
                link.href = url;
                link.download = `executoor_${tokenId.toString()}.png`;

                document.body.appendChild(link);
                link.click();

                // Cleanup
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error(`Error downloading the image for token ${tokenId}:`, error);
            }
        }
    };

	// $: console.log('$MintTransactionStore.status', $MintTransactionStore.status)
</script>


<div class="relative w-64 h-64 lg:w-72 2xl:w-96 lg:h-72 2xl:h-96 p-9 2xl:p-14">
	{#if lastMintedTokenId && $MintTransactionStore.status === "executioon confirmed"}
	<img class="absolute inset-0 w-full h-full object-contain" src="/media/frame.png" alt="artwork">
	<img class="select-none w-full h-full object-cover object-top" src={`${PUBLIC_IPFS_ADDRESS}${lastMintedTokenId[0].toString().padStart(4, '0')}.png`} alt="tbd executoor">
	{:else}
	<img class="absolute inset-0 w-full h-full object-contain" src="/media/frame.png" alt="artwork">
	<img class="select-none w-full h-full object-contain" src="/media/tbd.png" alt="tbd executoor">
	{/if}
</div>
{#if lastMintedTokenId}
<p class="uppercase text-xl font-bold text-right">
	<span>executoor #{lastMintedTokenId[0]}</span>
	{#if lastMintedTokenId.length>1}
		<span>& friends</span>
	{/if}
	</p>
{/if}

<div class="flex flex-col items-center justify-center gap-1">
	<!-- {#if $walletStore.isConnected}
		{#if $MintTransactionStore.status !== 'executioon confirmed'}
			<input
				type="number"
				bind:value={amount}
				on:input={validateInput}
				min="1"
				max="3"
				step="1"
				class="w-44 p-1 border border-gray-300 rounded"
			/>
			<button 
			on:click={handleCollectionMint} 
			class="active:brightness-50 disabled:active:brightness-100 disabled:opacity-50 disabled:cursor-not-allowed" 
			disabled={true}	>
				<p class="uppercase lg:text-lg tracking-wider font-bold">total: {total} ETH</p>
				<img class="w-44 h-12 object-contain" src="/media/mint.png" alt="mint">
			</button>
		{:else}
			<div class="flex items-center gap-2">
				<button class="active:brightness-50" on:click={resetTransactionStatus} >
					<img class="h-10 object-contain" src="/media/mint-more.png" alt="mint">
				</button>
				<button class="active:brightness-50"  on:click={downloadAllImages} >
					<img class="h-10 object-contain" src="/media/download.png" alt="download">
				</button>
			</div>
		{/if}
		{#if $MintTransactionStore.status !== "not started"}
			{#if !enoughFunds}
				<p class="font-bold text-red-600">Not enough funds to execuute</p>
			{:else}
				<p class="italic text-sm">{$MintTransactionStore.status}</p>
			{/if}

	  	{/if}	
	  {:else}
		<p class="lg:text-xl italic">connect your wallet to execuute...</p>
	{/if} -->
</div>
