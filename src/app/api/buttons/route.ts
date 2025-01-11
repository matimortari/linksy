import { db } from "@/src/lib/db"
import { getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

// GET method for getting user social buttons
export async function GET() {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const userButtons = await db.userButton.findMany({ where: { userId: session.user.id } })
	if (!userButtons) {
		return NextResponse.json({ error: "User Social Buttons not found" }, { status: 404 })
	}

	return NextResponse.json(userButtons, { status: 200 })
}

// POST method for creating a new user social button
export async function POST(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const { platform, url, icon } = await req.json()
	if (!platform || !url || !icon) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

	const newButton = await db.userButton.create({ data: { platform, url, icon, userId: session.user.id } })

	return NextResponse.json(newButton)
}

// DELETE method for deleting a user social button
export async function DELETE(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const id = req.nextUrl.searchParams.get("id")
	if (!id) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

	const existingButton = await db.userButton.findUnique({ where: { id: Number(id) } })
	if (!existingButton || existingButton.userId !== session.user.id) {
		return NextResponse.json({ error: "Social button not found" }, { status: 404 })
	}

	await db.userButton.delete({ where: { id: Number(id) } })

	return NextResponse.json({ id })
}
