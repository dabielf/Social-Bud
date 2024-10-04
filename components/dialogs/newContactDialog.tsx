"use client";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerPortal,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";

import { NewContactForm } from "../forms/newContact";
import { useDrawerStore } from "@/providers/drawer-store-provider";

export function NewContactDialogTrigger() {
	const { setNewContactDrawer } = useDrawerStore((state) => state);
	return (
		<Button variant="outline" onClick={() => setNewContactDrawer(true)}>
			Add Contact
		</Button>
	);
}

export function NewContactDialog() {
	const { setNewContactDrawer, newContactDrawerOpen } = useDrawerStore(
		(state) => state,
	);

	return (
		<Drawer
			shouldScaleBackground
			open={newContactDrawerOpen}
			onClose={() => setNewContactDrawer(false)}
		>
			<DrawerPortal>
				<DrawerContent className="sm:max-w-[425px]">
					<DrawerHeader>
						<DrawerTitle>Add a new contact</DrawerTitle>
					</DrawerHeader>
					<div className="px-4 py-4">
						<NewContactForm onSubmitForm={() => setNewContactDrawer(false)} />
					</div>
				</DrawerContent>
			</DrawerPortal>
		</Drawer>
	);
}
