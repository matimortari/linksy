import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { useUserStore } from "../lib/store"

export default function useAuth() {
	const { data: session, status } = useSession()
	const setSlug = useUserStore((state) => state.setSlug)
	const setDescription = useUserStore((state) => state.setDescription)
	const setImage = useUserStore((state) => state.setImage)
	const setButtons = useUserStore((state) => state.setButtons)
	const setLinks = useUserStore((state) => state.setLinks)
	const setSettings = useUserStore((state) => state.setSettings)

	useEffect(() => {
		if (status === "unauthenticated" || !session?.user) {
			redirect("/login")
		}

		if (session?.user) {
			const { buttons, links, slug, description, image, settings } = session.user

			if (buttons) setButtons(buttons)
			if (links) setLinks(links)
			if (slug) setSlug(slug)
			if (description) setDescription(description)
			if (image) setImage(image)
			if (settings) setSettings(settings)
		}
	}, [session, status, setSlug, setDescription, setImage, setButtons, setLinks, setSettings])

	return { session, status }
}
