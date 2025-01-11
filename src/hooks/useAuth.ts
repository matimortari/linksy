import { defaultSettings } from "@/src/lib/utils"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function useAuth() {
	const { data: session, status } = useSession()
	const [buttons, setButtons] = useState<Button[]>([])
	const [links, setLinks] = useState<Link[]>([])
	const [slug, setSlug] = useState("")
	const [description, setDescription] = useState("")
	const [image, setImage] = useState("")
	const [settings, setSettings] = useState<Settings>(defaultSettings)

	useEffect(() => {
		if (status === "unauthenticated" || !session?.user) {
			redirect("/login")
		}

		const { buttons, links, slug, description, image, settings } = session.user

		if (buttons) setButtons(buttons)
		if (links) setLinks(links)
		if (slug) setSlug(slug)
		if (description) setDescription(description)
		if (image) setImage(image)
		if (settings) setSettings(settings)
	}, [session, status])

	return {
		buttons,
		links,
		slug,
		description,
		image,
		settings,
		setSlug,
		setButtons,
		setLinks,
		setDescription,
		setSettings
	}
}
