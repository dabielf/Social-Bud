"use client";

import { createContext } from "react";
import type { Doc } from "@/convex/_generated/dataModel";

export const ContactContext = createContext<Doc<"contacts"> | null>(null);

export function ContactProvider({
	contact,
	children,
}: { contact: Doc<"contacts">; children: React.ReactNode }) {
	return (
		<ContactContext.Provider value={contact}>
			{children}
		</ContactContext.Provider>
	);
}
