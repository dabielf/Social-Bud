import { useQuery } from "convex-helpers/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

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
