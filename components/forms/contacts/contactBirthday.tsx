/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { useUpdateUserContact } from "@/lib/hooks";
import { ContactContext } from "./contactContext";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormDescription,
	FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner";
import { useState, useContext } from "react";
import { Check, Pencil, X } from "lucide-react";

const FormSchema = z.object({
	birthday: z.date({
		required_error: "A date of birth is required.",
	}),
});

export function ContactBirthdayForm() {
	const [edit, setEdit] = useState(false);
	const contact = useContext(ContactContext);
	const updateUserContact = useUpdateUserContact();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		values: {
			birthday: contact?.birthday ? new Date(contact?.birthday) : new Date(),
		},
	});

	if (!contact) return null;

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		if (!contact) return null;
		await updateUserContact({
			contactId: contact._id,
			birthday: data.birthday.valueOf(),
		});

		setEdit(false);
		form.reset();
	}

	const edited = form.getValues("birthday") !== new Date(contact.birthday || 0);

	return (
		<div className="flex flex-col w-full group">
			{/* <h2 className="text-xl font-bold text-primary/70">Name</h2> */}

			{edit ? (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="birthday"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Birthday</FormLabel>
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
									<FormDescription>
										Your date of birth is used to calculate your age.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			) : (
				<div className="flex flex-row w-full items-center justify-between gap-2 ">
					<h1 className="text-3xl font-bold">{contact.name}</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						className="transition-opacity opacity-0 group-hover:opacity-100 hover:cursor-pointer"
						onClick={() => setEdit(true)}
					>
						<Pencil size={24} />
					</div>
				</div>
			)}
		</div>
	);
}
