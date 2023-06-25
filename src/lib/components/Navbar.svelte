<script lang="ts">
	import { page } from "$app/stores";
	import { currentUser } from "$lib/pocketbase";
	import UserMenu from "./UserMenu.svelte";
</script>

<nav>
	<a href="/" class:active={$page.url.pathname === "/"}>Home</a>
	<a
		href="/about"
		id="about_link"
		class:active={$page.url.pathname === "/about"}
	>
		About
	</a>
	{#if $currentUser}
		<div id="user_menu_parent">
			<UserMenu />
		</div>
	{:else}
		<a href="/login" class:active={$page.url.pathname === "/login"}>
			Login
		</a>
		<a href="/register" class:active={$page.url.pathname === "/register"}>
			Register
		</a>
	{/if}
</nav>

<style scoped>
	nav {
		max-width: 1000px;
		margin: auto;
		height: 100%;
		display: flex;
		align-items: center;
	}

	nav a {
		font-size: 1.5rem;
	}

	nav a,
	#user_menu_parent {
		margin: 10px;
	}

	#about_link {
		margin-right: auto;
	}

	.active {
		text-decoration: underline;
	}
</style>
