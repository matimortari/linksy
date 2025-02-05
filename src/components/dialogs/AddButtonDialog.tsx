import { SOCIAL_ICONS } from "@/src/data/formConfig"
import { useAddButton } from "@/src/hooks/useMutations"
import { buttonFormSchema } from "@/src/lib/formSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import Dialog from "../Dialog"

export default function AddButtonDialog({ isOpen, onClose, onAddButton }) {
	const { mutate: addButton, isPending } = useAddButton()

	const { register, handleSubmit, watch, setValue, reset } = useForm<ButtonFormData>({
		resolver: zodResolver(buttonFormSchema)
	})

	// Reset form fields when dialog is opened
	useEffect(() => {
		if (isOpen) {
			reset()
		}
	}, [isOpen, reset])

	const selectedPlatform = watch("platform")
	const icon = selectedPlatform ? SOCIAL_ICONS[selectedPlatform] : ""

	const onSubmit = (data: ButtonFormData) => {
		addButton(
			{ platform: data.platform, icon, url: data.url },
			{
				onSuccess: () => {
					onAddButton({ platform: data.platform, icon, url: data.url })
					onClose()
				}
			}
		)
	}

	const handlePlatformSelect = (platform: string) => {
		setValue("platform", platform)
	}

	const handleKeyDown = (e: React.KeyboardEvent, platform: string) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault()
			handlePlatformSelect(platform)
		}
	}

	return (
		<Dialog title="Add New Social Button" isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col gap-4">
				<div className="my-2 flex flex-col space-y-2">
					<div className="grid max-h-48 grid-cols-3 gap-1 overflow-y-auto md:max-h-full md:grid-cols-9 md:overflow-visible">
						{Object.entries(SOCIAL_ICONS).map(([platform, icon]) => (
							<button
								key={platform}
								tabIndex={0}
								onClick={() => handlePlatformSelect(platform)}
								onKeyDown={(e) => handleKeyDown(e, platform)}
								className={`flex flex-col items-center justify-center rounded-lg border p-2 ${
									selectedPlatform === platform ? "bg-muted" : "bg-transparent"
								} hover:bg-muted`}
							>
								<Icon icon={icon} className="text-xl" />
								<h6 className="mt-1 text-center text-xs">{platform.charAt(0).toUpperCase() + platform.slice(1)}</h6>
							</button>
						))}
					</div>
				</div>

				<div className="flex w-full flex-row items-center gap-2 rounded-2xl border p-1 pl-2 md:w-72">
					<label htmlFor="url" className="text-sm font-semibold text-muted-foreground">
						URL:
					</label>
					<input id="url" type="url" {...register("url")} className="flex-1" />
				</div>

				<div className="input-group">
					<button type="submit" disabled={isPending} className="btn bg-primary">
						{isPending ? "Adding..." : "Add Button"}
					</button>
					<button type="button" onClick={onClose} className="btn bg-danger">
						Cancel
					</button>
				</div>
			</form>
		</Dialog>
	)
}
