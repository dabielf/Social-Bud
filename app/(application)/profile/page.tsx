"use client";

import { useCurrentUser } from "@/lib/hooks";

export default function Profile() {
	const userData = useCurrentUser();

	if (userData.isPending) {
		return <div>Loading...</div>;
	}

	const user = userData.data;
	if (!user) {
		return <div>User not found</div>;
	}

	return (
		<div className="flex flex-col items-center justify-center w-full">
			<div className="text-center">
				<h1 className="text-4xl font-bold">
					Profile: {user.name} - {user.email}
				</h1>
			</div>
		</div>
	);
}
