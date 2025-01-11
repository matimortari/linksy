import { useUpdateDescription, useUpdateSlug } from "@/src/hooks/useMutations"
import { Icon } from "@iconify/react"
import { useState } from "react"

function UpdateSlugForm({ setSlug, slug }) {
	const [localSlug, setLocalSlug] = useState("")
	const { mutate: updateSlugMutation, isPending: pendingSlug } = useUpdateSlug()
	const [isGeneratingSlug, setIsGeneratingSlug] = useState(false)

	const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalSlug(e.target.value)
		setSlug(e.target.value)
	}

	const handleGenerateSlug = () => {
		setIsGeneratingSlug(true)
		const generatedSlug = `${Math.random().toString(36).substring(7)}`
		setLocalSlug(generatedSlug)
		setSlug(generatedSlug)
		updateSlugMutation(generatedSlug)
		setIsGeneratingSlug(false)
	}

	const handleSlugSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		updateSlugMutation(localSlug)
	}

	return (
		<form className="flex max-w-xl flex-col gap-2" onSubmit={handleSlugSubmit}>
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
					<button type="submit" className="btn bg-primary" disabled={pendingSlug}>
						<Icon icon="material-symbols:update" className="icon text-xl" />
						{pendingSlug ? "Updating..." : "Update"}
					</button>
					<button
						type="button"
						className="btn bg-secondary"
						onClick={handleGenerateSlug}
						disabled={pendingSlug || isGeneratingSlug}
					>
						<Icon icon="icon-park-outline:magic-wand" className="icon text-xl" />
						{isGeneratingSlug ? "Generating..." : "Random"}
					</button>
				</div>
			</div>
		</form>
	)
}

function UpdateDescriptionForm({ setDescription, description }) {
	const [localDescription, setLocalDescription] = useState("")
	const { mutate: updateDescriptionMutation, isPending: pendingDescription } = useUpdateDescription()
	const [isClearingDescription, setIsClearingDescription] = useState(false)

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalDescription(e.target.value)
		setDescription(e.target.value)
	}

	const handleDescriptionReset = () => {
		setIsClearingDescription(true)
		setLocalDescription("")
		setDescription("")
		updateDescriptionMutation("")
		setIsClearingDescription(false)
	}

	const handleDescriptionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		updateDescriptionMutation(localDescription)
	}

	return (
		<form className="flex max-w-xl flex-col gap-2" onSubmit={handleDescriptionSubmit}>
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
					<button type="submit" className="btn bg-primary" disabled={pendingDescription}>
						<Icon icon="material-symbols:update" className="icon text-xl" />
						{pendingDescription ? "Updating..." : "Update"}
					</button>
					<button
						type="button"
						className="btn bg-danger"
						onClick={handleDescriptionReset}
						disabled={pendingDescription || isClearingDescription}
					>
						<Icon icon="material-symbols:delete-history" className="icon text-xl" />
						{isClearingDescription ? "Clearing..." : "Clear"}
					</button>
				</div>
			</div>
		</form>
	)
}

export default function HeaderForm({ setDescription, setSlug, slug, description }) {
	return (
		<div className="flex flex-col gap-4">
			<UpdateSlugForm setSlug={setSlug} slug={slug} />
			<UpdateDescriptionForm setDescription={setDescription} description={description} />
		</div>
	)
}
