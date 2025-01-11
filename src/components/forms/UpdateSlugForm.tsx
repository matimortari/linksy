import { Icon } from "@iconify/react"
import { useState } from "react"

export default function UpdateSlugForm({ setSlug }) {
	const [localSlug, setLocalSlug] = useState("")
	const [isPending, setIsPending] = useState(false)

	// Handle change for using global state
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalSlug(e.target.value)
		setSlug(e.target.value)
	}

	// Handle form submit for updating slug
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	// TODO - Handle random slug generation
	const handleGenerateSlug = () => {
		const generatedSlug = `${Math.random().toString(36).substring(7)}`
		setLocalSlug(generatedSlug)
		setSlug(generatedSlug)
		// updateSlugMutation(generatedSlug)
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="form-container max-w-xl">
				<input
					type="text"
					value={localSlug}
					onChange={handleChange}
					placeholder={localSlug}
					className="mb-2 flex-1 truncate rounded-2xl border border-border bg-transparent p-2 text-sm text-muted-foreground"
					required
				/>
				<div className="flex flex-row gap-1">
					<button type="submit" className="btn bg-primary" disabled={isPending}>
						<Icon icon="material-symbols:update" className="icon text-xl" />
						{isPending ? "Updating..." : "Update"}
					</button>
					<button type="button" className="btn bg-secondary" onClick={handleGenerateSlug}>
						<Icon icon="icon-park-outline:magic-wand" className="icon text-xl" />
						{isPending ? "Updating..." : "Random"}
					</button>
				</div>
			</form>
		</>
	)
}
