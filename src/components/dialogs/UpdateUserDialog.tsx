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
		<Dialog isOpen={isOpen} onClose={onClose} title="Update Profile">
			<form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col gap-2">
				<div className="flex flex-col gap-2 p-1 pl-2">
					<label htmlFor="slug" className="text-sm font-semibold text-muted-foreground">
						Slug:
					</label>
					<input
						id="slug"
						type="text"
						placeholder="Your unique identifier"
						{...register("slug")}
						className="flex-1 rounded-2xl border"
					/>
				</div>

				<hr />

				<div className="flex flex-col gap-2 p-1 pl-2">
					<label htmlFor="description" className="text-sm font-semibold text-muted-foreground">
						Description:
					</label>
					<input
						id="description"
						type="text"
						placeholder="A short bio about yourself"
						{...register("description")}
						className="flex-1 rounded-2xl border"
					/>
				</div>

				<hr />

				<div className="flex flex-col gap-2 p-1 pl-2">
					<label htmlFor="image" className="text-sm font-semibold text-muted-foreground">
						Image URL:
					</label>
					<input
						id="image"
						type="url"
						placeholder="URL for your profile picture"
						{...register("image")}
						className="flex-1 rounded-2xl border"
					/>
				</div>

				<div className="input-group">
					<button
						type="submit"
						disabled={isSlugPending || isDescriptionPending || isImagePending}
						title="Update Profile"
						className="btn bg-success"
					>
						{isSlugPending || isDescriptionPending || isImagePending ? "Updating..." : "Update Profile"}
					</button>
					<button onClick={onClose} title="Cancel" className="btn bg-danger">
						Cancel
					</button>
				</div>
			</form>
		</Dialog>
	)
}
