import useDialog from "@/src/hooks/useDialog"
import { useAddLink } from "@/src/hooks/useMutations"
import { useState } from "react"

export default function AddLinkDialog({ onClose, addLink }) {
	const { dialogRef, setError, error } = useDialog(onClose)
	const [title, setTitle] = useState("")
	const [url, setUrl] = useState("")

	const { mutate: addLinkMutation, isPending } = useAddLink({ onClose })

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!title || !url) {
			setError("Both fields are required")
			return
		}

		addLinkMutation({ title, url, clicks: 0 })
		addLink({ title, url })
		onClose()
	}

	return (
		<div className="expand-dialog fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div ref={dialogRef} className="card w-full max-w-xl shadow-lg">
				<h2 className="mb-2">Add Link</h2>

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
							{isPending ? "Adding..." : "Add Link"}
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
