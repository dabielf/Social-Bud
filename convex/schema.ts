// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { ActivityStatusType, ContactEntryType, ContactType } from "./types";

export default defineSchema(
	{
		users: defineTable({
			clerkId: v.string(),
			name: v.optional(v.string()),
			email: v.optional(v.string()),
			userSettings: v.optional(v.id("userSettings")),
			picture: v.optional(v.id("_storage")),
			pictureUrl: v.optional(v.string()),
		})
			.index("by_clerkId", ["clerkId"])
			.index("by_email", ["email"]),
		userSettings: defineTable({
			userId: v.id("users"),
			daysBeforeContact: v.optional(v.number()),
		}).index("by_userId", ["userId"]),
		contacts: defineTable({
			userId: v.id("users"),
			name: v.string(),
			imgUrl: v.optional(v.string()),
			imgUrlId: v.optional(v.id("_storage")),
			type: ContactType,
			isPinned: v.optional(v.boolean()),
			totalEntries: v.optional(v.number()),
			mostRecentEntryDate: v.optional(v.number()),
			mostRecentEntryId: v.optional(v.id("entries")),
			nextEntryDate: v.optional(v.number()),
			nextEntryId: v.optional(v.id("events")),
			contactInterval: v.optional(v.number()),
			snooze: v.optional(v.boolean()),
			archived: v.boolean(),
			archivedReason: v.optional(v.string()),
		})
			.index("by_user", ["userId"])
			.index("by_name", ["name"])
			.index("by_user_archived", ["userId", "archived"])
			.index("by_user_type", ["userId", "type"]),
		contactInfos: defineTable({
			userId: v.id("users"),
			contactId: v.id("contacts"),
			contactInfo: v.optional(v.string()),
			location: v.optional(v.string()),
			messagingApp: v.optional(v.string()),
			birthdayDate: v.optional(
				v.object({
					day: v.number(),
					month: v.number(),
					year: v.optional(v.number()),
				}),
			),

			totalContacts: v.optional(v.number()),
			totalInPerson: v.optional(v.number()),
		})
			.index("by_user", ["userId"])
			.index("by_contact_id", ["contactId"]),
		contactActivities: defineTable({
			userId: v.id("users"),
			contactId: v.id("contacts"),
			activityId: v.id("activities"),
		})
			.index("by_user", ["userId"])
			.index("by_contact_id", ["contactId"])
			.index("by_user_contact", ["userId", "contactId"])
			.index("by_activity", ["activityId"]),
		activities: defineTable({
			userId: v.id("users"),
			contactId: v.id("contacts"),
			activityName: v.string(),
			date: v.number(),
			location: v.optional(v.string()),
			activityDuration: v.optional(v.number()),
			note: v.optional(v.id("notes")),
			status: ActivityStatusType,
		})
			.index("by_user", ["userId"])
			.index("by_contact_id", ["contactId"])
			.index("by_date", ["date"])
			.index("by_user_contact", ["userId", "contactId"])
			.index("by_status", ["status"]),
		entries: defineTable({
			userId: v.id("users"),
			contactId: v.id("contacts"),
			entryType: ContactEntryType,
			contactName: v.string(),
			date: v.number(),
			noteId: v.optional(v.id("notes")),
		})
			.index("by_user", ["userId"])
			.index("by_contact_id", ["contactId"])
			.index("by_user_contact", ["userId", "contactId"])
			.index("by_entryType", ["entryType"])
			.index("by_date", ["date"]),
		notes: defineTable({
			userId: v.id("users"),
			contactId: v.id("contacts"),
			entryId: v.id("entries"),
			content: v.string(),
			date: v.number(),
		})
			.index("by_user", ["userId"])
			.index("by_contact_id", ["contactId"])
			.index("by_entry", ["entryId"])
			.index("by_date", ["date"]),
	},
	// If you ever get an error about schema mismatch
	// between your data and your schema, and you cannot
	// change the schema to match the current data in your database,
	// you can:
	//  1. Use the dashboard to delete tables or individual documents
	//     that are causing the error.
	//  2. Change this option to `false` and make changes to the data
	//     freely, ignoring the schema. Don't forget to change back to `true`!
	{ schemaValidation: true },
);
