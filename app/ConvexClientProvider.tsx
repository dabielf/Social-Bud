"use client";

import type { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ErrorBoundary } from "./ErrorBoundary";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
	return (
		<ErrorBoundary>
			<ClerkProvider
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
			>
				<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
					{children}
				</ConvexProviderWithClerk>
			</ClerkProvider>
		</ErrorBoundary>
	);
}
