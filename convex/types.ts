import { v } from "convex/values";

export const ContactEntryType = v.union(
	v.literal("contact"),
	v.literal("inPerson"),
);

export const ContactType = v.union(
	v.literal("other"),
	v.literal("family"),
	v.literal("friend"),
	v.literal("date"),
);

export const ActivityStatusType = v.union(
	v.literal("tentative"),
	v.literal("confirmed"),
	v.literal("completed"),
	v.literal("canceled"),
);
