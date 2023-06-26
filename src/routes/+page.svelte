<script lang="ts">
	import { currentUser } from "../lib/pocketbase";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main>
	<h1>Home</h1>
	{#if $currentUser}
		<form method="POST">
			<input
				type="text"
				name="title"
				placeholder="Enter a title..."
				required
			/>
			<br />
			<input
				type="text"
				name="description"
				placeholder="Enter a description..."
			/>
			<br />
			<input type="number" name="num_of_hours" placeholder="1" required />
			<br />
			<button>Create Service Hours</button>
		</form>

		<section>
			{#each data.db_service_hours as item}
				<div>
					<h2>{item.title}</h2>
					<h3>{item.num_of_hours} hours</h3>
					<p>id: {item.id}</p>
					{#if item.description}
						<p>{item.description}</p>
					{/if}
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
