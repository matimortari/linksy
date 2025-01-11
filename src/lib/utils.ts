import { SupportBanner } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "./auth"

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
