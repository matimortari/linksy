"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"
import { useState } from "react"
import { trackClick } from "../services/analyticsService"

export default function UserLink({ url, title, settings, linkId, userId }) {
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

	const handleCopy = () => {
		navigator.clipboard.writeText(url).then(() => {
			alert("Link copied to clipboard!")
		})
	}

	return (
		<li className="flex flex-col items-center justify-center gap-4">
			<div
				className="relative flex min-w-32 max-w-72 items-center justify-between px-4 text-center"
				style={{
					backgroundColor: isHovered ? settings.linkHoverBackgroundColor : settings.linkBackgroundColor,
					boxShadow: settings.isLinkShadow ? shadowStyles[settings.linkShadowWeight] : "none",
					borderRadius: settings.linkBorderRadius,
					padding: settings.linkPadding,
					transition: "background-color 0.3s ease, box-shadow 0.3s ease"
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<Link href={url} target="_blank" rel="noopener noreferrer">
					<button onClick={handleClick}>
						<p style={{ color: settings.linkTextColor }}>{title}</p>
					</button>
				</Link>

				{settings?.showCopyButton && (
					<button onClick={handleCopy} className="ml-4">
						<Icon icon="mdi:content-copy" style={{ color: settings.linkTextColor }} />
					</button>
				)}
			</div>
		</li>
	)
}
