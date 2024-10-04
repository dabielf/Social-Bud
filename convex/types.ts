import { v } from "convex/values";

export const ContactEntryType = v.union(
	v.literal("entry"),
	v.literal("contact"),
	v.literal("date"),
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
	v.literal("no-show"),
);
