"use client"

import { previewPresets } from "@/src/data/previewPresets"
import { Icon } from "@iconify/react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

function CarouselLink({ title, settings }) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<li className="flex flex-col items-center justify-center">
			<button
				tabIndex={0}
				className="min-w-32 max-w-72 text-center"
				style={{
					backgroundColor: isHovered ? settings.linkHoverBackgroundColor : settings.linkBackgroundColor,
					boxShadow: settings.isLinkShadow ? `0 4px 6px ${settings.linkShadowColor}` : "none",
					borderRadius: settings.linkBorderRadius,
					padding: settings.linkPadding,
					transition: "background-color 0.3s ease, box-shadow 0.3s ease"
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<p className="truncate font-medium" style={{ color: settings.linkTextColor }}>
					{title}
				</p>
			</button>
		</li>
	)
}

function CarouselButton({ icon, settings }) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<li className="flex flex-row items-center justify-center">
			<button
				tabIndex={0}
				className="flex size-10 cursor-pointer items-center justify-center rounded-full"
				style={{
					backgroundColor: isHovered ? settings.buttonHoverBackgroundColor : settings.buttonBackgroundColor,
					boxShadow: settings.isButtonShadow ? `0 4px 6px ${settings.buttonShadowColor}` : "none",
					transition: "background-color 0.3s ease, box-shadow 0.3s ease"
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{icon && <Icon icon={icon} className="size-5" style={{ color: settings.buttonIconColor }} />}
			</button>
		</li>
	)
}

function CarouselCard({ presetId = 0 }) {
	const { description, links, image, buttons, slug, settings } = previewPresets[presetId]

	return (
		<div className="rounded-2xl border shadow-xl">
			<div className="relative w-64 rounded-2xl md:w-[300px]">
				<div
					className="relative grid place-content-center rounded-2xl px-4 py-2"
					style={{
						backgroundColor: settings.backgroundColor
					}}
				>
					<div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
						<Image src={image} alt={slug} width={100} height={100} className="icon rounded-full" />
						<p
							className="text-center"
							style={{
								color: settings.slugTextColor,
								fontWeight: settings.slugTextWeight,
								fontSize: settings.slugTextSize
							}}
						>
							@{slug}
						</p>
						<p className="text-center" style={{ color: settings.headerTextColor }}>
							{description}
						</p>

						<ul className="my-2 flex flex-row justify-center gap-2">
							{buttons.map((button) => (
								<CarouselButton key={button.id} icon={button.icon} settings={settings} />
							))}
						</ul>

						<hr />

						<ul className="space-y-4 overflow-auto">
							{links.map((link) => (
								<CarouselLink key={link.id} title={link.title} settings={settings} />
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function Carousel() {
	const [currentIndex, setCurrentIndex] = useState(0)

	const nextCard = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % previewPresets.length)
	}

	useEffect(() => {
		const intervalId = setInterval(nextCard, 3000)
		return () => clearInterval(intervalId)
	}, [])

	return (
		<div className="animate-float relative flex h-[480px] select-none items-center justify-center">
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
