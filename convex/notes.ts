import { v } from "convex/values";

import { userMutation, userQuery } from "./helpers";

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
		const totalNotes = contact.totalNotes ? contact.totalNotes + 1 : 1;
		await ctx.db.patch(contact._id, {
			totalNotes: totalNotes,
		});

		return note;
	},
});

export const updateNote = userMutation({
	args: {
		noteId: v.id("notes"),
		title: v.optional(v.string()),
		content: v.string(),
	},
	handler: async (ctx, { noteId, title, content }) => {
		const user = ctx.user;
		const note = await ctx.db.get(noteId);
		if (!note || note.userId !== user._id) {
			throw new Error("Note not found or you don't have permission to edit it");
		}

		const updatedFields: Partial<typeof note> = {};
		updatedFields.content = content;
		if (title) updatedFields.title = title;

		const updatedNote = await ctx.db.patch(noteId, updatedFields);
		return updatedNote;
	},
});

export const getContactNotes = userQuery({
	args: { contactId: v.id("contacts") },
	handler: async (ctx, args) => {
		const notes = await ctx.db
			.query("notes")
			.filter((q) => q.eq(q.field("contactId"), args.contactId))
			.order("desc")
			.collect();
		return notes;
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
		const contact = await ctx.db.get(note.contactId);
		if (contact) {
			const totalNotes = contact.totalNotes ? contact.totalNotes - 1 : 0;
			await ctx.db.patch(contact._id, {
				totalNotes: totalNotes,
			});
		}

		await ctx.db.delete(noteId);
		return true;
	},
});
