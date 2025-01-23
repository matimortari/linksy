interface User {
	id: string
	name: string
	email: string
}

interface Link {
	id?: number
	url: string
	title: string
}

interface Button {
	id?: number
	url: string
	platform: string
	icon: string
}

interface UserSettings {
	backgroundColor: string
	slugTextColor: string
	slugTextWeight: string
	slugTextSize: string
	headerTextColor: string
	linkBackgroundColor: string
	linkTextColor: string
	linkShadowColor: string
	isLinkShadow: boolean
	linkHoverBackgroundColor: string
	linkBorderRadius: string
	linkPadding: string
	buttonBackgroundColor: string
	buttonShadowColor: string
	isButtonShadow: boolean
	buttonIconColor: string
	buttonHoverBackgroundColor: string
	supportBanner: string
}

interface UserStats {
	id: number
	userId: string
	date: Date
	views: number
	linkClicks: number
	buttonClicks: number
}

interface ButtonFormData {
	platform: string
	url: string
}

interface LinkFormData {
	title: string
	url: string
}

interface SettingsFormData {
	backgroundColor: string
	slugTextColor: string
	headerTextColor: string
	slugTextSize: string
	slugTextWeight: string
	buttonBackgroundColor: string
	buttonIconColor: string
	buttonHoverBackgroundColor: string
	isButtonShadow: boolean
	buttonShadowColor: string
	linkBackgroundColor: string
	linkTextColor: string
	linkHoverBackgroundColor: string
	isLinkShadow: boolean
	linkShadowColor: string
	linkBorderRadius: string
	linkPadding: string
}

interface SupportBannerFormData {
	supportBanner: string
}
