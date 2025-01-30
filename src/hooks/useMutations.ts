import { addButton, deleteButton } from "@/src/services/buttonsService"
import { addLink, deleteLink, updateLink } from "@/src/services/linksService"
import { resetSettings, updateSettings, updateSupportBanner } from "@/src/services/settingsService"
import { updateDescription, updateImage, updateSlug } from "@/src/services/userService"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useUpdateSlug() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["updateSlug"],
		mutationFn: updateSlug,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getUserData"] })
		}
	})
}

export function useUpdateDescription() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["updateDescription"],
		mutationFn: updateDescription,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getUserData"] })
		}
	})
}

export function useUpdateImage() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["updateImage"],
		mutationFn: updateImage,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getUserData"] })
		}
	})
}

export function useAddLink() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["addLink"],
		mutationFn: addLink,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getLinks"] })
		}
	})
}

export function useUpdateLink() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["updateLink"],
		mutationFn: updateLink,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getLinks"] })
		}
	})
}

export function useDeleteLink() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["deleteLink"],
		mutationFn: (id: number) => deleteLink(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getLinks"] })
		}
	})
}

export function useAddButton() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["addButton"],
		mutationFn: addButton,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getButtons"] })
		}
	})
}

export function useDeleteButton() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["deleteButton"],
		mutationFn: (id: number) => deleteButton(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getButtons"] })
		}
	})
}

export function useUpdateSettings() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["updateSettings"],
		mutationFn: updateSettings,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getSettings"] })
		}
	})
}

export function useResetSettings() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["resetSettings"],
		mutationFn: resetSettings,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getSettings"] })
		}
	})
}

export function useUpdateSupportBanner() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["updateSupportBanner"],
		mutationFn: updateSupportBanner,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getSettings"] })
		}
	})
}
