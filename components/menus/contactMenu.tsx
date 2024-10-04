"use client";

import { Ellipsis } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteContactDialogTrigger } from "../dialogs/deleteContactDialog";
import type { Doc } from "@/convex/_generated/dataModel";

export function ContactDropdownMenu({ contact }: { contact: Doc<"contacts"> }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					<Ellipsis />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuPortal>
				<DropdownMenuContent>
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<DeleteContactDialogTrigger contact={contact} />
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenuPortal>
		</DropdownMenu>
	);
}
