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
	backgroundType: string
	backgroundGradientStart: string
	backgroundGradientEnd: string
	profilePictureRadius: string
	slugTextColor: string
	slugTextWeight: string
	slugTextSize: string
	headerTextColor: string
	headerTextWeight: string
	headerTextSize: string
	linkBackgroundColor: string
	linkTextColor: string
	isLinkShadow: boolean
	linkShadowColor: string
	linkShadowWeight: string
	linkHoverBackgroundColor: string
	linkBorderRadius: string
	linkPadding: string
	buttonBackgroundColor: string
	isButtonShadow: boolean
	buttonShadowColor: string
	buttonShadowWeight: string
	buttonIconColor: string
	buttonHoverBackgroundColor: string
	showCopyButton: boolean
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

interface UserFormData {
	slug: string
	description: string
	image: string
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
	backgroundType: string
	backgroundGradientStart: string
	backgroundGradientEnd: string
	profilePictureRadius: string
	slugTextColor: string
	slugTextWeight: string
	slugTextSize: string
	headerTextColor: string
	headerTextWeight: string
	headerTextSize: string
	linkBackgroundColor: string
	linkTextColor: string
	isLinkShadow: boolean
	linkShadowColor: string
	linkShadowWeight: string
	linkHoverBackgroundColor: string
	linkBorderRadius: string
	linkPadding: string
	buttonBackgroundColor: string
	isButtonShadow: boolean
	buttonShadowColor: string
	buttonShadowWeight: string
	buttonIconColor: string
	buttonHoverBackgroundColor: string
	showCopyButton: boolean
	supportBanner: string
}

interface SupportBannerFormData {
	supportBanner: string
}
