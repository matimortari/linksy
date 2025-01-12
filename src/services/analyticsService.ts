// Get user analytics data
export const getAnalytics = async () => {
	const res = await fetch("/api/analytics", { method: "GET" })
	return res.json()
}

// Track clicks for a link or button
// TODO - Correctly type the id parameters
export async function trackClick(id: any, type: "link" | "button", userId: any) {
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
