import { formatDate } from "@/src/lib/utils"
import { getButtons } from "@/src/services/buttonsService"
import { getLinks } from "@/src/services/linksService"

// Get user analytics data
export const getAnalytics = async () => {
	const res = await fetch("/api/analytics", { method: "GET" })
	const data = await res.json()

	const formattedData = data.map((entry: { date: any }) => ({
		...entry,
		date: formatDate(entry.date)
	}))

	return formattedData
}

// Track clicks for a link or button
export const trackClick = async (id: number, type: "link" | "button", userId: string) => {
	const res = await fetch("/api/analytics", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ id, type, userId })
	})

	return res.json()
}

// Combine links and buttons data and fetch them together for analytics view
export const getClicksByLink = async () => {
	const links = await getLinks()
	const buttons = await getButtons()

	// Combine both the links and buttons into a single array with a type identifier
	const combinedItems = [
		...links.map((link: Link) => ({ ...link, type: "link" })),
		...buttons.map((button: Button) => ({ ...button, type: "button" }))
	]

	return combinedItems
}
