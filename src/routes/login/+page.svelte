<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { pb } from "$lib/pocketbase";
</script>

<main>
	<h1>Log in</h1>
	<form
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				pb.authStore.loadFromCookie(document.cookie);
				await applyAction(result);
			};
		}}
	>
		<label for="email">Enter your email:</label>
		<input type="email" name="email" placeholder="email@stuy.edu" />
		<br />
		<label for="email">Enter your password:</label>
		<input
			type="password"
			name="password"
			placeholder="a_secure_password_or_passphrase"
		/>
		<br />
		<button>Log in</button>
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
