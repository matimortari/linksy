import { formatDate } from "@/src/lib/utils"

// Get user analytics data
export const getAnalytics = async () => {
	const res = await fetch("/api/analytics", { method: "GET" })
	const data = await res.json()

	// Format the date in each data entry
	const formattedData = data.map((entry: { date: any }) => ({
		...entry,
		date: formatDate(entry.date)
	}))

	return formattedData
}

// Track clicks for a link or button
export async function trackClick(id: number, type: "link" | "button", userId: string) {
	const res = await fetch("/api/analytics", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ id, type, userId })
	})
	return res.json()
}

// Track visits to a user's page
// export async function trackPageVisit(slug: string) {
// 	const user = await db.user.findUnique({
// 		where: { slug },
// 		include: { userStats: true }
// 	})

// 	if (!user) return

// 	const today = new Date().toISOString().split("T")[0]

// 	const stats =
// 		user.userStats.find((stat) => stat.date.toISOString().split("T")[0] === today) ||
// 		(await db.userStats.create({
// 			data: {
// 				userId: user.id,
// 				date: new Date(),
// 				views: 0,
// 				linkClicks: 0,
// 				buttonClicks: 0
// 			}
// 		}))

// 	await db.userStats.update({
// 		where: { id: stats.id },
// 		data: { views: stats.views + 1 }
// 	})
// }
