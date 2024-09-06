<script>
    let minting = true;
    $: minted = 1200;
</script>
<div class="font-schmaltzy fixed bottom-0 left-0 lg:left-1/4 lg:-translate-x-1/2 flex items z-10">
    <img draggable="false" class="select-none lg:hidden h-full" src="/media/executoor-mobile.png" alt="">
    <img draggable="false" class="select-none hidden lg:block h-full" src="/media/executoor.png" alt="">
    
    <div class="absolute bottom-2 lg:bottom-auto lg:top-0 left-1/2 lg:left-2/3 w-full max-w-sm">
        <img draggable="false" class="select-none relative scale-y-[-1] lg:scale-y-100" src="/media/speech-bubble.png" alt="">

        <div class="absolute right-0 top-1/2 -translate-y-1/2 text-center lg:space-y-2">
            {#if minting}
            <p class="text-2xl lg:text-5xl text-[#0290d9] text-stroke-black mr-8 lg:mr-10">{ `${minted} / 6942`}</p>
            <p class="text-xl lg:text-3xl text-[#0290d9] text-stroke-black uppercase mr-5 lg:mr-7">minted</p>
            {:else}
            <p class="lg:text-3xl text-[#0290d9] text-stroke-black uppercase mr-5 lg:mr-7">congratulations!</p>
            {/if}
        </div>
    </div>
</div>