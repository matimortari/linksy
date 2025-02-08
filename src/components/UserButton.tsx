"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"
import { useState } from "react"
import { trackClick } from "../services/analyticsService"

export default function UserButton({ url, icon, settings, buttonId, userId, shadowWeight }) {
	const [isHovered, setIsHovered] = useState(false)

	const shadowStyles = {
		none: "none",
		light: `0 2px 4px ${settings.buttonShadowColor}`,
		medium: `0 4px 6px ${settings.buttonShadowColor}`,
		heavy: `0 6px 10px ${settings.buttonShadowColor}`
	}

	const handleClick = async () => {
		await trackClick(buttonId, "button", userId)
	}

	return (
		<li className="flex flex-row items-center justify-center">
			<Link href={url} target="_blank" rel="noopener noreferrer">
				<button
					onClick={handleClick}
					className="flex size-10 items-center justify-center rounded-full"
					style={{
						backgroundColor: isHovered ? settings.buttonHoverBackgroundColor : settings.buttonBackgroundColor,
						boxShadow: settings.isButtonShadow ? shadowStyles[shadowWeight] : "none",
						transition: "background-color 0.3s ease, box-shadow 0.3s ease"
					}}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					{icon && <Icon icon={icon} className="size-5" style={{ color: settings.buttonIconColor }} />}
				</button>
			</Link>
		</li>
	)
}
