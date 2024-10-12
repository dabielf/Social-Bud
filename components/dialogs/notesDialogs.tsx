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

import {
	useDeleteContactEntry,
	useDeleteContactNote,
	useDeleteUserContact,
	useUpdateContactNote,
} from "@/lib/hooks";
import type { Doc } from "@/convex/_generated/dataModel";
import { Pencil, Trash } from "lucide-react";
import { useDrawerStore } from "@/providers/drawer-store-provider";

export function DeleteNoteDialogTrigger({ note }: { note: Doc<"notes"> }) {
	const { setDeleteNoteDrawer } = useDrawerStore((state) => state);
	return (
		<Button
			variant="ghost"
			size="sm"
			className="flex flex-row gap-2 text-destructive"
			onClick={() => setDeleteNoteDrawer(note)}
		>
			<Trash size={18} />
			Delete
		</Button>
	);
}

export function DeleteEntryDialogTrigger({ entry }: { entry: Doc<"entries"> }) {
	const { setDeleteEntryDrawer } = useDrawerStore((state) => state);
	return (
		<Button
			variant="ghost"
			size="sm"
			className="flex flex-row gap-2 text-destructive"
			onClick={() => setDeleteEntryDrawer(entry)}
		>
			<Trash size={18} />
			Delete
		</Button>
	);
}

export function EditNoteDialogTrigger({ note }: { note: Doc<"notes"> }) {
	const { setEditNoteDrawer } = useDrawerStore((state) => state);
	return (
		<Button
			variant="ghost"
			size="sm"
			className="flex flex-row gap-2"
			onClick={() => setEditNoteDrawer(note)}
		>
			<Pencil size={18} />
			Edit
		</Button>
	);
}

export function EditEntryDialogTrigger({ entry }: { entry: Doc<"entries"> }) {
	const { setEditEntryDrawer } = useDrawerStore((state) => state);
	return (
		<Button
			variant="ghost"
			size="sm"
			className="flex flex-row gap-2"
			onClick={() => setEditEntryDrawer(entry)}
		>
			<Pencil size={18} />
			Edit
		</Button>
	);
}

export function DeleteNoteDialog() {
	const deleteContactNote = useDeleteContactNote();
	const { setDeleteNoteDrawer, deleteNoteDrawerNote } = useDrawerStore(
		(state) => state,
	);

	if (!deleteNoteDrawerNote) return null;

	return (
		<Drawer
			shouldScaleBackground
			open={!!deleteNoteDrawerNote}
			onClose={() => setDeleteNoteDrawer()}
		>
			<DrawerPortal>
				<DrawerContent className="sm:max-w-[425px]">
					<DrawerHeader>
						<DrawerTitle>Delete note: {deleteNoteDrawerNote.title}</DrawerTitle>
					</DrawerHeader>
					<div className="px-4 py-4 text-center text-destructive font-medium underline">
						Are you sure ? This action cannot be undone!
					</div>
					<DrawerFooter>
						<DrawerClose asChild>
							<Button variant="outline" onClick={() => setDeleteNoteDrawer()}>
								Cancel
							</Button>
						</DrawerClose>
						<DrawerClose asChild>
							<Button
								variant="destructive"
								onClick={() => {
									void deleteContactNote({
										noteId: deleteNoteDrawerNote._id,
									});
									setDeleteNoteDrawer();
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

export function DeleteEntryDialog() {
	const deleteContactEntry = useDeleteContactEntry();
	const { setDeleteEntryDrawer, deleteEntryDrawerEntry } = useDrawerStore(
		(state) => state,
	);

	if (!deleteEntryDrawerEntry) return null;

	return (
		<Drawer
			shouldScaleBackground
			open={!!deleteEntryDrawerEntry}
			onClose={() => setDeleteEntryDrawer()}
		>
			<DrawerPortal>
				<DrawerContent className="sm:max-w-[425px]">
					<DrawerHeader>
						<DrawerTitle>Delete entry</DrawerTitle>
					</DrawerHeader>
					<div className="px-4 py-4 text-center text-destructive font-medium underline">
						Are you sure ? This action cannot be undone!
					</div>
					<DrawerFooter>
						<DrawerClose asChild>
							<Button variant="outline" onClick={() => setDeleteEntryDrawer()}>
								Cancel
							</Button>
						</DrawerClose>
						<DrawerClose asChild>
							<Button
								variant="destructive"
								onClick={() => {
									void deleteContactEntry({
										entryId: deleteEntryDrawerEntry._id,
									});
									setDeleteEntryDrawer();
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
