import { useAddLink } from "@/src/hooks/useMutations"
import { linkFormSchema } from "@/src/lib/Formvalidator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import Dialog from "../Dialog"

export default function AddLinkDialog({ isOpen, onClose, onAddLink }) {
	const { mutate: addLink, isPending } = useAddLink()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<LinkFormData>({
		resolver: zodResolver(linkFormSchema)
	})

	// Reset form fields when dialog is opened or closed
	useEffect(() => {
		if (isOpen) {
			reset()
		}
	}, [isOpen, reset])

	const onSubmit = (data: LinkFormData) => {
		addLink(
			{ title: data.title, url: data.url },
			{
				onSuccess: (newLink) => {
					onAddLink(newLink)
					onClose()
				}
			}
		)
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} title="Add New Link">
			<form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col gap-4">
				<div className="input-group flex flex-row items-center gap-2 rounded-2xl border border-border p-1 pl-2">
					<label htmlFor="title" className="text-sm font-semibold text-muted-foreground">
						Title:
					</label>
					<input id="title" type="text" {...register("title")} className="flex-1" />
				</div>

				{errors.title && <p className="py-2 text-xs text-danger">{errors.title.message}</p>}

				<div className="input-group flex flex-row items-center gap-2 rounded-2xl border border-border p-1 pl-2">
					<label htmlFor="url" className="text-sm font-semibold text-muted-foreground">
						URL:
					</label>
					<input id="url" type="url" {...register("url")} className="flex-1" />
				</div>

				{errors.url && <p className="py-2 text-xs text-danger">{errors.url.message}</p>}

				<div className="input-group">
					<button type="submit" className="btn bg-primary" disabled={isPending}>
						{isPending ? "Adding..." : "Add Link"}
					</button>
					<button type="button" onClick={onClose} className="btn bg-secondary">
						Cancel
					</button>
				</div>
			</form>
		</Dialog>
	)
}
