import { useUpdateLink } from "@/src/hooks/useMutations"
import { linkFormSchema } from "@/src/lib/formSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import Dialog from "../Dialog"

export default function UpdateLinkDialog({ isOpen, onClose, currentLink, onUpdateLink }) {
	const { mutate: updateLink, isPending } = useUpdateLink()

	const { register, handleSubmit, reset } = useForm<LinkFormData>({
		resolver: zodResolver(linkFormSchema)
	})

	// Set form fields to current link values when dialog is opened
	useEffect(() => {
		if (isOpen && currentLink) {
			reset(currentLink)
		}
	}, [isOpen, currentLink, reset])

	const onSubmit = (data: LinkFormData) => {
		const updatedLink = { ...data, id: currentLink.id }
		updateLink(updatedLink, {
			onSuccess: () => {
				onUpdateLink(updatedLink)
				onClose()
			}
		})
	}

	if (!currentLink) return null

	return (
		<Dialog isOpen={isOpen} onClose={onClose} title="Update Link">
			<form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col gap-4">
				<div className="flex flex-row items-center gap-2 rounded-2xl border bg-card p-1 pl-2">
					<label htmlFor="title" className="text-sm font-semibold text-muted-foreground">
						Title:
					</label>
					<input id="title" type="text" {...register("title")} className="flex-1" />
				</div>

				<div className="flex flex-row items-center gap-2 rounded-2xl border p-1 pl-2">
					<label htmlFor="url" className="text-sm font-semibold text-muted-foreground">
						URL:
					</label>
					<input id="url" type="url" {...register("url")} className="flex-1" />
				</div>

				<div className="input-group">
					<button type="submit" className="btn bg-primary" disabled={isPending}>
						{isPending ? "Updating..." : "Update Link"}
					</button>
					<button type="button" onClick={onClose} className="btn bg-danger">
						Cancel
					</button>
				</div>
			</form>
		</Dialog>
	)
}
