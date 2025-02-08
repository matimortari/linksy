import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "./auth"
import { db } from "./db"

// Helper function to format a date string
export function formatDate(dateString: Date) {
	const date = new Date(dateString)
	const formattedDate = date.toLocaleDateString("en-US", {
		year: "2-digit",
		month: "short",
		day: "numeric"
	})

	return formattedDate.charAt(0).toLowerCase() + formattedDate.slice(1)
}

// Generate a random slug
export function generateSlug(base: string = "") {
	const randomString = Math.random().toString(36).substring(2, 10)

	return `${base
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-]/g, "")}-${randomString}`
}

// Get the session or return an unauthorized JSON response
export async function getSessionOrUnauthorized() {
	const session = await getServerSession(authOptions)
	if (!session?.user) {
		return { error: true, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
	}

	return { error: false, session }
}

// Track page visits and update UserStats table
export async function trackPageVisit(userId: string) {
	const now = new Date()

	// Find the first record for today
	const userStats = await db.userStats.findFirst({
		where: {
			userId,
			date: {
				gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) // Find any record for today
			}
		}
	})

	if (userStats) {
		await db.userStats.update({
			where: { id: userStats.id },
			data: { views: userStats.views + 1 }
		})
	} else {
		await db.userStats.create({
			data: {
				userId,
				date: now,
				views: 1,
				linkClicks: 0,
				buttonClicks: 0
			}
		})
	}
}

// Sum linkClicks and buttonClicks and update UserStats table
export async function updateClickStats(userId: string) {
	const now = new Date()

	// Find the first record for today
	const userStats = await db.userStats.findFirst({
		where: {
			userId,
			date: {
				gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) // Find any record for today
			}
		}
	})

	const linkClicksSum = await db.linkClick.aggregate({
		where: { userLink: { userId } },
		_count: { id: true }
	})
	const buttonClicksSum = await db.buttonClick.aggregate({
		where: { userButton: { userId } },
		_count: { id: true }
	})

	const linkClicksTotal = linkClicksSum._count.id ?? 0
	const buttonClicksTotal = buttonClicksSum._count.id ?? 0

	if (userStats) {
		await db.userStats.update({
			where: { id: userStats.id },
			data: {
				linkClicks: linkClicksTotal,
				buttonClicks: buttonClicksTotal
			}
		})
	} else {
		await db.userStats.create({
			data: {
				userId,
				date: now,
				views: 0,
				linkClicks: linkClicksTotal,
				buttonClicks: buttonClicksTotal
			}
		})
	}
}
