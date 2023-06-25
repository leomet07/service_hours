<script lang="ts">
	import { currentUser } from "../lib/pocketbase";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<h1>Home</h1>
{#if $currentUser}
	<p>
		Signed in as {$currentUser.name}
	</p>
	<form method="POST">
		<button>Create Service Hours</button>
	</form>

	<section>
		{#each data.db_service_hours as item}
			<div>
				<p>Id: {item.id}</p>
				<p>{item.description}</p>
			</div>
		{/each}
	</section>
{:else}
	<h2>You aren't logged in. <a href="/login">Login please.</a></h2>
{/if}

<style scoped>
	h1 {
		font-size: 3rem;
	}
</style>
