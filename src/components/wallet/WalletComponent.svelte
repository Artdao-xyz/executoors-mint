<script lang="ts">
	import { disconnectWallet } from '$lib/web3';
	import WalletButtonStore from '$store/WalletButtonsStore';
	import WalletStore from '/src/store/WalletStore';
	import Modal from './WalletModal.svelte';

	let showModal: boolean = false;

	const formatFuelAddress = (address: string | undefined) => {
		if (!address) {
			return '';
		}
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};
</script>

<div 
	class="absolute right-2 md:right-10 top-0 text-center bg-no-repeat bg-center bg-contain w-32 md:w-52 h-12 md:h-20 z-10" 
    style="background-image: url('/media/wallet-bg.png')">
    {#if $WalletButtonStore.initialized}
        {#if !$WalletStore.isConnected}
            <button class="font-schmaltzy text-stroke text-[#fff004] font-bold uppercase text-xl md:text-[32px] mt-2 md:mt-4 tracking-wide rotate-6"
				on:click={() => { showModal = true; }}>
                Connect
            </button>
        {:else}
            <button 
				on:click={disconnectWallet} class="font-schmaltzy text-stroke font-bold text-[#fff004] text-xs md:text-2xl mt-4 rotate-3" 
                type="button">
                {formatFuelAddress($WalletStore.currentAccount)}
            </button>
        {/if}
    {:else}
        <p></p>
    {/if}

    <Modal bind:showModal/>
</div>
