"use client";

import { Button } from "@/components/ui/button";
import {
	Authenticated,
	Unauthenticated,
	useMutation,
	useQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import { Code } from "@/components/typography/code";
import { Link } from "@/components/typography/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { StickyHeader } from "@/components/layout/sticky-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
	return (
		<>
			<StickyHeader className="px-4 py-2">
				<div className="flex justify-between items-center">
					<Link href="/app">SocialBud</Link>
					<SignInAndSignUpButtons />
				</div>
			</StickyHeader>
			<main className="container max-w-2xl flex flex-col gap-8">
				<h1 className="text-4xl font-extrabold my-8 text-center">SocialBud</h1>
				<Authenticated>
					<SignedInContent />
				</Authenticated>
				<Unauthenticated>
					<p className="text-center">
						Click one of the buttons in the top right corner to sign in.
					</p>
				</Unauthenticated>
			</main>
		</>
	);
}

function SignInAndSignUpButtons() {
	return (
		<div className="flex gap-4">
			<Authenticated>
				<UserButton afterSignOutUrl="#" />
			</Authenticated>
			<Unauthenticated>
				<SignInButton mode="modal" afterSignInUrl="/home">
					<Button variant="ghost">Sign in</Button>
				</SignInButton>
				<SignUpButton mode="modal" afterSignUpUrl="/home">
					<Button>Sign up</Button>
				</SignUpButton>
			</Unauthenticated>
		</div>
	);
}

function SignedInContent() {
	const user = useQuery(api.users.currentUser, {});

	console.log({ user });
	if (!user) {
		return (
			<>
				<Skeleton className="h-5 w-full" />
				<Skeleton className="h-5 w-full" />
				<Skeleton className="h-5 w-full" />
			</>
		);
	}

	const { name, email } = user;

	return (
		<>
			<p>
				Welcome {name ?? "N/A"} - {email ?? "N/A"}!
			</p>
			<p>
				Click the button below and open this page in another window - this data
				is persisted in the Convex cloud database!
			</p>

			<p>
				Edit <Code>convex/myFunctions.ts</Code> to change your backend
			</p>
			<p>
				Edit <Code>app/page.tsx</Code> to change your frontend
			</p>
			<p>
				Check out{" "}
				<Link target="_blank" href="https://docs.convex.dev/home">
					Convex docs
				</Link>
			</p>
			<p>
				To build a full page layout copy one of the included{" "}
				<Link target="_blank" href="/layouts">
					layouts
				</Link>
			</p>
		</>
	);
}
