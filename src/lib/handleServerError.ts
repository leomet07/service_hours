import type { ZodError } from "zod";
import { fail } from "@sveltejs/kit";

export default function handleServerError(e: Error, formDataObject: any) {
	if (e.name == "ZodError") {
		let fail_body = {
			issues: (e as ZodError).issues,
			formDataObject: formDataObject,
		};

		return fail(400, fail_body);
	}
	throw e;
}
