"use client"

import { useUpdateSlug } from "@/src/hooks/useMutations"
import { Icon } from "@iconify/react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function UpdateSlugForm({ setSlug }) {
	const { data: session } = useSession()
	const [localSlug, setLocalSlug] = useState("")

	const { mutate: updateSlugMutation, isPending, error, isSuccess } = useUpdateSlug()

	useEffect(() => {
		if (session?.user) {
			setLocalSlug(session.user.slug || "")
		}
	}, [session])

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		updateSlugMutation(localSlug)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSlug = e.target.value
		setLocalSlug(newSlug)
		setSlug(newSlug)
	}

	const handleGenerateSlug = () => {
		const generatedSlug = `${Math.random().toString(36).substring(7)}`
		setLocalSlug(generatedSlug)
		setSlug(generatedSlug)
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="form-container my-2 max-w-xl">
				<input
					type="text"
					value={localSlug}
					onChange={handleChange}
					placeholder={localSlug}
					className="input flex-1 truncate text-sm text-muted-foreground"
					required
				/>
				<div className="flex flex-row gap-1">
					<button type="submit" className="btn bg-primary" disabled={isPending}>
						<Icon icon="material-symbols:update" className="icon text-xl" />
						{isPending ? "Updating..." : "Update"}
					</button>
					<button type="button" className="btn bg-secondary" onClick={handleGenerateSlug}>
						<Icon icon="icon-park-outline:magic-wand" className="icon text-xl" />
						Random
					</button>
				</div>
			</form>

			{isSuccess && <p className="description-label text-success">Slug updated successfully!</p>}
			{error && <p className="description-label text-danger">Failed to update slug.</p>}
		</>
	)
}
