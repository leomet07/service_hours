<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { currentUser, pb } from "$lib/pocketbase";

	async function logout() {
		pb.authStore.clear();
		await goto("/");
	}
</script>

<nav>
	<a href="/" class:active={$page.url.pathname === "/"}>Home</a>
	<a
		href="/about"
		id="about_link"
		class:active={$page.url.pathname === "/about"}>About</a
	>
	{#if $currentUser}
		<a href="/" on:click={logout}>Logout</a>
	{:else}
		<a href="/login" class:active={$page.url.pathname === "/login"}>Login</a
		>
		<a href="/register" class:active={$page.url.pathname === "/register"}
			>Register</a
		>
	{/if}
</nav>

<style scoped>
	nav {
		max-width: 1000px;
		margin: auto;
		height: 100%;
		display: flex;
		align-items: center;
		font-size: 1.5rem;
	}

	nav a {
		margin: 10px;
	}

	#about_link {
		margin-right: auto;
	}

	.active {
		text-decoration: underline;
	}
</style>
