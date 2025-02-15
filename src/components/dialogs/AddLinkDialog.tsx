import { useAddLink } from "@/src/hooks/useMutations"
import { linkFormSchema } from "@/src/lib/formSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import Dialog from "../Dialog"

export default function AddLinkDialog({ isOpen, onClose, onAddLink }) {
	const { mutate: addLink, isPending } = useAddLink()

	const { register, handleSubmit, reset } = useForm<LinkFormData>({
		resolver: zodResolver(linkFormSchema)
	})

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
					<button type="submit" disabled={isPending} title="Add Link" className="btn bg-primary">
						{isPending ? "Adding..." : "Add Link"}
					</button>
					<button onClick={onClose} title="Cancel" className="btn bg-danger">
						Cancel
					</button>
				</div>
			</form>
		</Dialog>
	)
}
