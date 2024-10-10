/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { Tiptap } from "@/components/ui/tiptap";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormDescription,
	FormMessage,
} from "@/components/ui/form";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import type { Doc } from "@/convex/_generated/dataModel";
import { useCreateContactNote } from "@/lib/hooks";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

interface NoteFormProps {
	contact: Doc<"contacts">;
	note?: Doc<"notes">;
	onSubmitForm?: () => void;
}

const FormSchema = z.object({
	title: z.string().min(2),
	content: z.string().min(5),
});

export function NewNoteForm({ contact, note, onSubmitForm }: NoteFormProps) {
	const createNote = useCreateContactNote();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			title: note?.title || "",
			content: note?.content || "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log("data", data);
		const entryId = await createNote({
			contactId: contact._id,
			title: data.title,
			content: data.content,
		});
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
					Add Note
				</Button>
			</form>
		</Form>
	);
}

export function NewNoteDialog({ contact, note, onSubmitForm }: NoteFormProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Add Note</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="mb-4">
					<DialogTitle className="text-left">
						New Note for {contact.name}
					</DialogTitle>
				</DialogHeader>
				<NewNoteForm
					contact={contact}
					note={note}
					onSubmitForm={onSubmitForm}
				/>
			</DialogContent>
		</Dialog>
	);
}
