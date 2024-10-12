import { v } from "convex/values";

import { userMutation, userQuery } from "./helpers";
import { paginationOptsValidator } from "convex/server";

export const createContactEntry = userMutation({
	args: {
		contactId: v.id("contacts"),
		inPerson: v.boolean(),
		contactName: v.string(),
		date: v.number(),
		content: v.string(),
	},
	handler: async (ctx, { contactId, inPerson, contactName, date, content }) => {
		const user = ctx.user;
		const contact = await ctx.db.get(contactId);
		if (!contact) return null;

		const entry = await ctx.db.insert("entries", {
			userId: user._id,
			contactId: contact._id,

			inPerson,
			contactName,
			date,
			content,
		});

		console.log("entry", entry);
		const newTotalEntries = contact.totalEntries ? contact.totalEntries + 1 : 1;
		await ctx.db.patch(contact._id, {
			totalEntries: newTotalEntries,
		});
		return entry;
	},
});

export const editContactEntry = userMutation({
	args: {
		entryId: v.id("entries"),
		inPerson: v.optional(v.boolean()),
		contactName: v.optional(v.string()),
		date: v.optional(v.number()),
		content: v.optional(v.string()),
	},
	handler: async (ctx, { entryId, inPerson, contactName, date, content }) => {
		const user = ctx.user;
		const entry = await ctx.db.get(entryId);

		if (!entry || entry.userId !== user._id) {
			throw new Error(
				"Entry not found or you don't have permission to edit it",
			);
		}

		const updatedFields: Partial<typeof entry> = {};
		if (inPerson !== undefined) updatedFields.inPerson = inPerson;
		if (contactName !== undefined) updatedFields.contactName = contactName;
		if (date !== undefined) updatedFields.date = date;
		if (content !== undefined) updatedFields.content = content;

		const updatedEntry = await ctx.db.patch(entryId, updatedFields);
		return updatedEntry;
	},
});

// method for deleting contact entries
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
		const contact = await ctx.db.get(entry.contactId);
		if (!contact) return null;
		const newTotalEntries = contact.totalEntries ? contact.totalEntries - 1 : 0;
		await ctx.db.patch(contact._id, {
			totalEntries: newTotalEntries,
		});
		return entry;
	},
});

export const getContactEntries = userQuery({
	args: {
		contactId: v.id("contacts"),
		paginationOpts: paginationOptsValidator,
	},
	handler: async (ctx, { contactId, paginationOpts }) => {
		const query = ctx.db
			.query("entries")
			.withIndex("by_contact_id", (q) => q.eq("contactId", contactId))
			.order("desc")
			.paginate(paginationOpts);

		return await query;
	},
});

export const getEntry = userQuery({
	args: { entryId: v.id("entries") },
	handler: async (ctx, { entryId }) => {
		const entry = await ctx.db.get(entryId);
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
