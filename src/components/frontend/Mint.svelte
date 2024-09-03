<script>
    const price = 0.0069;
</script>

<div class="font-schmaltzy absolute right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-0 bottom-0 h-fit w-full max-w-lg lg:max-w-3xl 2xl:max-w-4xl flex items-center justify-end pointer-events-none">
    <div class="relative w-full">
        <img src="/media/wood-mobile.png" alt="Wood Background" class="lg:hidden w-full h-auto object-cover" />
        <img src="/media/wood.png" alt="Wood Background" class="hidden lg:block w-full h-auto object-cover" />
    </div>

    <div class="absolute bottom-0 left-0 h-full w-full flex items-center justify-center pointer-events-auto">
        <img src="/media/paper-mobile.png" alt="Paper Background" class="lg:hidden absolute left-0 bottom-0 w-full h-full object-contain" />
        <img src="/media/paper.png" alt="Paper Background" class="hidden lg:block absolute  left-0 bottom-0 w-full h-fit object-contain" />
        <div class="absolute left-1/2 top-1/2 lg:top-2/3 -translate-x-1/2 -translate-y-1/2 lg:-translate-y-2/3  w-full h-[60%] flex flex-col items-center justify-center gap-3">
            
            <img class="shadow shadow-black w-64 md:w-80 lg:w-72 2xl:w-[350px]" src="/media/tbd.png" alt="tbd executoor">
            <input class="text-end px-2 text-sm md:text-lg focus:outline-black placeholder:italic placeholder:text-xs leading-snug" placeholder="Enter quantity..." type="text">
            <p class="uppercase text-2xl tracking-wider font-bold">total: {price} ETH</p>
            <button class="text-[#fff004] text-stroke text-3xl md:text-4xl uppercase font-bold">mint</button>
        </div> 
    </div>
</div>