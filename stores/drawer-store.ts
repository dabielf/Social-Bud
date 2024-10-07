import { se } from "@/lib/utils";
import type { Doc } from "@/convex/_generated/dataModel";
import { createStore } from "zustand/vanilla";

export type DrawerState = {
	newContactDrawerOpen: boolean;
	newEntryDrawerOpen: boolean;
	deleteDrawerContact: Doc<"contacts"> | undefined;
};

export type DrawerActions = {
	setNewContactDrawer: (open: boolean) => void;
	setNewEntryDrawer: (open: boolean) => void;
	setDeleteContactDrawer: (contact?: Doc<"contacts">) => void;
};

export type DrawerStore = DrawerState & DrawerActions;

export const initDrawerStore = (): DrawerState => {
	return {
		newContactDrawerOpen: false,
		newEntryDrawerOpen: false,
		deleteDrawerContact: undefined,
	};
};

export const defaultInitState: DrawerState = {
	newContactDrawerOpen: false,
	newEntryDrawerOpen: false,
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
		setDeleteContactDrawer: (contact?: Doc<"contacts">) =>
			set((_state) => ({ deleteDrawerContact: contact || undefined })),
	}));
};
