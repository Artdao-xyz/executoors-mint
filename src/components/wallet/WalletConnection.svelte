<script lang="ts">
	import { selectWalletByName, connectWallet } from '$lib/web3';
	import WalletButtonStore from '$store/WalletButtonsStore';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const connect = async (name: string): Promise<void> => {
		const select = await selectWalletByName(name);
		connectWallet();

		dispatch('close-modal');
	};	
</script>

<div class="flex flex-col items-start gap-2">
	{#each $WalletButtonStore.buttons as btn}
		<button
			class="bg-white bg-opacity-[2%] flex items-center gap-2 p-3 w-full rounded-xl hover:bg-opacity-5"
			on:click={() => {
				if (btn.available) {
					connect(btn.name);
				} else {
					window.open(btn.install_url, '_blank');
				}
			}}
			>
			<img class="w-8 h-8" src={btn.image} alt="wallet icon">
			<span class="font-medium">{btn.name}</span>
		</button>
	{/each}
</div>


