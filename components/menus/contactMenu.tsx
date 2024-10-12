"use client";

import { Ellipsis, Pencil, PlusIcon, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogClose,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { DeleteContactDialogTrigger } from "../dialogs/deleteContactDialog";
import type { Doc } from "@/convex/_generated/dataModel";
import { useDeleteContactNote } from "@/lib/hooks";
import { useDrawerStore } from "@/providers/drawer-store-provider";
import { NewNoteForm } from "../forms/newNoteForm";
import { useState } from "react";
import { DialogPortal } from "@radix-ui/react-dialog";
import {
	DeleteEntryDialogTrigger,
	DeleteNoteDialogTrigger,
	EditEntryDialogTrigger,
	EditNoteDialogTrigger,
} from "../dialogs/notesDialogs";

export function ContactDropdownMenu({ contact }: { contact: Doc<"contacts"> }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					<Ellipsis />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuPortal>
				<DropdownMenuContent>
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<DeleteContactDialogTrigger contact={contact} />
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenuPortal>
		</DropdownMenu>
	);
}

interface NoteFormProps {
	contact: Doc<"contacts">;
	note?: Doc<"notes">;
	onSubmitForm?: () => void;
}

export function ContactNoteDropdownMenu({
	contact,
	note,
}: { contact: Doc<"contacts">; note: Doc<"notes"> }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					<Ellipsis size={12} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuPortal>
				<DropdownMenuContent>
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<EditNoteDialogTrigger note={note} />
						</DropdownMenuItem>
						<DropdownMenuItem>
							<DeleteNoteDialogTrigger note={note} />
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenuPortal>
		</DropdownMenu>
	);
}

export function ContactEntryDropdownMenu({
	entry,
}: { contact: Doc<"contacts">; entry: Doc<"entries"> }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					<Ellipsis size={12} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuPortal>
				<DropdownMenuContent>
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<EditEntryDialogTrigger entry={entry} />
						</DropdownMenuItem>
						<DropdownMenuItem>
							<DeleteEntryDialogTrigger entry={entry} />
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenuPortal>
		</DropdownMenu>
	);
}
