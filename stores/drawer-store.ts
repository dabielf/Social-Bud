import { DeleteContactDialog } from "@/components/dialogs/deleteContactDialog";
import type { Doc } from "@/convex/_generated/dataModel";
import { createStore } from "zustand/vanilla";

export type DrawerState = {
	newContactDrawerOpen: boolean;
	deleteDrawerContact: Doc<"contacts"> | undefined;
};

export type DrawerActions = {
	setNewContactDrawer: (open: boolean) => void;
	setDeleteContactDrawer: (contact?: Doc<"contacts">) => void;
};

export type DrawerStore = DrawerState & DrawerActions;

export const initDrawerStore = (): DrawerState => {
	return {
		newContactDrawerOpen: false,
		deleteDrawerContact: undefined,
	};
};

export const defaultInitState: DrawerState = {
	newContactDrawerOpen: false,
	deleteDrawerContact: undefined,
};

export const createDrawerStore = (
	initState: DrawerState = defaultInitState,
) => {
	return createStore<DrawerStore>()((set) => ({
		...initState,
		setNewContactDrawer: (open: boolean) =>
			set((_state) => ({ newContactDrawerOpen: open })),
		setDeleteContactDrawer: (contact?: Doc<"contacts">) =>
			set((_state) => ({ deleteDrawerContact: contact || undefined })),
	}));
};
