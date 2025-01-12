import { SupportBanner } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "./auth"
import { db } from "./db"

// Helper function to generate a random slug
export function generateSlug(base: string = "", isInitial: boolean = false, length: number = 6) {
	const randomString = () =>
		Math.random()
			.toString(36)
			.substring(2, 2 + length)

	return isInitial
		? `${base
				.toLowerCase()
				.replace(/\s+/g, "-")
				.replace(/[^a-z0-9-]/g, "")}-${randomString()}`
		: `${randomString()}-${randomString()}`
}

// Helper function to get the session or return an unauthorized JSON response
export async function getSessionOrUnauthorized() {
	const session = await getServerSession(authOptions)
	if (!session || !session.user) {
		return { error: true, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
	}

	return { error: false, session }
}

// Default settings for new accounts
export const defaultSettings = {
	backgroundColor: "#e7e5e5",
	slugTextColor: "#1e1e1e",
	slugTextWeight: "500",
	slugTextSize: "1rem",
	headerTextColor: "#1e1e1e",
	linkBackgroundColor: "#ffffff",
	linkTextColor: "#1e1e1e",
	linkShadowColor: "#e7e5e5",
	isLinkShadow: false,
	linkHoverBackgroundColor: "#eeeeee",
	linkBorderRadius: "0.5rem",
	linkPadding: "0.5rem",
	buttonBackgroundColor: "#ffffff",
	buttonShadowColor: "#e7e5e5",
	isButtonShadow: false,
	buttonIconColor: "#1e1e1e",
	buttonHoverBackgroundColor: "#eeeeee",
	supportBanner: SupportBanner.NONE
}

// Track page visits and update UserStats table
export async function trackPageVisit(userId: string) {
	const today = new Date().toISOString().split("T")[0] // Get the current date in YYYY-MM-DD format
	const startOfDay = `${today}T00:00:00.000Z` // Ensure the time part is added

	// Check if a record already exists for today's date
	const userStats = await db.userStats.findUnique({
		where: {
			userId_date: {
				userId,
				date: startOfDay
			}
		}
	})

	if (userStats) {
		// If the record exists, increment the views count by 1
		await db.userStats.update({
			where: {
				id: userStats.id
			},
			data: {
				views: userStats.views + 1
			}
		})
	} else {
		// If no record exists, create a new one with 1 view
		await db.userStats.create({
			data: {
				userId,
				date: startOfDay,
				views: 1,
				linkClicks: 0,
				buttonClicks: 0
			}
		})
	}
}

// Sum linkClicks and buttonClicks and update UserStats table
export async function updateClickStats(userId: string) {
	const today = new Date().toISOString().split("T")[0] // Get the current date in YYYY-MM-DD format
	const startOfDay = `${today}T00:00:00.000Z` // Ensure the time part is added (start of the day)

	// Check if a record already exists for today's date
	const userStats = await db.userStats.findUnique({
		where: {
			userId_date: {
				userId,
				date: startOfDay // Pass the full date with time
			}
		}
	})

	// Aggregate the link and button clicks
	const linkClicksSum = await db.linkClick.aggregate({
		where: { userLink: { userId } },
		_count: { id: true } // Aggregate by counting the number of link clicks
	})

	const buttonClicksSum = await db.buttonClick.aggregate({
		where: { userButton: { userId } },
		_count: { id: true } // Aggregate by counting the number of button clicks
	})

	const linkClicksTotal = linkClicksSum._count.id ?? 0 // Handle undefined case
	const buttonClicksTotal = buttonClicksSum._count.id ?? 0 // Handle undefined case

	if (userStats) {
		// If the record exists, update the linkClicks and buttonClicks
		await db.userStats.update({
			where: {
				id: userStats.id
			},
			data: {
				linkClicks: linkClicksTotal,
				buttonClicks: buttonClicksTotal
			}
		})
	} else {
		// If no record exists, create a new one with the sum of clicks
		await db.userStats.create({
			data: {
				userId,
				date: startOfDay, // Save the full date with time
				views: 0, // Initialize with 0 views
				linkClicks: linkClicksTotal,
				buttonClicks: buttonClicksTotal
			}
		})
	}
}
