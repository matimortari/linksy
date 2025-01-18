import { previewPresets } from "@/src/data/previewPresets"
import { Icon } from "@iconify/react"
import Image from "next/image"
import { useState } from "react"

function CarouselLink({ title, settings }) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<li className="flex flex-col items-center justify-center">
			<div
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
			</div>
		</li>
	)
}

function CarouselButton({ icon, settings }) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<li className="flex flex-row items-center justify-center">
			<div
				className="flex size-10 items-center justify-center rounded-full"
				style={{
					backgroundColor: isHovered ? settings.buttonHoverBackgroundColor : settings.buttonBackgroundColor,
					boxShadow: settings.isButtonShadow ? `0 4px 6px ${settings.buttonShadowColor}` : "none",
					transition: "background-color 0.3s ease, box-shadow 0.3s ease"
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{icon && <Icon icon={icon} className="size-5" style={{ color: settings.buttonIconColor }} />}
			</div>
		</li>
	)
}

export default function CarouselPreview({ presetId = 0 }) {
	const { description, links, image, buttons, slug, settings } = previewPresets[presetId]

	return (
		<div className="rounded-2xl shadow-xl">
			<div
				className="hide-scrollbar relative h-[450px] w-64 rounded-2xl md:w-[300px]"
				style={{
					WebkitOverflowScrolling: "touch",
					overflowY: "scroll"
				}}
			>
				<div
					className="relative grid place-content-center overflow-hidden rounded-2xl px-4 py-2"
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
