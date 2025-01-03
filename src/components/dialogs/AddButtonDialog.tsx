import { SOCIAL_ICONS } from "@/src/data/userSettings"
import useDialog from "@/src/hooks/useDialog"
import { useAddButton } from "@/src/hooks/useMutations"
import { Icon } from "@iconify/react"
import { useState } from "react"

export default function AddButtonDialog({ onClose, addButton }) {
	const { dialogRef, setError, error } = useDialog(onClose)
	const [selectedPlatform, setSelectedPlatform] = useState("")
	const [url, setUrl] = useState("")
	const icon = selectedPlatform ? SOCIAL_ICONS[selectedPlatform] : "" // Get icon based on selected platform

	const { mutate: addButtonMutation, isPending } = useAddButton({ onClose })

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!selectedPlatform || !url) {
			setError("All fields are required")
			return
		}

		addButtonMutation({ platform: selectedPlatform, icon, url, clicks: 0 })
		addButton({ platform: selectedPlatform, icon, url })
		onClose()
	}

	return (
		<div className="expand-dialog fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div ref={dialogRef} className="card shadow-lg">
				<h2 className="mb-2">Add Button</h2>

				<form onSubmit={handleSubmit} className="w-full">
					<div className="my-2 flex flex-col space-y-2">
						<label className="text-sm font-medium">Select Platform:</label>
						<div className="grid grid-cols-5 gap-1 md:grid-cols-9">
							{Object.entries(SOCIAL_ICONS).map(([platform, icon]) => (
								<div
									key={platform}
									onClick={() => setSelectedPlatform(platform)}
									className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border border-muted p-2 ${
										selectedPlatform === platform ? "bg-primary" : "bg-transparent"
									} hover:bg-primary`}
								>
									<Icon icon={icon} className="text-xl" />
									<p className="mt-1 text-center text-xs">{platform.charAt(0).toUpperCase() + platform.slice(1)}</p>
								</div>
							))}
						</div>
					</div>

					<input
						type="url"
						value={url}
						onChange={(e) => {
							setUrl(e.target.value)
							setError("")
						}}
						placeholder="Button URL"
						className="form-container my-2"
						required
					/>

					{error && (
						<div className="mb-4 text-sm text-danger">
							<p>{error}</p>
						</div>
					)}

					<div className="flex flex-row gap-2">
						<button type="submit" className="btn bg-primary" disabled={isPending}>
							{isPending ? "Adding..." : "Add Link"}
						</button>
						<button onClick={onClose} className="btn">
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
