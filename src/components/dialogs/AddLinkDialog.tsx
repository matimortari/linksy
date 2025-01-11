import { useState } from "react"
import Dialog from "../Dialog"

export default function AddLinkDialog({ isOpen, onClose, onAddLink }) {
	const [newLink, setNewLink] = useState({ title: "", url: "" })

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onAddLink(newLink)
		setNewLink({ title: "", url: "" })
		onClose()
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
						value={newLink.title}
						onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
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
						value={newLink.url}
						onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
						className="input-field"
						required
					/>
				</div>
				<div className="flex justify-between gap-4">
					<button type="button" onClick={onClose} className="btn bg-secondary">
						Cancel
					</button>
					<button type="submit" className="btn bg-primary">
						Add Link
					</button>
				</div>
			</form>
		</Dialog>
	)
}
