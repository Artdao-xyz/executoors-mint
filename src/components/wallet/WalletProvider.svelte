<script lang="ts">
	import { onMount } from 'svelte';
	import { initFuels, getEthBalance } from '$lib/web3';

	onMount(async () => {
		await initFuels();
	});

	export const getBalance = async (): Promise<string | null> => {
		// const balance = await getEthBalance();
		// console.log('balance', balance);
		return balance;
	};
</script>

<slot></slot>
