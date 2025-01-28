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

	return (
		<Dialog isOpen={isOpen} onClose={onClose} title="Add New Social Button">
			<form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col gap-4">
				<div className="my-2 flex flex-col space-y-2">
					<label htmlFor="platform" className="text-sm font-semibold text-muted-foreground">
						Select Platform:
					</label>
					<div className="grid max-h-48 grid-cols-5 gap-1 overflow-y-auto md:max-h-full md:grid-cols-9 md:overflow-visible">
						{Object.entries(SOCIAL_ICONS).map(([platform, icon]) => (
							<div
								key={platform}
								onClick={() => setValue("platform", platform)}
								className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border p-2 ${
									selectedPlatform === platform ? "bg-secondary" : "bg-transparent"
								} hover:bg-secondary`}
							>
								<Icon icon={icon} className="text-xl" />
								<p className="mt-1 text-center text-xs">{platform.charAt(0).toUpperCase() + platform.slice(1)}</p>
							</div>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-2 md:w-fit md:flex-row md:items-center">
					<div className="flex w-full flex-row items-center gap-2 rounded-2xl border p-1 pl-2 md:w-72">
						<label htmlFor="url" className="text-sm font-semibold text-muted-foreground">
							URL:
						</label>
						<input id="url" type="url" {...register("url")} className="flex-1" />
					</div>

					<div className="input-group">
						<button type="submit" className="btn bg-primary" disabled={isPending}>
							{isPending ? "Adding..." : "Add Button"}
						</button>
						<button type="button" onClick={onClose} className="btn bg-secondary">
							Cancel
						</button>
					</div>
				</div>
			</form>
		</Dialog>
	)
}
