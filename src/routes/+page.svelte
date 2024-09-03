<script>
    import "/src/style.css";
    import Header from "$frontend/Header.svelte";
	import MainExecutoor from "$frontend/MainExecutoor.svelte";
	import Mint from "$frontend/Mint.svelte";
</script>

<div class="w-screen max-w-screen h-screen max-h-screen relative">
    <div class="absolute inset-0 bg-center bg-no-repeat bg-cover brightness-50 blur-sm lg:filter-none" 
         style="background-image: url(media/bg.png)">
    </div>
    <Header/>
    <MainExecutoor/>
    <Mint/>
</div>