interface UserLink {
	url: string
	title: string
	clicks: number
}

interface UserButton {
	url: string
	platform: string
	icon: string
	clicks: number
}

interface Button {
	id: number
	url: string
	icon: string
	userId: string
	clicks: number
	createdAt: Date
	platform: string
}

interface Link {
	id: number
	title: string
	url: string
	userId: string
	clicks: number
	createdAt: Date
}

interface Settings {
	backgroundColor: string
	headerTextColor: string
	slugTextColor: string
	slugTextWeight: string
	slugTextSize: string
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
