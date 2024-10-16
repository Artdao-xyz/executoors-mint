<script>
	import WalletComponent from "$wallet/WalletComponent.svelte";
    import WalletProvider from "$wallet/WalletProvider.svelte";
</script>

<header class="relative">

    <div class="fixed h-fit w-fit left-1/2 -translate-x-1/2 top-4">
        <a class="block" target="_blank" href="https://executoors.com/"><img draggable="false" class="w-56 md:w-96 object-contain" src="media/logo.png" alt="logo"></a>
    </div>
    
    <div class="hidden lg:block fixed w-fit h-fit left-4 bottom-4 space-y-3 z-20">
        <a class="block active:brightness-50" target="_blank" href="https://x.com/executoors"><img draggable="false" class="h-14 object-contain" src="media/x.png" alt="x"></a>
        <a class="block active:brightness-50" target="_blank" href="https://t.me/+V1zVFD_TAbM3MGEx"><img draggable="false" class="h-14 object-contain" src="media/telegram.png" alt="telegram"></a>
    </div>

    <WalletProvider>
        <WalletComponent/>
    </WalletProvider>
</header>