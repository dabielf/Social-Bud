"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export default function ContactInfo() {
// 	return (
// 		<Tabs defaultValue="account" className="w-[400px]">
// 			<TabsList className="grid w-full grid-cols-3">
// 				<TabsTrigger value="account">Infos</TabsTrigger>
// 				<TabsTrigger value="history">History</TabsTrigger>
// 				<TabsTrigger value="password">Settings</TabsTrigger>
// 			</TabsList>
// 			<TabsContent value="account">
// 				<Card>
// 					<CardHeader>
// 						<CardTitle>Account</CardTitle>
// 						<CardDescription>
// 							Make changes to your account here. Click save when you're done.
// 						</CardDescription>
// 					</CardHeader>
// 					<CardContent className="space-y-2">
// 						<div className="space-y-1">
// 							<Label htmlFor="name">Name</Label>
// 							<Input id="name" defaultValue="Pedro Duarte" />
// 						</div>
// 						<div className="space-y-1">
// 							<Label htmlFor="username">Username</Label>
// 							<Input id="username" defaultValue="@peduarte" />
// 						</div>
// 					</CardContent>
// 					<CardFooter>
// 						<Button>Save changes</Button>
// 					</CardFooter>
// 				</Card>
// 			</TabsContent>
// 			<TabsContent value="history">
// 				<Card>
// 					<CardHeader>
// 						<CardTitle>History</CardTitle>
// 						<CardDescription>
// 							Make changes to your account here. Click save when you're done.
// 						</CardDescription>
// 					</CardHeader>
// 					<CardContent className="space-y-2">
// 						<div className="space-y-1">
// 							<Label htmlFor="name">Name</Label>
// 							<Input id="name" defaultValue="Pedro Duarte" />
// 						</div>
// 						<div className="space-y-1">
// 							<Label htmlFor="username">Username</Label>
// 							<Input id="username" defaultValue="@peduarte" />
// 						</div>
// 					</CardContent>
// 					<CardFooter>
// 						<Button>Save changes</Button>
// 					</CardFooter>
// 				</Card>
// 			</TabsContent>
// 			<TabsContent value="password">
// 				<Card>
// 					<CardHeader>
// 						<CardTitle>Password</CardTitle>
// 						<CardDescription>
// 							Change your password here. After saving, you'll be logged out.
// 						</CardDescription>
// 					</CardHeader>
// 					<CardContent className="space-y-2">
// 						<div className="space-y-1">
// 							<Label htmlFor="current">Current password</Label>
// 							<Input id="current" type="password" />
// 						</div>
// 						<div className="space-y-1">
// 							<Label htmlFor="new">New password</Label>
// 							<Input id="new" type="password" />
// 						</div>
// 					</CardContent>
// 					<CardFooter>
// 						<Button>Save password</Button>
// 					</CardFooter>
// 				</Card>
// 			</TabsContent>
// 		</Tabs>
// 	);
// }
import { format } from "date-fns";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { ContactBirthdayForm } from "@/components/forms/contacts/contactBirthday";
import { useContactEntries } from "@/lib/hooks";
import type { Doc, Id } from "@/convex/_generated/dataModel";

type ContactInfoProps = {
	contact: Doc<"contacts">;
};

export function EntryList({ entries }: { entries?: Doc<"entries">[] }) {
	if (!entries) return null;
	if (entries.length === 0) return <div>No entries</div>;
	return (
		<div className="flex flex-col gap-2">
			{entries.map((entry) => (
				<div key={entry._id} className="flex flex-col w-full">
					<h1 className="text-xl font-bold">
						{format(new Date(entry.date), "PPP")}
					</h1>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}

					<p className="text-sm">{entry.content}</p>
				</div>
			))}
		</div>
	);
}

export default function ContactInfo({ contact }: ContactInfoProps) {
	const { contactId } = useParams();

	const entriesRequest = useContactEntries(contactId as Id<"contacts">, {
		numItems: 3,
		cursor: null,
	});

	console.log({ entriesRequest });

	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value="item-1">
				<AccordionTrigger>Journal Entries</AccordionTrigger>
				<AccordionContent asChild>
					<EntryList entries={entriesRequest?.data?.page} />
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>Infos</AccordionTrigger>
				<AccordionContent>
					<ContactBirthdayForm />
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-3">
				<AccordionTrigger>Settings</AccordionTrigger>
				<AccordionContent>Contact Settings</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
