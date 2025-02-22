"use client"

import { Icon } from "@iconify/react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useUserStore } from "../hooks/useUserStore"
import UserButton from "./UserButton"
import UserLink from "./UserLink"

function HeaderBar() {
	return (
		<>
			<div className="absolute left-1/2 right-3 top-2 h-[6px] w-[80px] -translate-x-1/2 rounded-full bg-black" />
			<div className="absolute right-4 top-2 flex flex-row items-center gap-2 text-foreground">
				<Icon icon="mdi:signal" width={15} height={15} />
				<Icon icon="mdi:wifi" width={15} height={15} />
			</div>
		</>
	)
}

export default function Preview() {
	const { slug, description, image, settings, links, buttons } = useUserStore()
	const { data: session } = useSession()

	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsVisible(false)
			}
		}

		window.addEventListener("keydown", handleKeyDown)

		if (isVisible) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = ""
		}

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
			document.body.style.overflow = ""
		}
	}, [isVisible])

	const togglePreview = () => {
		setIsVisible((prev) => !prev)
	}

	const backgroundStyle =
		settings?.backgroundType === "GRADIENT"
			? {
					background: `linear-gradient(to bottom, ${settings?.backgroundGradientStart}, ${settings?.backgroundGradientEnd})`
			  }
			: { backgroundColor: settings?.backgroundColor }

	return (
		<div className="my-6 flex h-full max-h-[560px] flex-col items-center gap-2">
			{/* Preview toggle for mobile */}
			<button
				onClick={togglePreview}
				className={`btn fixed bottom-8 z-20 transform p-2 md:hidden ${isVisible ? "bg-card" : "bg-secondary"}`}
			>
				<Icon icon={isVisible ? "mdi:eye-off" : "mdi:eye"} width={20} height={20} />
				{isVisible ? "Close Preview" : "Preview"}
			</button>

			{/* Full-screen preview for mobile */}
			<div
				className={`fixed left-0 top-0 z-10 size-full bg-background transition-all duration-300 md:hidden ${
					isVisible ? "block" : "hidden"
				}`}
				style={backgroundStyle}
			>
				<div className="flex flex-col items-center justify-center gap-4 py-6 text-center">
					{image && (
						<Image
							src={image}
							alt={slug}
							width={80}
							height={80}
							style={{ borderRadius: settings?.profilePictureRadius }}
						/>
					)}
					<p
						style={{
							color: settings?.slugTextColor,
							fontWeight: settings?.slugTextWeight,
							fontSize: settings?.slugTextSize
						}}
					>
						@{slug}
					</p>
					{description && (
						<p
							style={{
								color: settings?.headerTextColor,
								fontWeight: settings?.headerTextWeight,
								fontSize: settings?.headerTextSize
							}}
						>
							{description}
						</p>
					)}
					{buttons.length > 0 ? (
						<ul className="my-2 flex flex-row justify-center gap-2">
							{buttons.map((b: Button) => (
								<UserButton
									key={b.id}
									url={b.url}
									icon={b.icon}
									buttonId={b.id}
									settings={settings}
									userId={session?.user.id}
								/>
							))}
						</ul>
					) : (
						<hr />
					)}
					{links.length > 0 ? (
						<ul className="space-y-4">
							{links.map((l: Link) => (
								<UserLink
									key={l.id}
									url={l.url}
									title={l.title}
									linkId={l.id}
									settings={settings}
									userId={session?.user.id}
								/>
							))}
						</ul>
					) : (
						<p className="text-center text-muted-foreground">No links yet.</p>
					)}
				</div>
			</div>

			{/* Desktop Preview */}
			<div
				className="popover preview-scrollbar relative m-2 hidden min-h-[480px] overflow-y-auto overflow-x-hidden md:block md:w-[300px]"
				style={backgroundStyle}
			>
				<HeaderBar />
				<div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
					{image && (
						<Image
							src={image}
							alt={slug}
							width={80}
							height={80}
							style={{ borderRadius: settings?.profilePictureRadius }}
						/>
					)}
					<p
						style={{
							color: settings?.slugTextColor,
							fontWeight: settings?.slugTextWeight,
							fontSize: settings?.slugTextSize
						}}
					>
						@{slug}
					</p>
					{description && (
						<p
							style={{
								color: settings?.headerTextColor,
								fontWeight: settings?.headerTextWeight,
								fontSize: settings?.headerTextSize
							}}
						>
							{description}
						</p>
					)}
					{buttons.length > 0 ? (
						<ul className="my-2 flex flex-row justify-center gap-2">
							{buttons.map((b: Button) => (
								<UserButton
									key={b.id}
									url={b.url}
									icon={b.icon}
									buttonId={b.id}
									settings={settings}
									userId={session?.user.id}
								/>
							))}
						</ul>
					) : (
						<hr />
					)}
					{links.length > 0 ? (
						<ul className="space-y-4">
							{links.map((l: Link) => (
								<UserLink
									key={l.id}
									url={l.url}
									title={l.title}
									linkId={l.id}
									settings={settings}
									userId={session?.user.id}
								/>
							))}
						</ul>
					) : (
						<p className="text-center text-muted-foreground">No links yet.</p>
					)}
				</div>
			</div>
		</div>
	)
}
