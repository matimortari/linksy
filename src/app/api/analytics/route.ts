import { db } from "@/src/lib/db"
import { getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

// GET method for getting user analytics data
export async function GET() {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const analyticsData = await db.userStats.findMany({ where: { userId: session.user.id } })
	if (!analyticsData) {
		return NextResponse.json({ error: "Analytics data not found" }, { status: 404 })
	}

	return NextResponse.json(analyticsData, { status: 200 })
}

// POST method for processing link and button clicks
export async function POST(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	try {
		const { type, id } = await req.json()

		if (!type || !id) {
			return NextResponse.json({ error: "Invalid request. 'type' and 'id' are required." }, { status: 400 })
		}

		// Tracking link clicks
		if (type === "link") {
			const userLink = await db.userLink.findUnique({ where: { id: id } })
			if (!userLink) {
				return NextResponse.json({ error: "Link not found" }, { status: 404 })
			}

			// Create or update LinkClick record
			const today = new Date()
			const existingLinkClick = await db.linkClick.findFirst({
				where: {
					userLinkId: userLink.id,
					date: {
						gte: new Date(today.setHours(0, 0, 0, 0)), // Reset to start of today
						lt: new Date(today.setHours(23, 59, 59, 999)) // Set to end of today
					}
				}
			})

			if (existingLinkClick) {
				await db.linkClick.update({
					where: { id: existingLinkClick.id },
					data: { count: { increment: 1 } }
				})
			} else {
				await db.linkClick.create({
					data: {
						userLinkId: userLink.id,
						date: new Date(),
						count: 1
					}
				})
			}

			// Update total link clicks in UserStats and UserLink
			await db.userStats.update({
				where: { userId_date: { userId: session.user.id, date: new Date().toISOString().split("T")[0] } },
				data: { linkClicks: { increment: 1 } }
			})

			await db.userLink.update({
				where: { id: userLink.id },
				data: { clicks: { increment: 1 } }
			})

			// Tracking button clicks
		} else if (type === "button") {
			const userButton = await db.userButton.findUnique({ where: { id: id } })
			if (!userButton) {
				return NextResponse.json({ error: "Button not found" }, { status: 404 })
			}

			// Create or update ButtonClick record
			const today = new Date()
			const existingButtonClick = await db.buttonClick.findFirst({
				where: {
					userButtonId: userButton.id,
					date: {
						gte: new Date(today.setHours(0, 0, 0, 0)),
						lt: new Date(today.setHours(23, 59, 59, 999))
					}
				}
			})

			if (existingButtonClick) {
				await db.buttonClick.update({
					where: { id: existingButtonClick.id },
					data: { count: { increment: 1 } }
				})
			} else {
				await db.buttonClick.create({
					data: {
						userButtonId: userButton.id,
						date: new Date(),
						count: 1
					}
				})
			}

			// Update total button clicks in UserStats and UserButton
			await db.userStats.update({
				where: { userId_date: { userId: session.user.id, date: new Date().toISOString().split("T")[0] } },
				data: { buttonClicks: { increment: 1 } }
			})

			await db.userButton.update({
				where: { id: userButton.id },
				data: { clicks: { increment: 1 } }
			})
		} else {
			return NextResponse.json({ error: "Invalid type. Must be 'link' or 'button'." }, { status: 400 })
		}

		return NextResponse.json({ success: true }, { status: 200 })
	} catch (error) {
		console.error("Error processing click:", error)
		return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
	}
}
