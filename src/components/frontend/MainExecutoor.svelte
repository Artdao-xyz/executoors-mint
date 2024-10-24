<script lang="ts">
    import { PUBLIC_TOTAL_SUPPLY } from '$env/static/public';
    import { getAvailableMints } from '$lib/props-mint';
    import MintTransactionStore from '$store/MintTransactionStore';
	import { onMount } from 'svelte';

    let minting = true;
	let availableAssets: number;
	let totalSupply: number = Number(PUBLIC_TOTAL_SUPPLY);
    
	onMount(async () => {
		// availableAssets = await getAvailableMints();
		// availableAssets = 0;

        if (availableAssets === 0) {
            minting = false;
        }
        
		// console.log('Available assets on mount:', availableAssets);
	});

</script>
<div class="font-schmaltzy fixed bottom-0 left-0 lg:left-1/4 lg:-translate-x-1/2 flex items z-10">
    <img draggable="false" class="select-none lg:hidden h-full" src="/media/executoor-mobile.png" alt="">
    <img draggable="false" class="select-none hidden lg:block h-full" src="/media/executoor.png" alt="">
    
    <div class="absolute bottom-2 lg:bottom-auto lg:top-0 left-1/2 lg:left-2/3 w-full max-w-sm lg:-ml-12">
        <!-- <img draggable="false" class="select-none relative scale-y-[-1] lg:scale-y-100 " src="/media/speech-bubble.png" alt=""> -->

        <div class="absolute right-1/3 translate-x-1/3 top-1/2 -translate-y-1/2 text-center lg:space-y-2 flex flex-col items-center justify-center">
            {#if minting}
                {#if availableAssets != undefined}
                    {#if $MintTransactionStore.status != "executioon confirmed"}
                        <p class="text-2xl lg:text-5xl text-[#0290d9] text-stroke-black">{ `${totalSupply - availableAssets} / ${totalSupply}`}</p>
                        <p class="text-xl lg:text-3xl text-[#0290d9] text-stroke-black uppercase">minted</p>
                    {:else}
                        <p class="text-lg lg:text-3xl text-[#0290d9] text-stroke-black">congratulations!</p>
                    {/if}
                {:else}
                    <!-- <p class="text-xl lg:text-3xl text-[#0290d9] text-stroke-black">finding executoors</p> -->
                {/if}
            {/if}

            <a class="hidden lg:block h-96 w-96" href="https://executoors.com" target="_blank"><img class="h-full w-full object-cover" src="minted_out.png" alt=""></a>
        </div>
    </div>
</div>