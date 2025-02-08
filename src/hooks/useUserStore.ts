import { create } from "zustand"

type UserStore = {
	slug: string
	description: string
	image: string
	buttons: Button[]
	links: Link[]
	settings: UserSettings | null
	setSlug: (slug: string) => void
	setDescription: (description: string) => void
	setImage: (image: string) => void
	setButtons: (buttons: Button[]) => void
	setLinks: (links: Link[]) => void
	setSettings: (settings: Partial<UserSettings>) => void
	setUserData: (userData: { slug: string; description: string; image: string }) => void
}

export const useUserStore = create<UserStore>((set) => ({
	slug: "",
	description: "",
	image: "",
	buttons: [],
	links: [],
	settings: null,

	setSlug: (slug) => set({ slug }),
	setDescription: (description) => set({ description }),
	setImage: (image) => set({ image }),
	setButtons: (buttons) => set({ buttons }),
	setLinks: (links) => set({ links }),

	setSettings: (settings) =>
		set((state) => ({
			settings: state.settings ? { ...state.settings, ...settings } : (settings as UserSettings)
		})),

	setUserData: ({ slug, description, image }) => set({ slug, description, image })
}))
