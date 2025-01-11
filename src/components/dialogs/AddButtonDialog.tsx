import { SOCIAL_ICONS } from "@/src/data/formConfig"
import { useAddButton } from "@/src/hooks/useMutations"
import { Icon } from "@iconify/react"
import { useState } from "react"
import Dialog from "../Dialog"

export default function AddButtonDialog({ isOpen, onClose, onAddButton }) {
	const [selectedPlatform, setSelectedPlatform] = useState("")
	const [url, setUrl] = useState("")
	const icon = selectedPlatform ? SOCIAL_ICONS[selectedPlatform] : ""

	const { mutate: addButton, isPending } = useAddButton()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		addButton(
			{ platform: selectedPlatform, icon, url },
			{
				onSuccess: () => {
					onAddButton()
					onClose()
				}
			}
		)
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} title="Add New Social Button">
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="my-2 flex flex-col space-y-2">
					<label className="text-sm font-medium">Select Platform</label>
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

				<div>
					<label htmlFor="url" className="block text-sm font-medium text-muted-foreground">
						URL
					</label>
					<input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Button URL" required />
				</div>

				<div className="flex justify-between gap-4">
					<button type="button" onClick={onClose} className="btn bg-secondary">
						Cancel
					</button>
					<button type="submit" className="btn bg-primary" disabled={isPending}>
						{isPending ? "Adding..." : "Add Button"}
					</button>
				</div>
			</form>
		</Dialog>
	)
}
