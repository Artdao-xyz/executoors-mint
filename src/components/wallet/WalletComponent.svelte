<script lang="ts">
	import CloseIcon from '$frontend/CloseIcon.svelte';
	import { disconnectWallet } from '$lib/web3';
	import WalletButtonStore from '$store/WalletButtonsStore';
	import walletStore from '$store/walletStore';
	import Modal from './WalletModal.svelte';

	import { slide } from 'svelte/transition';


	// import { createPopover, melt } from '@melt-ui/svelte'
	import { onMount } from 'svelte';
   
//    const {
// 	 elements: { content, trigger, overlay, close, arrow }
//    } = createPopover({
// 	 preventScroll: true,
//    })

	let showModal: boolean = false;

	const formatFuelAddress = (address: string | undefined) => {
		if (!address) {
			return '';
		}
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	// onMount(()=> {
	// 	setTimeout(()=> {
	// 		div.classList.add("animate-slide-in-top");
	// 	}, 10000)
	// })
	let div = null
</script>

<div 
	bind:this={div}
	class="absolute right-2 md:right-10 top-0 text-center bg-no-repeat bg-center bg-contain w-32 md:w-52 h-12 md:h-20 z-10" 
    style="background-image: url('/media/wallet-bg.png')">
    {#if $WalletButtonStore.initialized}
        {#if !$walletStore.isConnected}
            <button class="font-schmaltzy text-stroke text-[#fff004] font-bold uppercase text-xl md:text-[32px] mt-2 md:mt-4 tracking-wide rotate-6"
				on:click={() => { showModal = true; }}>
                Connect
            </button>
        {:else}
            <button 
				on:click={disconnectWallet} class="font-schmaltzy text-stroke font-bold text-[#fff004] text-xs md:text-2xl mt-4 rotate-3" 
                type="button">
                {formatFuelAddress($walletStore.currentAccount)}
            </button>
        {/if}
    {:else}
        <p></p>
    {/if}

    <Modal bind:showModal/>
</div>


<!-- <button class="font-bold text-white text-lg border-2 border-black p-1 rounded bg-blue-400 hover:bg-blue-500" type="button" use:melt={$trigger}>{formatFuelAddress($walletStore.currentAccount)}</button>
<div use:melt={$overlay} />
<div class="p-4 bg-white flex flex-col items-end gap-2" use:melt={$content}>
	<div use:melt={$arrow} />
	<button class="flex items-center justify-center rounded-full" use:melt={$close}><CloseIcon width={14} height={14}/></button>
	<button class="font-bold underline" on:click={disconnectWallet}>Disconnect</button>
</div> -->