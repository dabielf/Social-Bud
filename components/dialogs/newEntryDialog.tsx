"use client";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerPortal,
	DrawerContent,
	DrawerHeader,
	DrawerTrigger,
	DrawerTitle,
} from "@/components/ui/drawer";

import { useDrawerStore } from "@/providers/drawer-store-provider";
import type { Doc } from "@/convex/_generated/dataModel";
import NewEntryForm from "../forms/newEntryForm";

export function NewEntryDialog({ contact }: { contact: Doc<"contacts"> }) {
	const { setNewEntryDrawer, newEntryDrawerOpen } = useDrawerStore(
		(state) => state,
	);

	return (
		<Drawer
			shouldScaleBackground
			open={newEntryDrawerOpen}
			onClose={() => setNewEntryDrawer(false)}
		>
			<Button variant="outline" onClick={() => setNewEntryDrawer(true)}>
				Add Entry
			</Button>

			<DrawerPortal>
				<DrawerContent className="sm:max-w-[425px]">
					<DrawerHeader>
						<DrawerTitle>New Journal Entry for {contact.name}</DrawerTitle>
					</DrawerHeader>
					<div className="px-4 py-4">
						<NewEntryForm
							contact={contact}
							onSubmitForm={() => setNewEntryDrawer(false)}
						/>
					</div>
				</DrawerContent>
			</DrawerPortal>
		</Drawer>
	);
}
