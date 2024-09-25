<script>
    import MintComponent from "../mint/MintComponent.svelte";
    let amount = 1;
    const price = 0.0069;
    $: total  = price * amount;
</script>

<div class="font-schmaltzy absolute right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-0 bottom-0 h-fit w-full max-w-lg lg:max-w-3xl 2xl:max-w-4xl flex items-center justify-end pointer-events-none">

    <div class="relative w-full">
        <img draggable="false" src="/media/wood-mobile.png" alt="Wood Background" class="select-none lg:hidden w-full h-auto object-cover" />
        <img draggable="false" src="/media/wood.png" alt="Wood Background" class="select-none hidden lg:block w-full h-auto object-cover" />
    </div>
    
    <div class="absolute bottom-0 left-0 h-full w-full flex items-center justify-center">
        <img draggable="false" src="/media/paper-mobile.png" alt="Paper Background" class="select-none lg:hidden absolute left-0 bottom-0 w-full h-fit lg:h-full object-contain" />
        <img draggable="false" src="/media/paper.png" alt="Paper Background" class="select-none hidden lg:block absolute left-0 bottom-0 w-full h-fit object-contain" />
        <div class="absolute left-1/2 top-1/2 lg:top-2/3 -translate-x-1/2 -translate-y-1/2 lg:-translate-y-2/3  w-full h-[60%] flex flex-col items-center justify-center gap-3  pointer-events-auto">
            <a class="self-center lg:hidden" href="https://executoors.netlify.app/"><img class="h-12 " src="/media/logo.png" alt="logo"></a>
            <img class="select-none shadow shadow-black w-64 md:w-80 lg:w-72 2xl:w-[350px]" src="/media/tbd.png" alt="tbd executoor">
            <!-- <input bind:value={amount} class="text-end px-2 md:text-lg focus:outline-black hover:outline-black placeholder:italic placeholder:text-xs leading-snug" placeholder="Enter quantity..." type="text"> -->
            <MintComponent />

            <!-- <button class="text-[#4d4d4c] text-stroke text-3xl md:text-4xl uppercase font-bold active:brightness-50"><img class="w-44 h-12 object-contain" src="/media/mint.png" alt="mint"></button> -->
        </div> 
    </div>
</div>