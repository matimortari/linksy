import {
	addButton,
	addLink,
	deleteButton,
	deleteLink,
	resetSettings,
	updateDescription,
	updateLink,
	updateSettings,
	updateSlug,
	updateSupportBanner
} from "@/src/lib/apiServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useUpdateSlug() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["updateSlug"],
		mutationFn: updateSlug,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] })
		},
		onError: (error) => {
			console.error("Error updating slug:", error)
		}
	})
}

export function useUpdateDescription() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["updateDescription"],
		mutationFn: updateDescription,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] })
		},
		onError: (error) => {
			console.error("Error updating description:", error)
		}
	})
}

export function useAddLink() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["addLink"],
		mutationFn: addLink,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] })
		},
		onError: (error) => {
			console.error("Error adding link:", error)
		}
	})
}

export function useUpdateLink() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["updateLink"],
		mutationFn: updateLink,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] })
		},
		onError: (error) => {
			console.error("Error updating link:", error)
		}
	})
}

export function useDeleteLink() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["deleteLink"],
		mutationFn: (id: number) => deleteLink(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] })
		},
		onError: (error) => {
			console.error("Error deleting link:", error)
		}
	})
}

export function useAddButton() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["addButton"],
		mutationFn: addButton,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["buttons"] })
		},
		onError: (error) => {
			console.error("Error adding button:", error)
		}
	})
}

export function useDeleteButton() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["deleteButton"],
		mutationFn: (id: number) => deleteButton(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["buttons"] })
		},
		onError: (error) => {
			console.error("Error deleting button:", error)
		}
	})
}

export function useUpdateSettings() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["updateSettings"],
		mutationFn: updateSettings,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["settings"] })
		},
		onError: (error) => {
			console.error("Error updating settings:", error)
		}
	})
}

export function useResetSettings() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["resetSettings"],
		mutationFn: resetSettings,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["settings"] })
			return data.settings
		},
		onError: (error) => {
			console.error("Error resetting settings:", error)
		}
	})
}

export function useUpdateUserBanner() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["updateSupportBanner"],
		mutationFn: updateSupportBanner,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["settings"] })
		},
		onError: (error) => {
			console.error("Error updating support banner:", error)
		}
	})
}
