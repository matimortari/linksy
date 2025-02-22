"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"
import { useState } from "react"
import { trackClick } from "../services/analyticsService"

export default function UserButton({ url, icon, settings, buttonId, userId }) {
	const [isHovered, setIsHovered] = useState(false)

	const shadowStyles = {
		none: "none",
		light: `0px 1px 2px ${settings.buttonShadowColor}`,
		medium: `0 2px 6px ${settings.buttonShadowColor}`,
		heavy: `1px 3px 10px ${settings.buttonShadowColor}`
	}

	const handleClick = async () => {
		await trackClick(buttonId, "button", userId)
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
			<Link href={url} target="_blank" rel="noopener noreferrer">
				<button onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
					{icon && <Icon icon={icon} width={20} height={20} style={{ color: settings.buttonIconColor }} />}
				</button>
			</Link>
		</li>
	)
}
