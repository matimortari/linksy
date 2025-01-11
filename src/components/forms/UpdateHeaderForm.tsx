import { Icon } from "@iconify/react"
import { useState } from "react"

export default function UpdateHeaderForm({ setDescription, setSlug, slug, description }) {
	const [localDescription, setLocalDescription] = useState("")
	const [localSlug, setLocalSlug] = useState("")
	const [currentDescription, setCurrentDescription] = useState("")
	const [isPending, setIsPending] = useState(false)

	// Handle change for updating the description
	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalDescription(e.target.value)
		setDescription(e.target.value)
	}

	// Handle change for updating the slug
	const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalSlug(e.target.value)
		setSlug(e.target.value)
	}

	// Handle form submission
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// TODO - Implement submit logic
	}

	// Reset description and slug to defaults
	const handleReset = () => {
		setLocalDescription("")
		setDescription("")
		setLocalSlug("")
		setSlug("")
		// TODO - Add mutation logic for resetting to default
	}

	// Generate a random slug
	const handleGenerateSlug = () => {
		const generatedSlug = `${Math.random().toString(36).substring(7)}`
		setLocalSlug(generatedSlug)
		setSlug(generatedSlug)
		// TODO - Add mutation logic for updating slug
	}

	return (
		<form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-2">
			<div className="flex flex-row items-center gap-2 rounded-2xl border border-border p-1 pl-2">
				<label htmlFor="slug" className="text-right text-sm font-semibold text-muted-foreground">
					Slug
				</label>
				<input
					type="text"
					value={localSlug}
					onChange={handleSlugChange}
					placeholder={slug || "Enter slug"}
					className="flex-1 bg-transparent p-2 text-sm text-muted-foreground"
				/>
				<div className="flex flex-row gap-2">
					<button type="submit" className="btn bg-primary" disabled={isPending}>
						<Icon icon="material-symbols:update" className="icon text-xl" />
						{isPending ? "Updating..." : "Update"}
					</button>
					<button type="button" className="btn bg-secondary" onClick={handleGenerateSlug} disabled={isPending}>
						<Icon icon="icon-park-outline:magic-wand" className="icon text-xl" />
						{isPending ? "Updating..." : "Random"}
					</button>
				</div>
			</div>

			<div className="flex flex-row items-center gap-2 rounded-2xl border border-border p-1 pl-2">
				<label htmlFor="description" className="text-right text-sm font-semibold text-muted-foreground">
					Description
				</label>
				<input
					type="text"
					value={localDescription}
					onChange={handleDescriptionChange}
					placeholder={description || "Enter header description"}
					className="flex-1 bg-transparent p-2 text-sm text-muted-foreground"
				/>
				<div className="flex flex-row gap-2">
					<button type="submit" className="btn bg-primary" disabled={isPending}>
						<Icon icon="material-symbols:update" className="icon text-xl" />
						{isPending ? "Updating..." : "Update"}
					</button>
					<button type="button" className="btn bg-danger" onClick={handleReset} disabled={isPending}>
						<Icon icon="material-symbols:delete-history" className="icon text-xl" />
						{isPending ? "Updating..." : "Clear"}
					</button>
				</div>
			</div>
		</form>
	)
}
