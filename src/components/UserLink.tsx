"use client"

import Link from "next/link"
import { useState } from "react"
import { trackClick } from "../services/analyticsService"

export default function UserLink({ url, title, settings, linkId, userId, shadowWeight }) {
	const [isHovered, setIsHovered] = useState(false)

	const shadowStyles = {
		none: "none",
		light: `0 2px 4px ${settings.linkShadowColor}`,
		medium: `0 4px 6px ${settings.linkShadowColor}`,
		heavy: `0 6px 10px ${settings.linkShadowColor}`
	}

	const handleClick = async () => {
		await trackClick(linkId, "link", userId)
	}

	return (
		<li className="flex flex-col items-center justify-center">
			<Link href={url} target="_blank" rel="noopener noreferrer">
				<button
					onClick={handleClick}
					className="min-w-32 max-w-72 text-center"
					style={{
						backgroundColor: isHovered ? settings.linkHoverBackgroundColor : settings.linkBackgroundColor,
						boxShadow: settings.isLinkShadow ? shadowStyles[shadowWeight] : "none",
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
			</Link>
		</li>
	)
}
