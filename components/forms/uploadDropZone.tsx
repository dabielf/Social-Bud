import { useMutation } from "convex/react";
import {
	UploadDropzone,
	type UploadFileResponse,
} from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

export function ContactImageDropzone({
	contactId,
}: { contactId: Id<"contacts"> }) {
	const generateUploadUrl = useMutation(api.files.generateUploadUrl);
	const saveStorageId = useMutation(api.files.saveStorageId);
	const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
		await saveStorageId({
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			storageId: (uploaded[0].response as any).storageId,
			contactId,
		});
	};

	return (
		<UploadDropzone
			uploadUrl={generateUploadUrl}
			fileTypes={{
				"application/pdf": [".pdf"],
				"image/*": [".png", ".gif", ".jpeg", ".jpg"],
			}}
			onUploadComplete={saveAfterUpload}
			onUploadError={(error: unknown) => {
				// Do something with the error.
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				alert(`ERROR! ${error}`);
			}}
		/>
	);
}
