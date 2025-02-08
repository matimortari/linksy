// Get user settings
export const getSettings = async () => {
	const res = await fetch("/api/preferences", { method: "GET" })
	return res.json()
}

// Update user settings
export const updateSettings = async (newSettings: object) => {
	const res = await fetch("/api/preferences", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newSettings)
	})
	return res.json()
}

// Update user settings for support banner
export const updateSupportBanner = async (newBanner: string) => {
	const res = await fetch("/api/preferences", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ supportBanner: newBanner })
	})
	return res.json()
}

// Reset user settings (send empty object to trigger defaults in Prisma)
export const resetSettings = async () => {
	const res = await fetch("/api/preferences", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({})
	})
	return res.json()
}
