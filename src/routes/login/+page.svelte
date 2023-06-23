<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { pb } from "$lib/pocketbase";
</script>

<form
	method="POST"
	class="card"
	use:enhance={() => {
		return async ({ result }) => {
			pb.authStore.loadFromCookie(document.cookie);
			await applyAction(result);
		};
	}}
>
	<h1>Log in</h1>
	<div>
		<input type="email" name="email" placeholder="email@stuy.edu" />
		<input type="password" name="password" placeholder="Password" />
		<button>Log in</button>
	</div>
</form>
