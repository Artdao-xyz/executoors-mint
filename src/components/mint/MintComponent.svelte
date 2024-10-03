<script lang="ts">
	import walletStore from '$store/walletStore';
	import { mintFromCollection, getAvailableMints } from '$lib/props-mint';
	import MintTransactionStore from '$store/MintTransactionStore';
	import { PUBLIC_MINT_PRICE } from '$env/static/public';

	import { onMount } from 'svelte';

	let lastMintedTokenId: number[];
	let amount: number = 1;
	let availableAssets: number;
	let price: number = parseInt(PUBLIC_MINT_PRICE);
	
    $: total  = price * amount;

	onMount(async () => {
		availableAssets = await getAvailableMints();
		console.log('Available assets on mount:', availableAssets);
	});

	async function handleCollectionMint(): Promise<void> {
		console.log('Minting from collection ', amount, ' tokens');
		lastMintedTokenId = await mintFromCollection(amount);

		console.log('lastMintedTokenId', lastMintedTokenId);

		await updateMintStatus(lastMintedTokenId);
		availableAssets = await getAvailableMints();
	}

	async function updateMintStatus(tokenIds: number[]) {
		try {
			const response = await fetch('/api/artworks/mint', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ tokenIds })
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			console.log('Record updated successfully:', result);
			return result;
		} catch (error) {
			console.error('Error updating record:', error);
			throw error;
		}
	}

	function validateInput(): void {
		const value: number = parseInt(String(amount), 10);
		if (!isNaN(value)) {
			amount = Math.min(3, Math.max(1, value));
		}
	}
</script>


<div class="relative w-64 h-64 lg:w-72 2xl:w-96 lg:h-72 2xl:h-96 p-9 lg:p-14">
	{#if lastMintedTokenId}
	<img class="absolute inset-0 w-full h-full object-contain" src="/media/frame.png" alt="artwork">
	<img class="select-none w-full h-full object-cover object-top" src={`https://ipfs.filebase.io/ipfs/bafybeifwzkx2odvm3kiebuzchr6eruh7o6lanh2hxyym5q3omsgpg42mju/${lastMintedTokenId[0].toString().padStart(5, '0')}.png`} alt="tbd executoor">
	<!-- <img class="select-none w-full h-full object-cover object-top" src={`/images/${lastMintedTokenId[0].toString().padStart(5, '0')}.png`} alt="tbd executoor"> -->
	{:else}
	<img class="absolute inset-0 w-full h-full object-contain" src="/media/frame.png" alt="artwork">
	<img class="select-none w-full h-full object-contain" src="/media/tbd.png" alt="tbd executoor">
	{/if}
</div>
{#if lastMintedTokenId}
	<p class="uppercase text-xl font-bold text-right">executoor #{lastMintedTokenId[0]} & friends</p>
{/if}

<div class="flex flex-col items-center justify-center gap-1">
	{#if $walletStore.isConnected}
		<input
			type="number"
			bind:value={amount}
			on:input={validateInput}
			min="1"
			max="3"
			step="1"
			class="w-44 p-1 border border-gray-300 rounded"
		/>
		<p class="uppercase lg:text-lg tracking-wider font-bold">total: {total} ETH</p>
		<button 
			on:click={handleCollectionMint} 
			class="text-[#4d4d4c] text-stroke text-3xl md:text-4xl uppercase font-bold active:brightness-50 disabled:active:brightness-100 disabled:opacity-50 disabled:cursor-not-allowed" 
			disabled={$MintTransactionStore.status === 'preparing to execuute' || $MintTransactionStore.status === 'awaiting confirmation'}
			>
			<img class="w-44 h-12 object-contain" src="/media/mint.png" alt="mint">
		</button>

		<!-- <p>Available assets: {availableAssets} / {totalSupply}</p> -->
		<!-- <p>Last token minted:{lastMintedTokenId}</p> -->
		{#if $MintTransactionStore.status !== "not started"}
			<p class="italic text-sm">{$MintTransactionStore.status}</p>
	  	{/if}	
	  {:else}
		<p class="lg:text-xl italic">connect your wallet to execuute...</p>
	{/if}
</div>
