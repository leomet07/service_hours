<script lang="ts">
	import { goto } from "$app/navigation";
	import { currentUser, pb } from "$lib/pocketbase";

	async function logout() {
		pb.authStore.clear();
		await goto("/");
	}
</script>

<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	{#if $currentUser}
		<a href="/" on:click={logout}>Logout</a>
	{:else}
		<a href="/login">Login</a>
		<a href="/register">Register</a>
	{/if}
</nav>
