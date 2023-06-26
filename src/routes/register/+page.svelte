<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import FormIssues from "$lib/components/FormIssues.svelte";
	import { pb } from "$lib/pocketbase";
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<main>
	<h1>Register</h1>
	<form
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				pb.authStore.loadFromCookie(document.cookie);
				await applyAction(result);
			};
		}}
	>
		<label for="name">Enter your name:</label>
		<input
			type="text"
			name="name"
			placeholder="John Smith"
			value={form?.formDataObject?.name ?? ""}
		/>
		<br />
		<label for="email">Enter your email:</label>
		<input
			type="email"
			name="email"
			placeholder="email@stuy.edu"
			value={form?.formDataObject?.email ?? ""}
		/>
		<br />
		<label for="password">Enter a strong password:</label>
		<input
			type="password"
			name="password"
			placeholder="a_long_and_secure_password"
		/>
		<br />
		<label for="passwordConfirm">Enter the password again:</label>
		<input
			type="password"
			name="passwordConfirm"
			placeholder="Confirm the password"
		/>
		<FormIssues issues={form?.issues} />
		<button>Register</button>
	</form>
</main>

<style scoped>
	main {
		text-align: center;
		display: block;
	}

	h1 {
		font-size: 3rem;
	}

	form {
		max-width: 400px;
		margin-top: 10px;
		margin-left: auto;
		margin-right: auto;
	}

	form input {
		margin-top: 2px;
		width: 100%;
	}

	form label {
		font-size: 1.4rem;
		font-weight: bold;
		text-align: left;
	}
</style>
