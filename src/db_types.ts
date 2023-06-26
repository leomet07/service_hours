import { z } from "zod";

export const ServiceHourSchema = z.object({
	title: z.string().min(3).max(64),
	description: z.string().max(4000).optional(),
	num_of_hours: z.preprocess(
		(a) => parseInt(z.string().parse(a), 10),
		z.number().min(0.5).max(1000)
	),
});

const DBServiceHourSchema = ServiceHourSchema.extend({
	parent_user: z.string().length(15),
	id: z.string().length(15),
	name: z.string().min(3).max(48),
	created: z.string().datetime(),
	updated: z.string().datetime(),
	collectionId: z.string().length(15),
	collectionName: z.string(),
});

export type RecievedServiceHour = z.infer<typeof ServiceHourSchema>;
export type DBRecievedServiceHour = z.infer<typeof DBServiceHourSchema>;
