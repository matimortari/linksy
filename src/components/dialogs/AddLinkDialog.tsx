import { useAddLink } from "@/src/hooks/useMutations"
import { useEffect, useState } from "react"
import Dialog from "../Dialog"

export default function AddLinkDialog({ isOpen, onClose, onAddLink }) {
	const { mutate: addLink, isPending } = useAddLink()

	const [title, setTitle] = useState("")
	const [url, setUrl] = useState("")

	// Reset form fields when dialog is opened
	useEffect(() => {
		setTitle("")
		setUrl("")
	}, [isOpen])

	// Handle form submission by calling the addLink mutation and closing the dialog
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		addLink(
			{ title, url },
			{
				onSuccess: (newLink) => {
					onAddLink(newLink)
					onClose()
				}
			}
		)
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} title="Add New Link">
			<form onSubmit={handleSubmit} className="my-4 flex flex-col gap-4">
				<div className="input-group flex flex-row items-center gap-2 rounded-2xl border border-border p-1 pl-2">
					<label htmlFor="title" className="text-sm font-semibold text-muted-foreground">
						Title:
					</label>
					<input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
				</div>

				<div className="input-group flex flex-row items-center gap-2 rounded-2xl border border-border p-1 pl-2">
					<label htmlFor="url" className="text-sm font-semibold text-muted-foreground">
						URL:
					</label>
					<input
						id="url"
						type="url"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						placeholder="Link URL"
						required
					/>
				</div>

				<div className="input-group">
					<button type="submit" className="btn bg-primary" disabled={isPending}>
						{isPending ? "Adding..." : "Add Link"}
					</button>
					<button type="button" onClick={onClose} className="btn bg-secondary">
						Cancel
					</button>
				</div>
			</form>
		</Dialog>
	)
}
