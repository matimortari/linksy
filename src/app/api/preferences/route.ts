import { db } from "@/src/lib/db"
import { defaultSettings, getSessionOrUnauthorized } from "@/src/lib/utils"
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

	const updatedSettings = await db.userSettings.update({
		where: { userId: session.user.id },
		data: Object.keys(settingsData).length === 0 ? defaultSettings : { ...currentSettings, ...settingsData }
	})

	const message = Object.keys(settingsData).length === 0 ? "Settings reset to default" : "Settings updated successfully"

	return NextResponse.json({ message, settings: updatedSettings }, { status: 200 })
}
