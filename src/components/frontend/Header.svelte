<script>
	import WalletComponent from "$wallet/WalletComponent.svelte";
    import WalletProvider from "$wallet/WalletProvider.svelte";
</script>

<header class="relative w-full px-2">
    <img class="lg:hidden mx-auto" src="media/logo.png" alt="logo">
    <div class="flex items-center justify-center gap-2 lg:gap-10 pt-4">
        <a href={"#"}><img class="h-8 2xl:h-12" src="media/discord.png" alt="discord"></a>
        <a href={"#"}><img class="h-8 2xl:h-12" src="media/telegram.png" alt="telegram"></a>
        <img class="hidden lg:block h-52" src="media/logo.png" alt="logo">
        <a href={"#"}><img class="h-8 2xl:h-12" src="media/x.png" alt="x"></a>
        <a href={"#"}><img class="h-8 2xl:h-12" src="media/thunder.png" alt="thunder"></a>
    </div>

    <WalletProvider>
        <WalletComponent/>
    </WalletProvider>
</header>