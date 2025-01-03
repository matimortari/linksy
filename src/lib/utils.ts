import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "./auth"

// Helper function to generate a random slug (when user is created or manually generates a random slug)
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

// Helper function to format a date string
export function formatDate(dateString) {
	const date = new Date(dateString)
	const formattedDate = date.toLocaleDateString("en-US", {
		year: "2-digit",
		month: "short",
		day: "numeric"
	})

	return formattedDate.charAt(0).toLowerCase() + formattedDate.slice(1)
}

// Helper function to get the session or return an unauthorized JSON response
export async function getSessionOrUnauthorized() {
	const session = await getServerSession(authOptions)
	if (!session || !session.user) {
		return { error: true, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
	}

	return { error: false, session }
}
