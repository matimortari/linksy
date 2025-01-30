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
	// Extract data from the request
	const { type, id } = await req.json()

	if (type === "link") {
		try {
			// Create a new LinkClick entry for every link click with the current date
			const linkClick = await db.linkClick.create({
				data: {
					userLinkId: id,
					date: new Date()
				}
			})

			// Increment the click count in userLink
			await db.userLink.update({
				where: { id },
				data: { clicks: { increment: 1 } }
			})

			return NextResponse.json(linkClick, { status: 200 })
		} catch (error) {
			console.error("Error creating link click:", error)
			return NextResponse.json({ error: "Failed to create link click" }, { status: 500 })
		}
	} else if (type === "button") {
		try {
			// Create a new ButtonClick entry for every button click with the current date
			const buttonClick = await db.buttonClick.create({
				data: {
					userButtonId: id,
					date: new Date()
				}
			})

			// Increment the click count in userButton
			await db.userButton.update({
				where: { id },
				data: { clicks: { increment: 1 } }
			})

			return NextResponse.json(buttonClick, { status: 200 })
		} catch (error) {
			console.error("Error creating button click:", error)
			return NextResponse.json({ error: "Failed to create button click" }, { status: 500 })
		}
	} else {
		return NextResponse.json({ error: "Invalid type" }, { status: 400 })
	}
}
