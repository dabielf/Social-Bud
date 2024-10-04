"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
	type DrawerStore,
	createDrawerStore,
	initDrawerStore,
} from "@/stores/drawer-store";

export type DrawerStoreApi = ReturnType<typeof createDrawerStore>;

export const DrawerStoreContext = createContext<DrawerStoreApi | undefined>(
	undefined,
);

export interface DrawerStoreProviderProps {
	children: ReactNode;
}

export const DrawerStoreProvider = ({ children }: DrawerStoreProviderProps) => {
	const storeRef = useRef<DrawerStoreApi>();
	if (!storeRef.current) {
		storeRef.current = createDrawerStore(initDrawerStore());
	}

	return (
		<DrawerStoreContext.Provider value={storeRef.current}>
			{children}
		</DrawerStoreContext.Provider>
	);
};

export const useDrawerStore = <T,>(selector: (store: DrawerStore) => T): T => {
	const drawerStoreContext = useContext(DrawerStoreContext);

	if (!drawerStoreContext) {
		throw new Error("useDrawerStore must be used within DrawerStoreProvider");
	}

	return useStore(drawerStoreContext, selector);
};
