import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { defaultSettings } from "../data/userSettings"

export default function useUser() {
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
		} else {
			if (session?.user) {
				const {
					buttons: sessionButtons,
					links: sessionLinks,
					slug: sessionSlug,
					description: sessionDescription,
					image: sessionImage,
					settings: sessionSettings
				} = session.user

				// Set buttons and links based on the session data
				if (sessionButtons) setButtons(sessionButtons)
				if (sessionLinks) setLinks(sessionLinks)
				if (sessionSlug) setSlug(sessionSlug)
				if (sessionDescription) setDescription(sessionDescription)
				if (sessionImage) setImage(sessionImage)
				if (sessionSettings)
					setSettings((prevSettings) => ({
						...prevSettings,
						...sessionSettings
					}))
			}
		}
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
