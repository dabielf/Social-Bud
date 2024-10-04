import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { DrawerStoreProvider } from "@/providers/drawer-store-provider";
import { DeleteContactDialog } from "@/components/dialogs/deleteContactDialog";
import { NewContactDialog } from "@/components/dialogs/newContactDialog";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "SocialBud",
	description: "Grow your Relationships",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={outfit.className}>
				<ConvexClientProvider>
					<DrawerStoreProvider>
						<>
							{children}
							<DeleteContactDialog />
							<NewContactDialog />
						</>
					</DrawerStoreProvider>
				</ConvexClientProvider>
			</body>
		</html>
	);
}
