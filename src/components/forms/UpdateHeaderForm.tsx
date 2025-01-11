import { Icon } from "@iconify/react"
import { useState } from "react"

export default function UpdateHeaderForm({ setDescription }) {
	const [localDescription, setLocalDescription] = useState("")
	const [currentDescription, setCurrentDescription] = useState("")
	const [isPending, setIsPending] = useState(false)

	// Handle change for using global state
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalDescription(e.target.value)
		setDescription(e.target.value)
	}

	// Handle form submit for updating header description
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	// TODO - Handle reset to default header description
	const handleReset = () => {
		setLocalDescription("")
		setDescription("")
		// updateDescriptionMutation("")
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="form-container max-w-xl">
				<input
					type="text"
					value={localDescription}
					onChange={handleChange}
					placeholder={currentDescription}
					className="mb-2 flex-1 truncate rounded-2xl border border-border bg-transparent p-2 text-sm text-muted-foreground"
					required
				/>

				<div className="flex flex-row gap-1">
					<button type="submit" className="btn bg-primary" disabled={isPending}>
						<Icon icon="material-symbols:update" className="icon text-xl" />
						{isPending ? "Updating..." : "Update"}
					</button>
					<button type="button" className="btn bg-danger" onClick={handleReset} disabled={isPending}>
						<Icon icon="material-symbols:delete-history" className="icon text-xl" />
						{isPending ? "Updating..." : "Clear"}
					</button>
				</div>
			</form>
		</>
	)
}
