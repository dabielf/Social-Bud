/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import type { Doc } from "@/convex/_generated/dataModel";
import { useCreateContactEntry } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface EntryFormProps {
	contact: Doc<"contacts">;
	entry?: Doc<"entries">;
	onSubmitForm?: () => void;
}

const FormSchema = z.object({
	inPerson: z.boolean(),
	date: z.date(),
	content: z.string().min(10).max(500),
});

export function NewEntryForm({ contact, entry, onSubmitForm }: EntryFormProps) {
	const createEntry = useCreateContactEntry();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			inPerson: entry?.inPerson || false,
			date: entry?.date ? new Date(entry?.date) : new Date(),
			content: entry?.content || "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log("data", data);
		await createEntry({
			contactId: contact._id,
			contactName: contact.name,
			inPerson: data.inPerson,
			date: data.date.valueOf(),
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
					name="inPerson"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-2 space-y-0">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>In Person?</FormLabel>
							</div>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[240px] pl-3 text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date("1900-01-01")
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Notes</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Tell us a little bit about yourself"
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormDescription>Min 10 characters, max 500</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					Add Journal Entry
				</Button>
			</form>
		</Form>
	);
}

export function NewEntryDialog({
	contact,
	entry,
	onSubmitForm,
}: EntryFormProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Add Journal Entry</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="mb-4">
					<DialogTitle className="text-left">
						New Journal Entry for {contact.name}
					</DialogTitle>
				</DialogHeader>
				<NewEntryForm
					contact={contact}
					entry={entry}
					onSubmitForm={onSubmitForm}
				/>
			</DialogContent>
		</Dialog>
	);
}
