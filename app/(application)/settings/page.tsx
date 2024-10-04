import { NewContactForm } from "@/components/forms/newContact";

export default function Settings() {
	return (
		<div className="flex flex-col items-center justify-center w-full">
			<div className="text-center">
				<h1 className="text-4xl font-bold">Settings</h1>
				<NewContactForm />
			</div>
		</div>
	);
}
