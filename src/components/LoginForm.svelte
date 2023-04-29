<script lang="ts">
	import { currentUser, pb } from "../lib/pocketbase";
	let login_email: string;
	let login_password: string;
	let signup_email: string;
	let signup_password: string;
	let signup_name: string;

	async function login(email: string, password: string) {
		console.log("Logging in, ", { email, password });
		const user = await pb
			.collection("users")
			.authWithPassword(email, password);
	}

	async function submitLogin() {
		await login(login_email, login_password);
	}
	async function submitSignup() {
		const data = {
			email: signup_email,
			password: signup_password,
			passwordConfirm: signup_password,
			name: signup_name,
		};
		const createdUser = await pb.collection("users").create(data);
		await login(signup_email, signup_password);
	}
</script>

<div>
	<form on:submit|preventDefault={submitLogin}>
		<p>Login</p>
		<input type="email" bind:value={login_email} />
		<input type="password" bind:value={login_password} />
		<input type="submit" />
	</form>
	<form on:submit|preventDefault={submitSignup}>
		<p>Register</p>
		<input type="email" bind:value={signup_email} />
		<input type="password" bind:value={signup_password} />
		<input type="text" bind:value={signup_name} />
		<input type="submit" />
	</form>
</div>
