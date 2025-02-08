import { useUpdateDescription, useUpdateImage, useUpdateSlug } from "@/src/hooks/useMutations"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import Dialog from "../Dialog"

export default function UpdateUserDialog({ isOpen, onClose, currentUser, onUpdateUser }) {
	const { mutate: updateSlug, isPending: isSlugPending } = useUpdateSlug()
	const { mutate: updateDescription, isPending: isDescriptionPending } = useUpdateDescription()
	const { mutate: updateImage, isPending: isImagePending } = useUpdateImage()

	const { register, handleSubmit, setValue } = useForm<{ description: string; slug: string; image: string }>()

	useEffect(() => {
		if (isOpen && currentUser) {
			setValue("description", currentUser.description || "")
			setValue("slug", currentUser.slug || "")
			setValue("image", currentUser.image || "")
		}
	}, [isOpen, currentUser, setValue])

	const onSubmit = (data: { description: string; slug: string; image: string }) => {
		onUpdateUser({
			...currentUser,
			description: data.description,
			slug: data.slug,
			image: data.image
		})

		updateDescription(data.description)
		updateSlug(data.slug)
		updateImage(data.image, {
			onSuccess: () => {
				onClose()
			}
		})
	}

	return (
		<Dialog title="Update User" isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col gap-4">
				<div className="flex flex-row items-center gap-2 rounded-2xl border bg-card p-1 pl-2">
					<label htmlFor="slug" className="text-sm font-semibold text-muted-foreground">
						Slug:
					</label>
					<input id="slug" type="text" {...register("slug")} className="flex-1" />
				</div>

				<div className="flex flex-row items-center gap-2 rounded-2xl border bg-card p-1 pl-2">
					<label htmlFor="description" className="text-sm font-semibold text-muted-foreground">
						Description:
					</label>
					<input id="description" type="text" {...register("description")} className="flex-1" />
				</div>

				<div className="flex flex-row items-center gap-2 rounded-2xl border bg-card p-1 pl-2">
					<label htmlFor="image" className="text-sm font-semibold text-muted-foreground">
						Image URL:
					</label>
					<input id="image" type="url" {...register("image")} className="flex-1" placeholder="Enter image URL" />
				</div>

				<div className="input-group">
					<button
						type="submit"
						className="btn bg-primary sm:w-auto"
						disabled={isDescriptionPending || isSlugPending || isImagePending}
					>
						{isDescriptionPending || isSlugPending || isImagePending ? "Updating..." : "Update User Info"}
					</button>
					<button type="button" onClick={onClose} className="btn bg-danger">
						Cancel
					</button>
				</div>
			</form>
		</Dialog>
	)
}
