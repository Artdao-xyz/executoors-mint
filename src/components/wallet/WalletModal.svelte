<script lang="ts">
	export let showModal: boolean;
	import { onMount } from 'svelte';
	import WalletConnection from './WalletConnection.svelte';
	import CloseIcon from '$frontend/CloseIcon.svelte';

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();

	const handleButtonClicked = () => {
		// console.log('should handle button clicked');
		closeModal();
	};

	export const closeModal = () => {
		showModal = false;
		dialog.close();
	};

	onMount(() => {
		dialog?.addEventListener('buttonclicked', handleButtonClicked);

		return () => {
			dialog?.removeEventListener('buttonclicked', handleButtonClicked);
		};
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="bg-[#121313] text-slate-50 px-4 py-6 rounded-[2.25rem] w-full lg:w-1/4 lg:max-2xl backdrop:bg-black/75 shadow-sm shadow-white/15"
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="space-y-3.5" on:click|stopPropagation>
		<header class="flex items-center justify-between">
			<span></span>
			<h2 class="font-bold">Connect Wallet</h2>
			<button on:click={closeModal} class="bg-transparent hover:bg-white/5 p-1.5 rounded"
				><CloseIcon /></button
			>
		</header>
		<WalletConnection on:close-modal={closeModal} />
		<!-- <slot /> -->
	</div>
</dialog>
