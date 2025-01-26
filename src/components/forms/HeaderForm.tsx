import { useUpdateDescription, useUpdateSlug } from "@/src/hooks/useMutations"
import { useUserStore } from "@/src/lib/store"
import { Icon } from "@iconify/react"
import { useState } from "react"

function UpdateSlugForm() {
	const { slug, setSlug } = useUserStore()
	const { mutate: updateSlugMutation, isPending: pendingSlug } = useUpdateSlug()

	const [localSlug, setLocalSlug] = useState(slug || "") // Initialize local state with Zustand store value

	const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSlug = e.target.value
		setLocalSlug(newSlug) // Update local state
		setSlug(newSlug) // Update global state from Zustand store
	}

	const handleGenerateSlug = () => {
		const generatedSlug = `${Math.random().toString(36).substring(7)}`
		setLocalSlug(generatedSlug)
		setSlug(generatedSlug) // Set generated slug to Zustand store
		updateSlugMutation(generatedSlug)
	}

	const handleSlugSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		updateSlugMutation(localSlug)
	}

	return (
		<form className="flex w-full max-w-lg flex-col gap-2 overflow-x-hidden" onSubmit={handleSlugSubmit}>
			<div className="flex w-full flex-wrap items-center gap-2 rounded-2xl border bg-card p-1 pl-2">
				<label htmlFor="slug" className="text-sm font-semibold text-muted-foreground">
					Slug:
				</label>
				<input
					id="slug"
					type="text"
					value={localSlug}
					onChange={handleSlugChange}
					placeholder={slug}
					className="w-full flex-grow"
				/>

				<div className="input-group">
					<button type="submit" className="btn w-full bg-primary sm:w-auto" disabled={pendingSlug}>
						<Icon icon="material-symbols:update" className="icon text-xl" />
						<span className="hidden md:block">{pendingSlug ? "Updating..." : "Update"}</span>
					</button>
					<button
						type="button"
						className="btn w-full bg-secondary sm:w-auto"
						onClick={handleGenerateSlug}
						disabled={pendingSlug}
					>
						<Icon icon="icon-park-outline:magic-wand" className="icon text-xl" />
						<span className="hidden md:block">{pendingSlug ? "Generating..." : "Random"}</span>
					</button>
				</div>
			</div>
		</form>
	)
}

function UpdateDescriptionForm() {
	const { description, setDescription } = useUserStore()
	const { mutate: updateDescriptionMutation, isPending: pendingDescription } = useUpdateDescription()

	const [localDescription, setLocalDescription] = useState(description || "") // Initialize local state with Zustand store value

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newDescription = e.target.value
		setLocalDescription(newDescription) // Update local state
		setDescription(newDescription) // Update global state from Zustand store
	}

	const handleDescriptionReset = () => {
		setLocalDescription("")
		setDescription("")
		updateDescriptionMutation("")
	}

	const handleDescriptionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		updateDescriptionMutation(localDescription)
	}

	return (
		<form className="flex w-full max-w-lg flex-col gap-2 overflow-x-hidden" onSubmit={handleDescriptionSubmit}>
			<div className="flex w-full flex-wrap items-center gap-2 rounded-2xl border bg-card p-1 pl-2">
				<label htmlFor="description" className="text-sm font-semibold text-muted-foreground">
					Description:
				</label>
				<input
					id="description"
					type="text"
					value={localDescription}
					onChange={handleDescriptionChange}
					placeholder={description}
					className="w-full flex-grow"
				/>

				<div className="input-group">
					<button type="submit" className="btn w-full bg-primary sm:w-auto" disabled={pendingDescription}>
						<Icon icon="material-symbols:update" className="icon text-xl" />
						<span className="hidden md:block">{pendingDescription ? "Updating..." : "Update"}</span>
					</button>
					<button
						type="button"
						className="btn w-full bg-danger sm:w-auto"
						onClick={handleDescriptionReset}
						disabled={pendingDescription}
					>
						<Icon icon="material-symbols:delete-history" className="icon text-xl" />
						<span className="hidden md:block">{pendingDescription ? "Clearing..." : "Clear"}</span>
					</button>
				</div>
			</div>
		</form>
	)
}

export default function HeaderForm() {
	return (
		<div className="flex w-full flex-col gap-2">
			<UpdateSlugForm />
			<UpdateDescriptionForm />
		</div>
	)
}
