<script lang="ts">
	import WalletStore from '$store/WalletStore.ts';
	import { mintFromCollection, getAvailableMints } from '$lib/props-mint';
	import MintTransactionStore from '$store/MintTransactionStore';
	import { PUBLIC_TOTAL_SUPPLY } from '$env/static/public';

	import { onMount } from 'svelte';

	let lastMintedTokenId: number[];
	let amount: number = 1;
	let availableAssets: number;
	let totalSupply: number = Number(PUBLIC_TOTAL_SUPPLY);

	// let amount = 1;
    const price = 0.0069;
    $: total  = price * amount;

	onMount(async () => {
		availableAssets = await getAvailableMints();
		console.log('Available assets on mount:', availableAssets);
	});

	async function handleCollectionMint(): Promise<void> {
		console.log('Minting from collection ', amount, ' tokens');
		lastMintedTokenId = await mintFromCollection(amount);

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

	function validateInput() {
		amount = Math.min(3, Math.max(1, Math.floor(Number(amount))));
	}
</script>

<div class="flex flex-col items-center justify-center gap-0">
	<!-- <h4 class="text-2l font-bold text-center border-b border-black border-dashed">Mint Component</h4> -->
	{#if $WalletStore.isConnected}
		<!-- <button
			class="font-bold text-white text-lg border-2 border-black p-1 rounded bg-blue-400 hover:bg-blue-500"
			on:click={handleCollectionMint}>Mint from collection</button
		> -->
		<input
			type="number"
			bind:value={amount}
			on:input={validateInput}
			min="1"
			max="3"
			step="1"
			class="w-16 p-1 border border-gray-300 rounded"
		/>
		<button on:click={handleCollectionMint} class="text-[#4d4d4c] text-stroke text-3xl md:text-4xl uppercase font-bold active:brightness-50"><img class="w-44 h-12 object-contain" src="/media/mint.png" alt="mint"></button>
		<p class="uppercase text-2xl tracking-wider font-bold">total: {total} ETH</p>
		<p>Available assets: {availableAssets} / {totalSupply}</p>
		<p>Transaction state: {$MintTransactionStore.status}</p>
		<p>Last token minted:{lastMintedTokenId}</p>
	{:else}
		<p>Connect your wallet to mint</p>
	{/if}
</div>
