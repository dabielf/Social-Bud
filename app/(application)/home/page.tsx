"use client";

import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Code } from "@/components/typography/code";
import { Link } from "@/components/typography/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
	return (
		<>
			<main className="container max-w-2xl flex flex-col gap-8">
				<Authenticated>
					<SignedInContent />
				</Authenticated>
				<Unauthenticated>
					<p>Click one of the buttons in the top right corner to sign in.</p>
				</Unauthenticated>
			</main>
		</>
	);
}

function SignedInContent() {
	const user = useQuery(api.users.currentUser, {});
	const contacts = useQuery(api.contacts.getUserContacts, {});

	console.log({ user });

	if (!user || !contacts) {
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
