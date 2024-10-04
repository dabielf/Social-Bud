"use client";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerPortal,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerFooter,
	DrawerClose,
} from "@/components/ui/drawer";

import { useDeleteUserContact } from "@/lib/hooks";
import type { Doc } from "@/convex/_generated/dataModel";
import { Trash } from "lucide-react";
import { useDrawerStore } from "@/providers/drawer-store-provider";

export function DeleteContactDialogTrigger({
	contact,
}: { contact: Doc<"contacts"> }) {
	const { setDeleteContactDrawer } = useDrawerStore((state) => state);
	return (
		<Button
			variant="ghost"
			className="flex flex-row gap-2 text-destructive"
			onClick={() => setDeleteContactDrawer(contact)}
		>
			<Trash size={18} />
			Delete Contact
		</Button>
	);
}

export function DeleteContactDialog() {
	const deleteUserContact = useDeleteUserContact();
	const { setDeleteContactDrawer, deleteDrawerContact } = useDrawerStore(
		(state) => state,
	);

	if (!deleteDrawerContact) return null;

	return (
		<Drawer
			shouldScaleBackground
			open={!!deleteDrawerContact}
			onClose={() => setDeleteContactDrawer()}
		>
			<DrawerPortal>
				<DrawerContent className="sm:max-w-[425px]">
					<DrawerHeader>
						<DrawerTitle>
							Delete &rdquo;{deleteDrawerContact.name}&ldquo;
						</DrawerTitle>
					</DrawerHeader>
					<div className="px-4 py-4 text-center text-destructive font-medium underline">
						Are you sure ? This action cannot be undone!
					</div>
					<DrawerFooter>
						<DrawerClose asChild>
							<Button
								variant="outline"
								onClick={() => setDeleteContactDrawer()}
							>
								Cancel
							</Button>
						</DrawerClose>
						<DrawerClose asChild>
							<Button
								variant="destructive"
								onClick={() => {
									void deleteUserContact({
										contactId: deleteDrawerContact._id,
									});
									setDeleteContactDrawer();
								}}
							>
								Delete
							</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</DrawerPortal>
		</Drawer>
	);
}
