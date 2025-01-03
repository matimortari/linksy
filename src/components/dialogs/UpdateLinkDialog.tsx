import useDialog from "@/src/hooks/useDialog"
import { useUpdateLink } from "@/src/hooks/useMutations" // Importing the update hook
import { useState } from "react"

export default function UpdateLinkDialog({ onClose, linkData, updateLink }) {
	const { dialogRef, setError, error } = useDialog(onClose)
	const [title, setTitle] = useState(linkData.title || "")
	const [url, setUrl] = useState(linkData.url || "")

	const { mutate: updateLinkMutation, isPending } = useUpdateLink({ onClose })

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!title || !url) {
			setError("Both fields are required")
			return
		}

		updateLinkMutation({ ...linkData, title, url })
		updateLink({ ...linkData, title, url })
		onClose()
	}

	return (
		<div className="expand-dialog fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div ref={dialogRef} className="card w-full max-w-xl shadow-lg">
				<h2 className="mb-2">Update Link</h2>

				<form onSubmit={handleSubmit} className="w-full">
					<div className="mb-4 flex flex-col gap-4">
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Link title"
							className="form-container"
						/>
						<input
							type="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							placeholder="Link URL"
							className="form-container"
						/>
					</div>

					{error && (
						<div className="text-danger mb-4 text-sm">
							<p>{error}</p>
						</div>
					)}

					<div className="flex flex-row gap-2">
						<button type="submit" className="btn bg-primary" disabled={isPending}>
							{isPending ? "Updating..." : "Update Link"}
						</button>
						<button onClick={onClose} className="btn">
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
