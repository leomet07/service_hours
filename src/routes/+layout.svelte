<script lang="ts">
	import "../globals.css";
	import Navbar from "$lib/components/Navbar.svelte";
</script>

<svelte:head>
	<title>Service Hours App</title>
</svelte:head>

<div class="app">
	<div id="nav_parent">
		<Navbar />
	</div>
	<div id="page_parent">
		<slot />
	</div>
</div>

<style>
	#nav_parent {
		height: 50px;
	}

	#page_parent {
		min-height: calc(100vh - 50px);
	}
</style>
