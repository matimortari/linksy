"use client"

import { carouselPresets } from "@/src/config/carouselPresets"
import { Icon } from "@iconify/react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

function CarouselLink({ title, settings }) {
	const [isHovered, setIsHovered] = useState(false)

	const shadowStyles = {
		none: "none",
		light: `0 2px 4px ${settings.linkShadowColor}`,
		medium: `0 4px 6px ${settings.linkShadowColor}`,
		heavy: `0 6px 10px ${settings.linkShadowColor}`
	}

	return (
		<li
			className="flex w-full min-w-32 max-w-72 flex-row items-center justify-center text-center"
			style={{
				backgroundColor: isHovered ? settings.linkHoverBackgroundColor : settings.linkBackgroundColor,
				boxShadow: settings.isLinkShadow ? shadowStyles[settings.linkShadowWeight] : "none",
				borderRadius: settings.linkBorderRadius,
				padding: settings.linkPadding,
				transition: "background-color 0.3s ease, box-shadow 0.3s ease"
			}}
		>
			<button onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
				<span
					style={{
						color: settings.linkTextColor,
						fontWeight: settings?.linkTextWeight,
						fontSize: settings?.linkTextSize
					}}
				>
					{title}
				</span>
			</button>
		</li>
	)
}

function CarouselButton({ icon, settings }) {
	const [isHovered, setIsHovered] = useState(false)

	const shadowStyles = {
		none: "none",
		light: `0 2px 4px ${settings.buttonShadowColor}`,
		medium: `0 4px 6px ${settings.buttonShadowColor}`,
		heavy: `0 6px 10px ${settings.buttonShadowColor}`
	}

	return (
		<li
			className="flex size-10 items-center justify-center rounded-full"
			style={{
				backgroundColor: isHovered ? settings.buttonHoverBackgroundColor : settings.buttonBackgroundColor,
				boxShadow: settings.isButtonShadow ? shadowStyles[settings.buttonShadowWeight] : "none",
				transition: "background-color 0.3s ease, box-shadow 0.3s ease"
			}}
		>
			<button onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
				<Icon icon={icon} width={20} height={20} style={{ color: settings.buttonIconColor }} />
			</button>
		</li>
	)
}

function CarouselCard({ presetId = 0 }) {
	const { description, links, image, buttons, slug, settings } = carouselPresets[presetId]

	const backgroundStyle =
		settings?.backgroundType === "GRADIENT"
			? {
					background: `linear-gradient(to bottom, ${settings?.backgroundGradientStart}, ${settings?.backgroundGradientEnd})`
			  }
			: { backgroundColor: settings?.backgroundColor }

	return (
		<div className="popover relative w-64 md:w-[300px]" style={backgroundStyle}>
			<div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
				<Image src={image} alt={slug} width={80} height={80} style={{ borderRadius: settings?.profilePictureRadius }} />
				<p
					style={{
						color: settings.slugTextColor,
						fontWeight: settings.slugTextWeight,
						fontSize: settings.slugTextSize
					}}
				>
					@{slug}
				</p>
				<p
					style={{
						color: settings?.headerTextColor,
						fontWeight: settings?.headerTextWeight,
						fontSize: settings?.headerTextSize
					}}
				>
					{description}
				</p>
				<ul className="my-2 flex flex-row items-center justify-center gap-2">
					{buttons.map((button) => (
						<CarouselButton key={button.id} icon={button.icon} settings={settings} />
					))}
				</ul>
				<ul className="flex flex-col items-center space-y-4 overflow-auto">
					{links.map((link) => (
						<CarouselLink key={link.id} title={link.title} settings={settings} />
					))}
				</ul>
			</div>
		</div>
	)
}

export default function Carousel() {
	const [currentIndex, setCurrentIndex] = useState(0)

	const nextCard = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselPresets.length)
	}

	useEffect(() => {
		const intervalId = setInterval(nextCard, 3000)
		return () => clearInterval(intervalId)
	}, [])

	return (
		<div className="animate-float relative my-4 flex h-[480px] select-none items-center justify-center">
			<AnimatePresence mode="wait">
				<motion.div
					key={currentIndex}
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -50 }}
					transition={{ duration: 0.5 }}
				>
					<CarouselCard presetId={currentIndex} />
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
