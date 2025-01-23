// Get user social buttons
export const getButtons = async () => {
	const res = await fetch("/api/buttons", { method: "GET" })

	return res.json()
}

// Add a new social button
export const addButton = async (newButton: Button) => {
	const res = await fetch("/api/buttons", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newButton)
	})

	return res.json()
}

// Delete an existing social button by ID
export const deleteButton = async (id: number): Promise<number> => {
	await fetch(`/api/buttons?id=${id}`, { method: "DELETE" })

	return id
}
