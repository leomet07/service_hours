import { z } from "zod";

// The base for any document in pocketbase
const baseDBEntrySchema = z.object({
	id: z.string().length(15),
	created: z.string().datetime(),
	updated: z.string().datetime(),
	collectionId: z.string().length(15),
	collectionName: z.string(),
});

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
}).merge(baseDBEntrySchema);

export const UserSchema = z.object({
	username: z.string().min(1).max(32), // auto generated in the DB
	email: z.string().email(),
	name: z.string().min(3).max(48),
	avatar: z.string().optional(),
});
const DBUserSchema = UserSchema.merge(baseDBEntrySchema);

type RecievedServiceHour = z.infer<typeof ServiceHourSchema>;
export type DBRecievedServiceHour = z.infer<typeof DBServiceHourSchema>;

type RecievedUser = z.infer<typeof UserSchema>;
export type DBRecievedUser = z.infer<typeof DBUserSchema>;
