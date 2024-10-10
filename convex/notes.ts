import { v } from "convex/values";

import { userMutation, userQuery } from "./helpers";
import { paginationOptsValidator } from "convex/server";

// create note for contact
export const createNote = userMutation({
	args: {
		contactId: v.id("contacts"),
		title: v.string(),
		content: v.string(),
	},
	handler: async (ctx, { contactId, title, content }) => {
		const user = ctx.user;
		const contact = await ctx.db.get(contactId);
		if (!contact) return null;

		const date = new Date().valueOf();

		const note = await ctx.db.insert("notes", {
			userId: user._id,
			contactId: contact._id,
			title,
			content,
			date,
		});

		return note;
	},
});

export const updateNote = userMutation({
	args: {
		noteId: v.id("notes"),
		content: v.string(),
	},
	handler: async (ctx, { noteId, content }) => {
		const user = ctx.user;
		const note = await ctx.db.get(noteId);
		if (!note || note.userId !== user._id) {
			throw new Error("Note not found or you don't have permission to edit it");
		}

		const updatedFields: Partial<typeof note> = {};
		updatedFields.content = content;

		const updatedNote = await ctx.db.patch(noteId, updatedFields);
		return updatedNote;
	},
});

export const getContactNotes = userQuery({
	args: {
		contactId: v.id("contacts"),
		paginationOpts: paginationOptsValidator,
	},
	handler: async (ctx, { contactId, paginationOpts }) => {
		const query = ctx.db
			.query("notes")
			.withIndex("by_contact_id", (q) => q.eq("contactId", contactId))
			.paginate(paginationOpts);

		return await query;
	},
});

export const deleteNote = userMutation({
	args: {
		noteId: v.id("notes"),
	},
	handler: async (ctx, { noteId }) => {
		const user = ctx.user;
		const note = await ctx.db.get(noteId);
		if (!note || note.userId !== user._id) {
			throw new Error(
				"Note not found or you don't have permission to delete it",
			);
		}

		await ctx.db.delete(noteId);
		return true;
	},
});
