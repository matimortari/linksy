import { db } from "@/src/lib/db"
import { getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

// GET method for getting user links
export async function GET() {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const userLinks = await db.userLink.findMany({ where: { userId: session.user.id } })
	if (!userLinks) {
		return NextResponse.json({ error: "User Links not found" }, { status: 404 })
	}

	return NextResponse.json(userLinks, { status: 200 })
}

// POST method for creating a new user link
export async function POST(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const { title, url } = await req.json()
	if (!title || !url) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

	const newLink = await db.userLink.create({ data: { title, url, userId: session.user.id } })

	return NextResponse.json(newLink)
}

// PUT method for updating a user link
export async function PUT(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const { id, title, url } = await req.json()

	const existingLink = await db.userLink.findUnique({ where: { id } })
	if (!existingLink || existingLink.userId !== session.user.id) {
		return NextResponse.json({ error: "Link not found" }, { status: 404 })
	}

	const updatedLink = await db.userLink.update({ where: { id }, data: { title, url } })

	return NextResponse.json(updatedLink)
}

// DELETE method for deleting a user link
export async function DELETE(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const id = req.nextUrl.searchParams.get("id")
	if (!id) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

	const existingLink = await db.userLink.findUnique({ where: { id: Number(id) } })
	if (!existingLink || existingLink.userId !== session.user.id) {
		return NextResponse.json({ error: "Link not found" }, { status: 404 })
	}

	await db.userLink.delete({ where: { id: Number(id) } })

	return NextResponse.json({ id })
}
