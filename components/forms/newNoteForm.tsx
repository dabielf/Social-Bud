/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tiptap } from "@/components/ui/tiptap";
import { Pencil, PlusIcon } from "lucide-react";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import {
	useCreateContactNote,
	useGetContact,
	useUpdateContactNote,
} from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDrawerStore } from "@/providers/drawer-store-provider";
import { updateNote } from "@/convex/notes";

interface NoteFormProps {
	contactId: Id<"contacts">;
	note?: Doc<"notes">;
	onSubmitForm?: () => void;
}

const FormSchema = z.object({
	title: z.string().min(2),
	content: z.string().min(5),
});

export function NewNoteForm({ contactId, note, onSubmitForm }: NoteFormProps) {
	const createNote = useCreateContactNote();
	const updateNote = useUpdateContactNote();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			title: note?.title || "",
			content: note?.content || "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log("data", data);
		if (note) {
			await updateNote({
				noteId: note._id,
				title: data.title,
				content: data.content,
			});
		} else {
			await createNote({
				contactId,
				title: data.title,
				content: data.content,
			});
		}

		if (onSubmitForm) onSubmitForm();
		form.reset();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							{/* <FormDescription>Min 10 characters, max 500</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Note</FormLabel>
							<FormControl>
								<Tiptap content={field.value} onChange={field.onChange} />
							</FormControl>
							{/* <FormDescription>Min 10 characters, max 500</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					{note ? "Edit Note" : "Add Note"}
				</Button>
			</form>
		</Form>
	);
}

export function EditNoteDialog() {
	const { setEditNoteDrawer, editNoteDrawerNote } = useDrawerStore(
		(state) => state,
	);

	if (!editNoteDrawerNote) return null;

	return (
		<Dialog
			open={!!editNoteDrawerNote}
			onOpenChange={() => setEditNoteDrawer()}
		>
			<Button
				variant="outline"
				className="px-4 flex  gap-2 text-sm"
				onClick={() => setEditNoteDrawer(editNoteDrawerNote)}
			>
				<Pencil className="h-5 w-5" />
				Edit Note
			</Button>

			<DialogContent>
				<DialogHeader className="mb-4">
					<DialogTitle className="text-left">Edit Note</DialogTitle>
				</DialogHeader>
				<NewNoteForm
					contactId={editNoteDrawerNote?.contactId}
					note={editNoteDrawerNote}
					onSubmitForm={() => setEditNoteDrawer()}
				/>
			</DialogContent>
		</Dialog>
	);
}

export function NewNoteDialog({
	contactId,
	note,
	onSubmitForm,
}: NoteFormProps) {
	const { setNewNoteDrawer, newNoteDrawerOpen } = useDrawerStore(
		(state) => state,
	);

	return (
		<Dialog
			open={newNoteDrawerOpen}
			onOpenChange={() => setNewNoteDrawer(false)}
		>
			<Button
				variant="outline"
				className="px-4 flex  gap-2 text-sm"
				onClick={() => setNewNoteDrawer(true)}
			>
				<PlusIcon className="h-5 w-5" />
				Add Note
			</Button>

			<DialogContent>
				<DialogHeader className="mb-4">
					<DialogTitle className="text-left">Add a Note</DialogTitle>
				</DialogHeader>
				<NewNoteForm
					contactId={contactId}
					note={note}
					onSubmitForm={() => setNewNoteDrawer(false)}
				/>
			</DialogContent>
		</Dialog>
	);
}
