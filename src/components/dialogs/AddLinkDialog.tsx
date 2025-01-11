import { useAddLink } from "@/src/hooks/useMutations"
import { useState } from "react"
import Dialog from "../Dialog"

export default function AddLinkDialog({ isOpen, onClose, onAddLink }) {
	const [title, setTitle] = useState("")
	const [url, setUrl] = useState("")

	const { mutate: addLink, isPending } = useAddLink()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		addLink(
			{ title, url },
			{
				onSuccess: () => {
					onAddLink()
					onClose()
				}
			}
		)
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} title="Add New Link">
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div>
					<label htmlFor="title" className="block text-sm font-medium text-muted-foreground">
						Title
					</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="input-field"
						placeholder="e.g. My Portfolio"
						required
					/>
				</div>
				<div>
					<label htmlFor="url" className="block text-sm font-medium text-muted-foreground">
						URL
					</label>
					<input
						type="url"
						id="url"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						className="input-field"
						placeholder="Link URL"
						required
					/>
				</div>
				<div className="flex justify-between gap-4">
					<button type="button" onClick={onClose} className="btn bg-secondary">
						Cancel
					</button>
					<button type="submit" className="btn bg-primary" disabled={isPending}>
						{isPending ? "Adding..." : "Add Link"}
					</button>
				</div>
			</form>
		</Dialog>
	)
}
