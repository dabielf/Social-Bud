import type { GenericMutationCtx, GenericQueryCtx } from "convex/server";
import { query, mutation } from "./_generated/server";
import { ConvexError } from "convex/values";
import {} from "./_generated/server";
import {
	customCtx,
	customQuery,
	customMutation,
} from "convex-helpers/server/customFunctions";

export const userQuery = customQuery(
	query,
	customCtx(async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("must be logged in");
		}
		const user = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
			.unique();
		if (!user) {
			throw new ConvexError("user not found");
		}
		return {
			user: { ...identity, clerkId: identity.subject, _id: user._id },
			db: ctx.db,
		};
	}),
);

export const userMutation = customMutation(mutation, {
	args: {},
	input: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("must be logged in");
		}
		const user = await ctx.db
			.query("users")
			.withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
			.unique();
		if (!user) {
			throw new ConvexError("user not found");
		}
		// Note: we're passing args through, so they'll be available below
		return {
			ctx: {
				user: { ...identity, clerkId: identity.subject, _id: user._id },
				db: ctx.db,
			},
			args,
		};
	},
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function getConvexQueryUser(ctx: GenericQueryCtx<any>) {
	const identity = await ctx.auth.getUserIdentity();
	if (!identity) {
		// throw new ConvexError('must be logged in');
		return null;
	}

	const user = await ctx.db
		.query("users")
		.withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
		.unique();

	if (!user) {
		throw new ConvexError("user not found");
	}

	return { ...identity, clerkId: identity.subject, _id: user._id };
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function getConvexMutationUser(ctx: GenericMutationCtx<any>) {
	const identity = await ctx.auth.getUserIdentity();
	if (!identity) {
		// throw new ConvexError('must be logged in');
		return null;
	}

	const user = await ctx.db
		.query("users")
		.withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
		.unique();

	if (!user) {
		throw new ConvexError("user not found");
	}

	if (user.email && user.name) return user;

	if (!user.email && identity.email) {
		await ctx.db.patch(user._id, {
			email: identity.email,
		});
	}

	if (!user.name && identity.givenName) {
		await ctx.db.patch(user._id, {
			name: identity.givenName,
		});
	}

	return user;
}
