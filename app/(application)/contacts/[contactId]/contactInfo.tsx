"use client";

import { useParams } from "next/navigation";
import { format } from "date-fns";

import { ContactBirthdayForm } from "@/components/forms/contacts/contactBirthday";
import { useContactEntries, useContactNotes } from "@/lib/hooks";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ContactNoteDropdownMenu } from "@/components/menus/contactMenu";

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
					<p className="text-sm">{entry.content}</p>
				</div>
			))}
		</div>
	);
}

type NotesListProps = {
	contact: Doc<"contacts">;
	notes?: Doc<"notes">[];
};

export function NotesList({ contact, notes }: NotesListProps) {
	if (!notes) return null;
	if (notes.length === 0) return <div>No entries</div>;
	return (
		<div className="flex flex-col gap-2">
			{notes.map((note) => (
				<div key={note._id} className="flex flex-row w-full gap-2">
					<div key={note._id} className="flex flex-col w-full">
						<h1 className="text-xl font-bold">{note.title}</h1>
						<p className="text-sm">{note.content}</p>
					</div>
					<ContactNoteDropdownMenu contact={contact} note={note} />
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

	const notesRequest = useContactNotes(contactId as Id<"contacts">);

	console.log({ entriesRequest });

	function journalEntriesTitle() {
		let text = "";
		switch (contact.totalEntries) {
			case undefined:
				text = "Journal Entries (No entries yet)";
				break;
			case 0:
				text = "Journal Entries (No entries yet)";
				break;
			default:
				text = `Journal Entries - ${contact.totalEntries} `;
				break;
		}
		return text;
	}

	function notesTitle() {
		let text = "";
		switch (contact.totalNotes) {
			case undefined:
				text = "Notes (No notes yet)";
				break;
			case 0:
				text = "Notes (No notes yet)";
				break;
			default:
				text = `Notes - ${contact.totalNotes} `;
				break;
		}
		return text;
	}

	return (
		<div className="flex flex-col gap-4">
			<AnimatedSection title={journalEntriesTitle()}>
				<EntryList entries={entriesRequest?.data?.page} />
			</AnimatedSection>
			<AnimatedSection title={notesTitle()}>
				<NotesList contact={contact} notes={notesRequest?.data} />
			</AnimatedSection>
			<AnimatedSection title="Infos">Infos Section</AnimatedSection>

			<AnimatedSection title="Settings">Settings Section</AnimatedSection>
		</div>
	);
}
