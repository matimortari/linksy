import { create } from "zustand"
import { defaultSettings } from "./utils"

type UserStore = {
	slug: string
	description: string
	image: string
	buttons: Button[]
	links: Link[]
	settings: UserSettings
	setSlug: (slug: string) => void
	setDescription: (description: string) => void
	setImage: (image: string) => void
	setButtons: (buttons: Button[]) => void
	setLinks: (links: Link[]) => void
	setSettings: (settings: Partial<UserSettings>) => void // Accept partial updates
}

export const useUserStore = create<UserStore>((set) => ({
	slug: "",
	description: "",
	image: "",
	buttons: [],
	links: [],
	settings: defaultSettings,
	setSlug: (slug) => set({ slug }),
	setDescription: (description) => set({ description }),
	setImage: (image) => set({ image }),
	setButtons: (buttons) => set({ buttons }),
	setLinks: (links) => set({ links }),
	setSettings: (settings) =>
		set((state) => ({
			settings: {
				...state.settings, // Preserve existing settings
				...settings // Merge new settings
			}
		}))
}))
