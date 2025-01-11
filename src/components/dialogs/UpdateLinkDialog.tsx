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
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div>
					<label htmlFor="title" className="block text-sm font-medium text-muted-foreground">
						Title
					</label>
					<input
						type="text"
						id="title"
						value={updatedLink.title}
						onChange={(e) => setUpdatedLink({ ...updatedLink, title: e.target.value })}
						className="input-field"
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
						value={updatedLink.url}
						onChange={(e) => setUpdatedLink({ ...updatedLink, url: e.target.value })}
						className="input-field"
						required
					/>
				</div>
				<div className="flex justify-between gap-4">
					<button type="button" onClick={onClose} className="btn bg-secondary">
						Cancel
					</button>
					<button type="submit" className="btn bg-primary">
						Update Link
					</button>
				</div>
			</form>
		</Dialog>
	)
}
