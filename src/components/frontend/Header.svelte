<script>
	import WalletComponent from "$wallet/WalletComponent.svelte";
    import WalletProvider from "$wallet/WalletProvider.svelte";
	import MintComponent from '/src/components/mint/MintComponent.svelte';

</script>

<header class="relative w-full px-2">
    <a class="lg:hidden mx-auto cursor-pointer" target="_blank" href="https://executoors.netlify.app/">
    <img class="select-none" draggable="false" src="media/logo.png" alt="logo">
    </a>
    <div class="flex items-center justify-center gap-2 lg:gap-10 pt-4">
        <a href={"#"}><img draggable="false" class="select-none h-8 xl:h-12" src="media/discord.png" alt="discord"></a>
        <a href={"#"}><img draggable="false" class="select-none h-8 xl:h-12" src="media/telegram.png" alt="telegram"></a>
        <a  class="hidden lg:block" target="_blank" href="https://executoors.netlify.app/"><img draggable="false" class="select-none h-52" src="media/logo.png" alt="logo"></a>
        <a href={"#"}><img draggable="false" class="select-none h-8 xl:h-12" src="media/x.png" alt="x"></a>
        <a href={"#"}><img draggable="false" class="select-none h-8 xl:h-12" src="media/thunder.png" alt="thunder"></a>
    </div>

    <WalletProvider>
        <WalletComponent/>

        <MintComponent />
    </WalletProvider>
</header>