import { db } from "@/src/lib/db"
import { getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

// GET method for getting user settings
export async function GET() {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const settings = await db.userSettings.findUnique({ where: { userId: session.user.id } })
	if (!settings) {
		return NextResponse.json({ error: "Settings not found" }, { status: 404 })
	}

	return NextResponse.json(settings, { status: 200 })
}

// PUT method for updating user settings or resetting to default
export async function PUT(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const settingsData = await req.json()

	const currentSettings = await db.userSettings.findUnique({ where: { userId: session.user.id } })
	if (!currentSettings) {
		return NextResponse.json({ error: "User settings not found" }, { status: 404 })
	}

	// Reset by deleting and recreating the settings
	if (Object.keys(settingsData).length === 0) {
		await db.userSettings.delete({ where: { userId: session.user.id } })
		const newSettings = await db.userSettings.create({ data: { userId: session.user.id } })

		return NextResponse.json({ message: "Settings reset to default", settings: newSettings }, { status: 200 })
	}

	const updatedSettings = await db.userSettings.update({
		where: { userId: session.user.id },
		data: settingsData
	})

	return NextResponse.json({ message: "Settings updated successfully", settings: updatedSettings }, { status: 200 })
}
