import { useState } from "react"
import Dialog from "../Dialog"

export default function AddButtonDialog({ isOpen, onClose, onAddButton }) {
	const [newButton, setNewButton] = useState({ platform: "", icon: "", url: "" })

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onAddButton(newButton)
		setNewButton({ platform: "", icon: "", url: "" })
		onClose()
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} title="Add New Social Button">
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div>
					<label htmlFor="platform" className="block text-sm font-medium text-muted-foreground">
						Platform
					</label>
					<input
						type="text"
						id="platform"
						value={newButton.platform}
						onChange={(e) => setNewButton({ ...newButton, platform: e.target.value })}
						className="input-field"
						placeholder="e.g. Facebook"
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
						value={newButton.url}
						onChange={(e) => setNewButton({ ...newButton, url: e.target.value })}
						className="input-field"
						required
					/>
				</div>
				<div>
					<label htmlFor="icon" className="block text-sm font-medium text-muted-foreground">
						Icon
					</label>
					<input
						type="text"
						id="icon"
						value={newButton.icon}
						onChange={(e) => setNewButton({ ...newButton, icon: e.target.value })}
						className="input-field"
						placeholder="e.g. mdi:facebook"
						required
					/>
				</div>
				<div className="flex justify-between gap-4">
					<button type="button" onClick={onClose} className="btn bg-secondary">
						Cancel
					</button>
					<button type="submit" className="btn bg-primary">
						Add Button
					</button>
				</div>
			</form>
		</Dialog>
	)
}
