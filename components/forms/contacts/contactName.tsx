/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { useUpdateUserContact } from "@/lib/hooks";
import { ContactContext } from "./contactContext";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState, useContext } from "react";
import { Check, Pencil, X } from "lucide-react";

const FormSchema = z.object({
	name: z.string().min(2, {
		message: "name must be at least 2 characters.",
	}),
});

export function ContactNameForm() {
	const [edit, setEdit] = useState(false);
	const contact = useContext(ContactContext);
	const updateUserContact = useUpdateUserContact();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		values: {
			name: contact?.name || "",
		},
	});

	if (!contact) return null;

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		if (!contact) return null;
		await updateUserContact({
			contactId: contact._id,
			name: data.name,
		});

		toast(`${contact.name} name updated to ${data.name}`);
		setEdit(false);
		form.reset();
	}

	const edited = form.getValues("name") !== contact.name;

	return (
		<div className="flex flex-col w-full group text-white">
			{/* <h2 className="text-xl font-bold text-primary/70">Name</h2> */}

			{edit ? (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
						<div className="flex flex-row gap-2 w-full items-center justify-between">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="grow flex">
										<FormControl>
											<Input
												className="grow text-xl"
												placeholder={contact.name}
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							{edited ? (
								<Button type="submit">
									<Check />
								</Button>
							) : (
								<Button onClick={() => setEdit(false)}>
									<X />
								</Button>
							)}
						</div>
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
