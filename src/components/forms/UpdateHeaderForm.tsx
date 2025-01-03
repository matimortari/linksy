"use client"

import { useUpdateDescription } from "@/src/hooks/useMutations"
import { Icon } from "@iconify/react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function UpdateHeaderForm({ setDescription }) {
	const { data: session } = useSession()
	const [localDescription, setLocalDescription] = useState("")
	const [currentDescription, setCurrentDescription] = useState("")

	const { mutate: updateDescriptionMutation, isPending, error, isSuccess } = useUpdateDescription()

	useEffect(() => {
		if (session) {
			setCurrentDescription(session.user.description || "Enter description")
			setLocalDescription(session.user.description || "")
		}
	}, [session])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalDescription(e.target.value)
		setDescription(e.target.value)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		updateDescriptionMutation(localDescription)
	}

	const handleReset = () => {
		setLocalDescription("")
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="form-container my-2 max-w-xl">
				<input
					type="text"
					value={localDescription}
					onChange={handleChange}
					placeholder={currentDescription}
					className="input flex-1 truncate text-sm text-muted-foreground"
				/>

				<div className="flex flex-row gap-1">
					<button type="submit" className="btn bg-primary" disabled={isPending}>
						<Icon icon="material-symbols:update" className="icon text-xl" />
						{isPending ? "Updating..." : "Update"}
					</button>
					<button type="button" className="btn bg-danger" onClick={handleReset}>
						<Icon icon="material-symbols:delete-history" className="icon text-xl" />
						Clear
					</button>
				</div>
			</form>

			{isSuccess && <p className="description-label text-success">Description updated successfully!</p>}
			{error && <p className="description-label text-danger">Failed to update description.</p>}
		</>
	)
}
