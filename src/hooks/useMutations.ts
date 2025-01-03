import {
	addButton,
	addLink,
	deleteButton,
	deleteLink,
	resetSettings,
	updateDescription,
	updateLink,
	updateSlug,
	updateUserBanner,
	updateUserSettings
} from "@/src/lib/actions"
import { useMutation, useQueryClient } from "@tanstack/react-query"

// Hook to update user slug
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

// Hook to update user description
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

// Hook to reset user settings
export function useResetSettings() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["resetSettings"],
		mutationFn: resetSettings,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["userSettings"] })
			return data.settings
		},
		onError: (error) => {
			console.error("Error resetting settings:", error)
		}
	})
}

// Hook to update user settings
export function useUpdateSettings() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["updateUserSettings"],
		mutationFn: updateUserSettings,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userSettings"] })
		},
		onError: (error) => {
			console.error("Error updating settings:", error)
		}
	})
}

// Hook to update user support banner
export function useUpdateUserBanner() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["updateUserBanner"],
		mutationFn: updateUserBanner,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userSettings"] })
		},
		onError: (error) => {
			console.error("Error updating support banner:", error)
		}
	})
}

// Hook to add a new link
export function useAddLink({ onClose }) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["addLink"],
		mutationFn: addLink,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] })
			if (onClose) onClose()
		},
		onError: (error) => {
			console.error("Error adding link:", error)
		}
	})
}

// Hook to update a link
export function useUpdateLink({ onClose }) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["updateLink"],
		mutationFn: updateLink,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] })
			if (onClose) onClose()
		},
		onError: (error) => {
			console.error("Error updating link:", error)
		}
	})
}

// Hook to delete a link
export function useDeleteLink() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["deleteLink"],
		mutationFn: (id: string) => deleteLink(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] })
		},
		onError: (error) => {
			console.error("Error deleting link:", error)
		}
	})
}

// Hook to add a new social button
export function useAddButton({ onClose }) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["addButton"],
		mutationFn: addButton,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["buttons"] })
			if (onClose) onClose()
		},
		onError: (error) => {
			console.error("Error adding button:", error)
		}
	})
}

// Hook to delete a social button
export function useDeleteButton() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["deleteButton"],
		mutationFn: (id: string) => deleteButton(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["buttons"] })
		},
		onError: (error) => {
			console.error("Error deleting button:", error)
		}
	})
}
