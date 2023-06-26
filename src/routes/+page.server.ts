import { error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { ServiceHourSchema, type DBRecievedServiceHour } from "../db_types";

// Get the data, for page load
export const load = (async ({ params, locals }) => {
	const service_hours = await locals.pb
		.collection("service_hours")
		.getFullList({ sort: "-created" });

	const serialized_service_hours = structuredClone(
		service_hours as unknown
	) as DBRecievedServiceHour[];

	if (service_hours) {
		return { db_service_hours: serialized_service_hours };
	}

	throw error(404, "Not found");
}) satisfies PageServerLoad;

// For when service hours are logged
export const actions: Actions = {
	default: async ({ locals, request }) => {
		try {
			if (!locals.user) {
				throw new Error("Not logged in.");
			}
			const formData = Object.fromEntries(await request.formData());

			// Make sure the data is valid
			const verifiedFormData = ServiceHourSchema.parse(formData);

			const current_user_id = locals.user.id;
			const data = {
				...verifiedFormData,
				parent_user: current_user_id,
			};
			const createdHours = structuredClone(
				await locals.pb.collection("service_hours").create(data)
			) as DBRecievedServiceHour;
		} catch (e) {
			console.error("Could not create service hours", JSON.stringify(e));
			throw e;
		}
	},
} satisfies Actions;
