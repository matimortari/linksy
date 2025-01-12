// Get user data
export const getUserData = async () => {
	const res = await fetch("/api/user", { method: "GET" })
	return res.json()
}

// Update user slug
export const updateSlug = async (newSlug: string): Promise<void> => {
	const response = await fetch("/api/user", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ newSlug })
	})

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.message || "Failed to update slug.")
	}
}

// Update user description
export const updateDescription = async (newDescription: string): Promise<void> => {
	const response = await fetch("/api/user", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ newDescription })
	})

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.message || "Failed to update description.")
	}
}

// Reset user description
export const resetDescription = ({
	setDescription,
	setLocalDescription
}: {
	setDescription: (value: string) => void
	setLocalDescription: (value: string) => void
}) => {
	setDescription("")
	setLocalDescription("")
}

// Delete user account
export async function deleteAccount() {
	const response = await fetch("/api/user", { method: "DELETE" })

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.message || "Failed to delete user account.")
	}
}
