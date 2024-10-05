/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { useCreateUserContact } from "@/lib/hooks";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
	name: z.string().min(2, {
		message: "name must be at least 2 characters.",
	}),
	type: z.enum(["other", "family", "friend", "date"]),
});

export function NewContactForm({
	onSubmitForm,
}: { onSubmitForm?: () => void }) {
	const createUserContact = useCreateUserContact();
	const router = useRouter();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			type: "friend",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const contactId = await createUserContact({
			name: data.name,
			type: data.type,
		});

		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">
						{JSON.stringify({ ...data, _id: contactId }, null, 2)}
					</code>
				</pre>
			),
		});
		if (onSubmitForm) onSubmitForm();
		form.reset();
		router.push(`/contacts/${contactId}`);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="text-left">
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input className="text-lg" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem className="text-left">
							<FormLabel>Type of Contact</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="text-lg">
										<SelectValue placeholder="Select the type of contact" />
									</SelectTrigger>
								</FormControl>
								<SelectContent className="text-lg">
									<SelectItem className="text-lg" value="friend">
										Friend
									</SelectItem>
									<SelectItem className="text-lg" value="family">
										Family
									</SelectItem>
									<SelectItem className="text-lg" value="date">
										Date
									</SelectItem>
									<SelectItem className="text-lg" value="other">
										Other
									</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" variant="secondary" className="w-full">
					Save Contact
				</Button>
			</form>
		</Form>
	);
}
