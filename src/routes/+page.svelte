<script lang="ts">
	import { onMount } from "svelte";
	import { currentUser, pb } from "../lib/pocketbase";
	import LoginForm from "../components/LoginForm.svelte";
	import type { Record, UnsubscribeFunc } from "pocketbase";
	import type {
		DBRecievedServiceHour,
		RecievedServiceHour,
	} from "../db_types";

	let service_hours: DBRecievedServiceHour[] = [];
	onMount(async () => {
		console.log("Mounted the home page to the DOM!");
		service_hours = await pb
			.collection("service_hours")
			.getFullList({ sort: "-created" });
		console.log("Service hours now: ", service_hours);

		let unsubscribefunc: UnsubscribeFunc | undefined;
		currentUser.subscribe(async (newCurrentUser) => {
			// If not logged in
			if (!newCurrentUser) {
				if (typeof unsubscribefunc == "function") {
					await unsubscribefunc();
				}
				return;
			}

			service_hours = await pb
				.collection("service_hours")
				.getFullList({ sort: "-created" });
			unsubscribefunc = await pb
				.collection("service_hours")
				.subscribe("*", async (param) => {
					if (!$currentUser) {
						return;
					}
					if ($currentUser.id == param.record.parent_user) {
						// Since this user can only see the service_hours created by THEMSELVES, this check is not neccesary,
						// but just in case, make sure this service_hours entry is by THIS user

						service_hours = await pb
							.collection("service_hours")
							.getFullList({ sort: "-created" });
						console.log("Full service hours: ", service_hours);
					}
				});
		});
	});

	function signOut() {
		pb.authStore.clear();
	}

	async function createServiceHours() {
		console.log("Clicked");
		if (!$currentUser) {
			console.log("Not signed in");
			return;
		}
		const current_user_id = $currentUser.id;
		const data = {
			description: `Wow this is a cool desription`,
			parent_user: current_user_id,
		};
		const createdHours = await pb.collection("service_hours").create(data);
		console.log("Created service hours", createdHours);
	}
</script>

<h1>Home</h1>
{#if $currentUser}
	<p>
		Signed in as {$currentUser.name}
	</p>
	<button on:click={signOut}>Sign Out</button>
	<button on:click={createServiceHours}>Create Service Hours</button>
	<section>
		{#each service_hours as item}
			<div>
				<p>Id: {item.id}</p>
				<p>{item.description}</p>
			</div>
		{/each}
	</section>
{:else}
	<LoginForm />
{/if}

<style>
	h1 {
		font-size: 3rem;
	}
</style>
