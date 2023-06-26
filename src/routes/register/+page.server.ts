import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { UserSchema } from "../../db_types";
import handleServerError from "$lib/handleServerError";

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const formDataObject = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
			passwordConfirm: string;
			name: string;
		};

		try {
			UserSchema.parse(formDataObject);

			await locals.pb.collection("users").create(formDataObject);
			await locals.pb
				.collection("users")
				.authWithPassword(
					formDataObject.email,
					formDataObject.password
				);
			throw redirect(303, "/");
		} catch (e: any) {
			let return_data: any = formDataObject;
			delete return_data.password;
			delete return_data.passwordConfirm; // NEVER SEND BACK THE PASSWORD

			return handleServerError(e, formDataObject);
		}
	},
};
