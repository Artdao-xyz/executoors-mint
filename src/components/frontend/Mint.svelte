<script>
    import MintComponent from "../mint/MintComponent.svelte";
    let amount = 1;
    const price = 0.0069;
</script>

<div class="font-schmaltzy absolute right-1/2 translate-x-1/2 md:translate-x-0 md:right-0 bottom-0 h-fit w-full md:max-w-2xl lg:max-w-3xl 2xl:max-w-4xl flex items-center justify-end pointer-events-none">

    <div class="relative w-full">
        <img draggable="false" src="/media/wood-mobile.png" alt="Wood Background" class="select-none md:hidden w-full h-auto object-cover" />
        <img draggable="false" src="/media/wood.png" alt="Wood Background" class="select-none hidden md:block w-full h-auto object-cover" />
    </div>
    
    <div class="absolute bottom-0 left-0 h-full w-full flex items-center justify-center">
        <img draggable="false" src="/media/paper-mobile.png" alt="Paper Background" class="select-none md:hidden absolute left-0 bottom-0 w-full h-fit md:h-full object-contain" />
        <img draggable="false" src="/media/paper.png" alt="Paper Background" class="select-none hidden md:block absolute left-0 bottom-0 w-full h-fit object-contain" />
        <div class="absolute left-1/2 top-1/2 md:top-2/3 -translate-x-1/2 -translate-y-1/2 md:-translate-y-2/3  w-full h-[60%] flex flex-col items-center justify-center gap-3  pointer-events-auto">
            <a class="self-center md:hidden" href="https://executoors.com/"><img class="h-12 " src="/media/logo.png" alt="logo"></a>

            <MintComponent />

        </div> 
    </div>
</div>