import { useQuery } from "convex-helpers/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

type paginationOptsValidator = {
	id?: number | undefined;
	endCursor?: string | null | undefined;
	maximumRowsRead?: number | undefined;
	maximumBytesRead?: number | undefined;
	numItems: number;
	cursor: string | null;
};

export function useCurrentUser() {
	return useQuery(api.users.currentUser, {});
}

export function useGetContact(contactId: Id<"contacts">) {
	return useQuery(api.contacts.getUserContact, { contactId });
}

export function useUserContacts() {
	return useQuery(api.contacts.getUserContacts, {});
}

export function useCreateUserContact() {
	return useMutation(api.contacts.createUserContact);
}

export function useUpdateUserContact() {
	return useMutation(api.contacts.updateUserContact);
}

export function useDeleteUserContact() {
	return useMutation(api.contacts.deleteUserContact);
}

export function useGetEntry(entryId: Id<"entries">) {
	return useQuery(api.entries.getEntry, { entryId });
}

export function useContactEntries(
	contactId: Id<"contacts">,
	paginationOpts: paginationOptsValidator,
) {
	return useQuery(api.entries.getContactEntries, { contactId, paginationOpts });
}

export function useCreateContactEntry() {
	return useMutation(api.entries.createContactEntry);
}

export function useUpdateContactEntry() {
	return useMutation(api.entries.editContactEntry);
}

export function useDeleteContactEntry() {
	return useMutation(api.entries.deleteContactEntry);
}

export function useCreateContactNote() {
	return useMutation(api.notes.createNote);
}

export function useUpdateContactNote() {
	return useMutation(api.notes.updateNote);
}

export function useDeleteContactNote() {
	return useMutation(api.notes.deleteNote);
}

export function useContactNotes(contactId: Id<"contacts">) {
	return useQuery(api.notes.getContactNotes, { contactId });
}
