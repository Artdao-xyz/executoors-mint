<script lang="ts">
	import '/src/style.css';

	import { onMount } from 'svelte';

	import WalletProvider from '$wallet/WalletProvider.svelte';
	import WalletComponent from '$wallet/WalletComponent.svelte';
	import MintComponent from '../components/mint/MintComponent.svelte';
	import Header from '$frontend/Header.svelte';
	import MainExecutoor from '$frontend/MainExecutoor.svelte';
	import Mint from '$frontend/Mint.svelte';

	interface Item {
		id: string;
		name: string;
		createdAt: string;
	}

	interface Artwork {
		id: string;
		tokenId: Number;
		description: string;
		jpgPath: string;
		thumbnailPath: string;
		active: boolean;
	}

	interface Meta {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	}

	let artworks: Artwork[] = [];

	let meta: Meta = { page: 1, limit: 10, total: 0, totalPages: 0 };
	let currentPage = 1;

	async function fetchItems(page: number = 1) {
		const response = await fetch(`/api/artworks?page=${page}&limit=10`);
		const data = await response.json();
		artworks = data.artworks;
		meta = data.meta;
		currentPage = page;

		// console.log('artworks:', artworks);
	}

	async function getStatus() {
		const response = await fetch(`/api/status`);
		const data = await response.json();
		// console.log('status:', data.status);
	}

	onMount(() => {
		getStatus();
		fetchItems();
	});

	const openNft = (art: Artwork) => {
		const newTab = window.open('', '_blank');

		// Check if the new tab was successfully opened
		if (newTab) {
			const img = document.createElement('img');
			img.src = art.jpgPath;
			newTab.document.write(img.outerHTML);
			newTab.document.close();
		} else {
			console.error('Failed to open new tab. Pop-up blocker may be enabled.');
		}
	};
</script>

<div class="w-screen max-w-screen h-svh lg:h-screen max-h-screen relative">


    <div class="absolute inset-0 bg-center bg-no-repeat bg-cover brightness-50 blur-sm lg:filter-none" 
         style="background-image: url(media/bg.png)">
    </div>

	<!-- <div class="fixed top-0 left-0 bg-yellow-700 text-white text-sm font-bold px-4 py-2 rounded-br-lg shadow-lg">Fuel Wallet experiencing execuutoorial difficulties. Use Fuelet to execuute.</div> -->

    <Header/>

	<WalletProvider>
		<WalletComponent />

	</WalletProvider>
    <MainExecutoor/>
    <Mint/>
</div>