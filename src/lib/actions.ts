import { defaultSettings } from "../data/userSettings"

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

export async function deleteUserAccount() {
	const response = await fetch("/api/user", { method: "DELETE" })

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.message || "Failed to delete user account.")
	}
}

// Get user settings
export const getUserSettings = async () => {
	const res = await fetch("/api/preferences", { method: "GET" })
	return res.json()
}

// Update user settings
export const updateUserSettings = async (newSettings: object) => {
	const res = await fetch("/api/preferences", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newSettings)
	})
	return res.json()
}

// Update user settings for support banner
export const updateUserBanner = async (newBanner: string) => {
	const res = await fetch("/api/preferences", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ supportBanner: newBanner })
	})
	return res.json()
}

// Reset user settings to default
export const resetSettings = async () => {
	const res = await fetch("/api/preferences", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(defaultSettings)
	})
	return res.json()
}

// Get user links
export const getLinks = async () => {
	const res = await fetch("/api/links", { method: "GET" })
	return res.json()
}

// Add a new link
export const addLink = async (newLink: UserLink) => {
	const res = await fetch("/api/links", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newLink)
	})
	return res.json()
}

// Update an existing link
export const updateLink = async (updatedLink: UserLink) => {
	const res = await fetch("/api/links", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(updatedLink)
	})
	return res.json()
}

// Delete an existing link by ID
export const deleteLink = async (id: string): Promise<string> => {
	await fetch(`/api/links?id=${id}`, { method: "DELETE" })
	return id
}

// Get user social buttons
export const getButtons = async () => {
	const res = await fetch("/api/buttons", { method: "GET" })
	return res.json()
}

// Add a new social button
export const addButton = async (newButton: UserButton) => {
	const res = await fetch("/api/buttons", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newButton)
	})
	return res.json()
}

// Delete an existing social button by ID
export const deleteButton = async (id: string): Promise<string> => {
	await fetch(`/api/buttons?id=${id}`, { method: "DELETE" })
	return id
}
