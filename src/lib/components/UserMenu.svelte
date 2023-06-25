<script lang="ts">
	import { goto } from "$app/navigation";
	import { currentUser, pb } from "$lib/pocketbase";
	import UserIcon from "./UserIcon.svelte";

	async function logout() {
		pb.authStore.clear();
		await goto("/");
	}
</script>

<div id="user_menu">
	<input id="hidden_check" type="checkbox" name="menu" tabindex="0" />
	<label for="hidden_check">
		<div id="user_icon">
			<UserIcon />
		</div>
	</label>

	<div id="account_dropdown">
		{#if $currentUser}
			<!-- This check isn't needed, as this component is only rendered when logged in-->
			<h2>{$currentUser.name}</h2>
			<p>{$currentUser.email}</p>
			<p id="logout_link"><a href="/" on:click={logout}>Logout</a></p>
		{/if}
	</div>
</div>

<style scoped>
	#user_icon {
		height: 30px;
		width: 30px;
	}

	#user_menu {
		position: relative;
	}

	#account_dropdown {
		margin-top: 4px;
		background-color: var(--tertiary-color);
		width: 200px;
		position: absolute;
		right: 0px;
		text-align: right;
		padding: 10px;
		height: 100px;
	}

	#account_dropdown a {
		text-decoration: underline;
	}

	/* All of the hiding/showing logic */
	#hidden_check,
	#account_dropdown {
		display: none;
	}

	label {
		position: relative;
		display: block;
		cursor: pointer;
	}

	/* Show dropdown when hidden checkbox is checked*/
	#hidden_check:checked ~ #account_dropdown {
		display: block;
	}

	#logout_link {
		margin-top: 10px;
	}
</style>
