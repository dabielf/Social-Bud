import { v } from "convex/values";

import { userMutation, userQuery } from "./helpers";
import { mutation } from "./_generated/server";
import { ContactEntryType } from "./types";

export const getUserContacts = userQuery({
	args: {},
	handler: async (ctx) => {
		const user = ctx.user;

		return await ctx.db
			.query("contacts")
			.withIndex("by_user", (q) => q.eq("userId", user._id))
			.collect();
	},
});

export const getUserContact = userQuery({
	args: {
		contactId: v.id("contacts"),
	},
	handler: async (ctx, { contactId }) => {
		return await ctx.db.get(contactId);
	},
});

export const createUserContact = userMutation({
	args: {
		name: v.string(),
		type: v.union(
			v.literal("other"),
			v.literal("family"),
			v.literal("friend"),
			v.literal("date"),
		),
	},
	handler: async (ctx, { name, type }) => {
		const user = ctx.user;
		const contact = await ctx.db.insert("contacts", {
			userId: user._id,
			name,
			type,
			archived: false,
		});
		return contact;
	},
});

export const deleteUserContact = userMutation({
	args: {
		contactId: v.id("contacts"),
	},
	handler: async (ctx, { contactId }) => {
		const user = ctx.user;
		const contact = await ctx.db.get(contactId);
		if (!contact) return null;
		if (contact.userId !== user._id) return null;

		// Delete contact image
		if (contact.imgUrlId) {
			try {
				await ctx.storage.delete(contact.imgUrlId);
			} catch (e) {
				console.log(e);
			}
		}

		// Contact Infos
		const contactInfos = await ctx.db
			.query("contactInfos")
			.withIndex("by_contact_id", (q) => q.eq("contactId", contactId))
			.unique();
		if (contactInfos?._id) await ctx.db.delete(contactInfos._id);

		// Contact Activities
		const contactActivities = await ctx.db
			.query("contactActivities")
			.withIndex("by_contact_id", (q) => q.eq("contactId", contactId))
			.collect();
		if (contactActivities?.length) {
			await Promise.all(
				contactActivities.map(
					async (contactActivity) => await ctx.db.delete(contactActivity._id),
				),
			);
		}

		// Activities
		const activities = await ctx.db
			.query("activities")
			.withIndex("by_contact_id", (q) => q.eq("contactId", contactId))
			.collect();
		if (activities?.length) {
			await Promise.all(
				activities.map(async (activity) => await ctx.db.delete(activity._id)),
			);
		}

		// Entries
		const entries = await ctx.db
			.query("entries")
			.withIndex("by_contact_id", (q) => q.eq("contactId", contactId))
			.collect();
		if (entries?.length) {
			await Promise.all(
				entries.map(async (entry) => await ctx.db.delete(entry._id)),
			);
		}

		// Notes
		const notes = await ctx.db
			.query("notes")
			.withIndex("by_contact_id", (q) => q.eq("contactId", contactId))
			.collect();
		if (notes?.length) {
			await Promise.all(
				notes.map(async (note) => await ctx.db.delete(note._id)),
			);
		}

		const contactDeletedId = await ctx.db.delete(contactId);

		return contactDeletedId;
	},
});

export const updateUserContact = userMutation({
	args: {
		contactId: v.id("contacts"),
		name: v.optional(v.string()),
		imgUrl: v.optional(v.string()),
		isPinned: v.optional(v.boolean()),
		type: v.optional(
			v.union(
				v.literal("other"),
				v.literal("family"),
				v.literal("friend"),
				v.literal("date"),
			),
		),
	},
	handler: async (ctx, { contactId, name, type, imgUrl, isPinned }) => {
		const user = ctx.user;
		const contact = await ctx.db.get(contactId);
		if (!contact) return null;
		const contactUpdatedId = await ctx.db.patch(contactId, {
			userId: user._id,
			name: name || contact.name,
			type: type || contact.type,
			imgUrl: imgUrl || contact.imgUrl,
			isPinned: isPinned || contact.isPinned,
		});

		return contactUpdatedId;
	},
});

export const addContactEntry = userMutation({
	args: {
		contactId: v.id("contacts"),
		entryType: ContactEntryType,
		contactName: v.string(),
		date: v.number(),
		note: v.string(),
	},
	handler: async (ctx, { contactId, entryType, contactName, date, note }) => {
		const user = ctx.user;
		const contact = await ctx.db.get(contactId);
		if (!contact) return null;

		const entry = await ctx.db.insert("entries", {
			userId: user._id,
			contactId: contact._id,
			entryType,
			contactName,
			date,
		});

		const newNote = await ctx.db.insert("notes", {
			userId: user._id,
			contactId: contact._id,
			entryId: entry,
			content: note,
			date,
		});

		return { entry, note: newNote };
	},
});
