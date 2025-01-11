import { Icon } from "@iconify/react"
import { useState } from "react"

export default function UserButton({ url, icon, settings, buttonId, userId }) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<li className="flex flex-row items-center justify-center">
			<a href={url} target="_blank" rel="noopener noreferrer">
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
			</a>
		</li>
	)
}
