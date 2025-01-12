import { useEffect, useState } from "react"
import Dialog from "../Dialog"

export default function UpdateLinkDialog({ isOpen, onClose, currentLink, onUpdateLink }) {
	const [updatedLink, setUpdatedLink] = useState<Link | null>(null)

	// Set the form fields to the selected link values when dialog is opened
	useEffect(() => {
		if (currentLink) {
			setUpdatedLink(currentLink)
		}
	}, [currentLink])

	// Handle form submission by calling the onUpdateLink function and closing the dialog
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (updatedLink) {
			onUpdateLink(updatedLink)
			onClose()
		}
	}

	if (!updatedLink) return null

	return (
		<Dialog isOpen={isOpen} onClose={onClose} title="Update Link">
			<form onSubmit={handleSubmit} className="my-4 flex flex-col gap-4">
				<div className="input-group">
					<label htmlFor="title" className="text-sm font-semibold text-muted-foreground">
						Title
					</label>
					<input
						id="title"
						type="text"
						value={updatedLink.title}
						onChange={(e) => setUpdatedLink({ ...updatedLink, title: e.target.value })}
						className="border border-border"
						required
					/>
				</div>
				<div className="input-group">
					<label htmlFor="url" className="text-sm font-semibold text-muted-foreground">
						URL
					</label>
					<input
						id="url"
						type="url"
						value={updatedLink.url}
						onChange={(e) => setUpdatedLink({ ...updatedLink, url: e.target.value })}
						required
					/>
				</div>

				<div className="input-group">
					<button type="submit" className="btn bg-primary">
						Update Link
					</button>
					<button type="button" onClick={onClose} className="btn bg-secondary">
						Cancel
					</button>
				</div>
			</form>
		</Dialog>
	)
}
