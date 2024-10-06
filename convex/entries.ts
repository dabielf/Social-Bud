import { v } from "convex/values";

import { userMutation, userQuery } from "./helpers";
import { ContactEntryType } from "./types";
import { paginationOptsValidator } from "convex/server";

export const createContactEntry = userMutation({
	args: {
		contactId: v.id("contacts"),
		entryType: ContactEntryType,
		contactName: v.string(),
		date: v.number(),
		content: v.string(),
	},
	handler: async (
		ctx,
		{ contactId, entryType, contactName, date, content },
	) => {
		const user = ctx.user;
		const contact = await ctx.db.get(contactId);
		if (!contact) return null;

		const entry = await ctx.db.insert("entries", {
			userId: user._id,
			contactId: contact._id,
			entryType,
			contactName,
			date,
			content,
		});

		return entry;
	},
});

export const editContactEntry = userMutation({
	args: {
		entryId: v.id("entries"),
		entryType: v.optional(ContactEntryType),
		contactName: v.optional(v.string()),
		date: v.optional(v.number()),
		content: v.optional(v.string()),
	},
	handler: async (ctx, { entryId, entryType, contactName, date, content }) => {
		const user = ctx.user;
		const entry = await ctx.db.get(entryId);

		if (!entry || entry.userId !== user._id) {
			throw new Error(
				"Entry not found or you don't have permission to edit it",
			);
		}

		const updatedFields: Partial<typeof entry> = {};
		if (entryType !== undefined) updatedFields.entryType = entryType;
		if (contactName !== undefined) updatedFields.contactName = contactName;
		if (date !== undefined) updatedFields.date = date;
		if (content !== undefined) updatedFields.content = content;

		const updatedEntry = await ctx.db.patch(entryId, updatedFields);
		return updatedEntry;
	},
});

// method for deletuig a contact entry
export const deleteContactEntry = userMutation({
	args: {
		entryId: v.id("entries"),
	},
	handler: async (ctx, { entryId }) => {
		const user = ctx.user;
		const entry = await ctx.db.get(entryId);
		if (!entry || entry.userId !== user._id) {
			throw new Error(
				"Entry not found or you don't have permission to delete it",
			);
		}

		await ctx.db.delete(entryId);
		return entry;
	},
});

export const getUserEntries = userQuery({
	args: { paginationOpts: paginationOptsValidator },

	handler: async (ctx, args) => {
		const user = ctx.user;
		const query = ctx.db
			.query("entries")
			.withIndex("by_user", (q) => q.eq("userId", user._id))
			.paginate(args.paginationOpts);

		return await query;
	},
});
