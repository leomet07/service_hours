<script lang="ts">
	import { goto } from "$app/navigation";
	import { pb } from "$lib/pocketbase";

	async function logout() {
		pb.authStore.clear();
		await goto("/");
	}
</script>

<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/login">Login</a>
	<!-- <a href="/logout">Logout</a> -->
	<button on:click={logout}>Logout</button>
</nav>
