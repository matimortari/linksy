import { bannerDescriptions, bannerIcons, bannerLinks, bannerMessages, bannerStyles } from "@/src/data/bannerSettings"
import { Icon } from "@iconify/react"

export default function SupportBanner({ bannerType }) {
	const message = bannerMessages[bannerType]
	const description = bannerDescriptions[bannerType]
	const styleClass = bannerStyles[bannerType]

	const getBannerLink = (type) => {
		const linkObject = bannerLinks[type]
		return linkObject
	}

	return (
		<div
			className={`banner-container ${styleClass} fixed bottom-0 z-50 flex w-screen items-center justify-between px-8 py-4 text-white`}
		>
			<div className="flex items-center gap-4 text-start text-sm">
				<Icon icon={bannerIcons[bannerType]} className="icon size-10 text-white" />
				<div>
					<h4 className="font-bold">{message}</h4>
					<p>{description}</p>
				</div>
			</div>

			<div>
				<a
					href={getBannerLink(bannerType)}
					className="btn bg-white font-bold text-gray-800"
					target="_blank"
					rel="noopener noreferrer"
				>
					ACT NOW
				</a>
			</div>
		</div>
	)
}
