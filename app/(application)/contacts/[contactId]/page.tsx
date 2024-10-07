/* eslint-disable @next/next/no-img-element */
"use client";

import { ContactProvider } from "@/components/forms/contacts/contactContext";
import { ContactNameForm } from "@/components/forms/contacts/contactName";
import type { Id } from "@/convex/_generated/dataModel";
import { useGetContact, useUpdateUserContact } from "@/lib/hooks";
import { ChevronLeft, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";
import ContactInfo from "./contactInfo";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { NewEntryDialog } from "@/components/dialogs/newEntryDialog";

export default function Profile() {
	const { contactId } = useParams();
	const contactData = useGetContact(contactId as Id<"contacts">);
	const updateUserContact = useUpdateUserContact();

	if (contactData.isPending) {
		return null;
	}

	const contact = contactData.data;
	if (!contact) {
		return <div>an error occured</div>;
	}

	return (
		<ContactProvider contact={contact}>
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: 20 }}
				exit={{ opacity: 0 }}
			>
				<div className="flex flex-col gap-4 w-full">
					<div className="h-[300px] relative mt-4 rounded-lg">
						<div className="absolute rounded-lg inset-x-0 top-0 h-[100px] bg-gradient-to-t from-transparent to-black/50" />
						<Link
							href="/contacts"
							className="absolute left-2 top-4 font-medium flex flex-row text-white items-center"
						>
							<ChevronLeft />
							Back to contacts
						</Link>
						<Image
							className="object-cover w-full h-full rounded-lg border-none"
							priority
							src={contact.imgUrl || ""}
							alt={contact.name}
							width={360}
							height={360}
						/>
						{/* <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-background via-background/15 to-transparent" /> */}
						<div className="absolute rounded-lg inset-x-0 bottom-0 h-[80px] bg-gradient-to-b from-transparent to-black/50" />
						<UploadButton
							className="absolute right-2 top-2 w-fit ut-allowed-content:hidden ut-button:w-fit ut-button:p-2 ut-button:bg-transparent"
							endpoint="imageUploader"
							content={{ button: <Upload className="w-5 h-5" /> }}
							onClientUploadComplete={async (res) => {
								// Do something with the response
								console.log("Files: ", res);
								alert("Upload Completed");
								await updateUserContact({
									contactId: contact._id,
									imgUrl: res[0].url,
								});
							}}
							onUploadError={(error: Error) => {
								// Do something with the error.
								alert(`ERROR! ${error.message}`);
							}}
						/>

						<h1 className="absolute px-4 bottom-2 font-bold font-title text-2xl w-full">
							{/* {contact.name} */}
							<ContactNameForm />
						</h1>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<NewEntryDialog contact={contact} />

						<Button>Add Note</Button>
					</div>
					<ContactInfo contact={contact} />
				</div>
			</motion.div>
		</ContactProvider>
	);
}
