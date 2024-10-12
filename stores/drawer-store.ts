import { se } from "@/lib/utils";
import type { Doc } from "@/convex/_generated/dataModel";
import { createStore } from "zustand/vanilla";

export type DrawerState = {
	newContactDrawerOpen: boolean;
	newEntryDrawerOpen: boolean;
	newNoteDrawerOpen: boolean;
	editNoteDrawerOpen: boolean;
	deleteNoteDrawerOpen: boolean;
	editEntryDrawerOpen: boolean;
	deleteEntryDrawerOpen: boolean;
	editNoteDrawerNote: Doc<"notes"> | undefined;
	editEntryDrawerEntry: Doc<"entries"> | undefined;
	deleteNoteDrawerNote: Doc<"notes"> | undefined;
	deleteEntryDrawerEntry: Doc<"entries"> | undefined;
	deleteDrawerContact: Doc<"contacts"> | undefined;
};

export type DrawerActions = {
	setNewContactDrawer: (open: boolean) => void;
	setNewEntryDrawer: (open: boolean) => void;
	setNewNoteDrawer: (open: boolean) => void;
	setEditNoteDrawer: (note?: Doc<"notes">) => void;
	setEditEntryDrawer: (entry?: Doc<"entries">) => void;
	setDeleteNoteDrawer: (note?: Doc<"notes">) => void;
	setDeleteEntryDrawer: (entry?: Doc<"entries">) => void;
	setDeleteContactDrawer: (contact?: Doc<"contacts">) => void;
};

export type DrawerStore = DrawerState & DrawerActions;

export const initDrawerStore = (): DrawerState => {
	return {
		newContactDrawerOpen: false,
		newEntryDrawerOpen: false,
		newNoteDrawerOpen: false,
		editNoteDrawerOpen: false,
		editEntryDrawerOpen: false,
		deleteNoteDrawerOpen: false,
		deleteEntryDrawerOpen: false,
		editNoteDrawerNote: undefined,
		editEntryDrawerEntry: undefined,
		deleteNoteDrawerNote: undefined,
		deleteEntryDrawerEntry: undefined,
		deleteDrawerContact: undefined,
	};
};

export const defaultInitState: DrawerState = {
	newContactDrawerOpen: false,
	newEntryDrawerOpen: false,
	newNoteDrawerOpen: false,
	editNoteDrawerOpen: false,
	editEntryDrawerOpen: false,
	deleteNoteDrawerOpen: false,
	deleteEntryDrawerOpen: false,
	editNoteDrawerNote: undefined,
	editEntryDrawerEntry: undefined,
	deleteNoteDrawerNote: undefined,
	deleteEntryDrawerEntry: undefined,
	deleteDrawerContact: undefined,
};

export const createDrawerStore = (
	initState: DrawerState = defaultInitState,
) => {
	return createStore<DrawerStore>()((set) => ({
		...initState,
		setNewContactDrawer: (open: boolean) =>
			set((_state) => ({ newContactDrawerOpen: open })),
		setNewEntryDrawer: (open: boolean) =>
			set((_state) => ({ newEntryDrawerOpen: open })),
		setNewNoteDrawer: (open: boolean) =>
			set((_state) => ({ newNoteDrawerOpen: open })),
		setEditNoteDrawer: (note?: Doc<"notes">) =>
			set((_state) => ({ editNoteDrawerOpen: true, editNoteDrawerNote: note })),
		setEditEntryDrawer: (entry?: Doc<"entries">) =>
			set((_state) => ({
				editEntryDrawerOpen: true,
				editEntryDrawerEntry: entry,
			})),
		setDeleteNoteDrawer: (note?: Doc<"notes">) =>
			set((_state) => ({
				deleteNoteDrawerOpen: true,
				deleteNoteDrawerNote: note,
			})),
		setDeleteEntryDrawer: (entry?: Doc<"entries">) =>
			set((_state) => ({
				deleteEntryDrawerOpen: true,
				deleteEntryDrawerEntry: entry,
			})),
		setDeleteContactDrawer: (contact?: Doc<"contacts">) =>
			set((_state) => ({ deleteDrawerContact: contact || undefined })),
	}));
};
