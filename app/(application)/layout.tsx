"use client";

import { StickyHeader } from "@/components/layout/sticky-header";
import { Authenticated, Unauthenticated } from "convex/react";
import { Link } from "@/components/typography/link";
import { useRouter } from "next/navigation";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { Toaster } from "@/components/ui/sonner";
import { Menu } from "lucide-react";

import { SignOutButton } from "@clerk/clerk-react";

import { Button } from "@/components/ui/button";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const { isLoaded, user } = useUser();

	if (isLoaded && !user) {
		router.push("/");
	}

	if (!isLoaded) {
		return null;
	}

	return (
		<>
			<div className="flex flex-col h-screen">
				<StickyHeader className="px-4 py-2">
					<div className="flex justify-between items-center max-w-sm mx-auto">
						<Link href="/home" className="font-bold no-underline text-xl">
							SocialBud
						</Link>
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="outline" className="border-none shadow-none">
									<Menu size={16} className="mr-2" />
									Menu
								</Button>
							</SheetTrigger>
							<SheetContent
								className="flex flex-col justify-between max-w-xs"
								side={"left"}
							>
								{/* <SheetHeader>
									<SheetTitle className="hidden">Navigation Menu</SheetTitle>
								</SheetHeader> */}
								<div className="flex flex-col gap-4 py-4">
									<SheetLink href="/home">Home</SheetLink>
									<SheetLink href="/contacts">Contacts</SheetLink>
									<SheetLink href="/profile">Profile</SheetLink>
									<SheetLink href="/settings">Settings</SheetLink>
								</div>
								<SheetFooter>
									<SheetClose asChild>
										<Button variant="outline" asChild>
											<SignOutButton>Sign out</SignOutButton>
										</Button>
									</SheetClose>
								</SheetFooter>
							</SheetContent>
						</Sheet>
					</div>
				</StickyHeader>
				<main className="max-w-sm min-w-[384px] mx-auto px-2">{children}</main>

				{/* <div className="inset-0 flex flex-row w-full h-[calc(100vh-50px)]">
					<aside className="inset-y-0 left-0 w-48  pt-4 pl-4 shadow-md block">
						<div className="flex flex-col gap-4">
							<Link href="/home">Home</Link>
							<Link href="/home/profile">Profile</Link>
							<Link href="/home/settings">Settings</Link>
							<Link href="/home/contacts">Contacts</Link>
						</div>
					</aside>
					<div className="h-[calc(100vh-50px)] overflow-scroll w-full">
						{children}
					</div>
				</div> */}
			</div>
			<Toaster />
		</>
	);
}

function SheetLink({
	href,
	children,
}: { href: string; children: React.ReactNode }) {
	return (
		<SheetClose asChild>
			<Link
				className="no-underline hover:tracking-wider transition-all"
				href={href}
			>
				{children}
			</Link>
		</SheetClose>
	);
}

function SignInAndSignUpButtons() {
	return (
		<div className="flex gap-4">
			<Authenticated>
				<UserButton afterSignOutUrl="/" />
			</Authenticated>
			<Unauthenticated>
				<SignInButton mode="modal">
					<Button variant="ghost">Sign in</Button>
				</SignInButton>
				<SignUpButton mode="modal">
					<Button>Sign up</Button>
				</SignUpButton>
			</Unauthenticated>
		</div>
	);
}
