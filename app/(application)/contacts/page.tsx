"use client";

import Link from "next/link";
import { useUserContacts } from "@/lib/hooks";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NewContactDialogTrigger } from "@/components/dialogs/newContactDialog";
import { ContactDropdownMenu } from "@/components/menus/contactMenu";

export default function Profile() {
	const userData = useUserContacts();

	if (userData.isPending) {
		return null;
	}

	const contacts = userData.data;
	if (!contacts) {
		return <div>an error occured</div>;
	}

	if (contacts.length === 0) {
		return (
			<div className="flex flex-col gap-4 mt-2 px-4 w-full">
				<div className="flex flex-row items-center w-full justify-between">
					<h1 className="text-4xl font-bold">Contacts</h1>
					<NewContactDialogTrigger />
				</div>
				<div>No contacts found</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4 mt-2 px-4 w-full">
			<div className="flex flex-row items-center w-full justify-between">
				<h1 className="text-4xl font-bold">Contacts</h1>
				<NewContactDialogTrigger />
			</div>
			<div className="flex flex-col gap-2">
				{contacts.map((contact) => (
					<div key={contact._id} className="flex flex-col w-full">
						<div className="flex flex-row items-center w-full gap-4">
							<Link
								href={`/contacts/${contact._id}`}
								className="flex flex-row items-center gap-2 grow"
							>
								<Avatar>
									<AvatarImage
										src={contact.imgUrl}
										className="object-cover"
										alt={contact.name}
									/>
									<AvatarFallback className="font-black">
										{contact.name[0]}
									</AvatarFallback>
								</Avatar>
								<h2 className="text-xl font-semibold">{contact.name}</h2>
							</Link>
							<ContactDropdownMenu contact={contact} />
						</div>
						<p className="text-sm">{contact.type}</p>
					</div>
				))}
			</div>
		</div>
	);
}
