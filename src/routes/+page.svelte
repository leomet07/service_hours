<script lang="ts">
	import { currentUser } from "../lib/pocketbase";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main>
	<h1>Home</h1>
	{#if $currentUser}
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
		<h2>
			You aren't logged in.
			<a href="/login" id="login_request">Login please.</a>
		</h2>
	{/if}
</main>

<style scoped>
	main {
		text-align: center;
	}
	h1 {
		font-size: 3rem;
	}

	#login_request {
		color: rgb(64, 64, 255);
		text-decoration: underline;
	}
</style>
