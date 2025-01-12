"use client"

import { formatDate } from "@/src/lib/utils"
import { getButtons } from "@/src/services/buttonsService"
import { getLinks } from "@/src/services/linksService"
import { Icon } from "@iconify/react"
import { useQuery } from "@tanstack/react-query"

// Combine links and buttons data and fetch them together
async function getClicksByLink() {
	const links = await getLinks()
	const buttons = await getButtons()

	// Combine both the links and buttons into a single array with a type identifier
	const combinedItems = [
		...links.map((link: Link) => ({ ...link, type: "link" })),
		...buttons.map((button: Button) => ({ ...button, type: "button" }))
	]

	return combinedItems
}

export default function ClicksByLink() {
	const { data } = useQuery({ queryKey: ["getClicksByLink"], queryFn: getClicksByLink })

	return (
		<ul className="grid grid-cols-1 gap-2 md:grid-cols-3">
			{data?.map((item) => (
				<li key={item.url} className="card gap-2">
					{item.type === "link" ? (
						<div className="flex flex-row items-center gap-1">
							<p className="font-semibold text-muted-foreground">{item.title}</p>
							<p className="font-semibold"> - {item.clicks} clicks</p>
						</div>
					) : (
						<div className="flex flex-row items-center gap-1">
							{item.icon && <Icon icon={item.icon} className="size-5 text-muted-foreground" />}
							<p className="font-semibold text-muted-foreground">{item.platform}</p>
							<p className="font-semibold"> - {item.clicks} clicks</p>
						</div>
					)}

					<div className="flex flex-col gap-1">
						<span className="text-xs text-muted-foreground">{item.url}</span>
						<span className="text-xs text-muted-foreground">Created at {formatDate(item.createdAt)}</span>
					</div>
				</li>
			))}
		</ul>
	)
}
