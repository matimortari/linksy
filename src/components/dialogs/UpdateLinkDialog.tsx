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

	return (
		<Dialog isOpen={isOpen} onClose={onClose} title="Update Link">
			<form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col gap-2">
				<div className="flex flex-col gap-2 p-1 pl-2">
					<label htmlFor="title" className="text-sm font-semibold text-muted-foreground">
						Title:
					</label>
					<input
						id="title"
						type="text"
						placeholder="Link title..."
						{...register("title")}
						className="flex-1 rounded-2xl border"
					/>
				</div>

				<hr />

				<div className="flex flex-col gap-2 p-1 pl-2">
					<label htmlFor="url" className="text-sm font-semibold text-muted-foreground">
						URL:
					</label>
					<input
						id="url"
						type="url"
						placeholder="URL for the link..."
						{...register("url")}
						className="flex-1 rounded-2xl border"
					/>
				</div>

				<div className="input-group">
					<button type="submit" disabled={isPending} title="Update Link" className="btn bg-primary">
						{isPending ? "Updating..." : "Update Link"}
					</button>
					<button onClick={onClose} title="Cancel" className="btn bg-danger">
						Cancel
					</button>
				</div>
			</form>
		</Dialog>
	)
}
