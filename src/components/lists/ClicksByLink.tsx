"use client"

import { getButtons, getLinks } from "@/src/lib/actions"
import { formatDate } from "@/src/lib/utils"
import { Icon } from "@iconify/react"
import { useQuery } from "@tanstack/react-query"

// Combine links and buttons data and fetch them together
async function fetchClicksByLink() {
	const links = await getLinks()
	const buttons = await getButtons()

	// Combine both the links and buttons into a single array with a type identifier
	const combinedItems = [
		...links.map((link) => ({ ...link, type: "link" })),
		...buttons.map((button) => ({ ...button, type: "button" }))
	]

	return combinedItems
}

export default function ClicksByLink() {
	const { data, isPending } = useQuery({
		queryKey: ["clicksByLink"],
		queryFn: fetchClicksByLink
	})

	if (isPending) return <p className="description-label text-muted-foreground">Loading clicks by link...</p>

	return (
		<>
			<ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
				{data?.map((item) => (
					<li key={item.url} className="card">
						{item.type === "link" ? (
							<div className="flex flex-row items-center gap-1 pb-2">
								<p className="font-semibold text-muted-foreground">{item.title}</p>
								<p className="font-semibold"> - {item.clicks} clicks</p>
							</div>
						) : (
							<div className="flex flex-row items-center gap-1 pb-2">
								{item.icon && <Icon icon={item.icon} className="size-5 text-muted-foreground" />}
								<p className="font-semibold text-muted-foreground">{item.platform}</p>
								<p className="font-semibold"> - {item.clicks} clicks</p>
							</div>
						)}
						<div className="flex flex-col">
							<p className="text-xs text-muted-foreground">{item.url}</p>
							<p className="text-xs text-muted-foreground">Created at {formatDate(item.createdAt)}</p>
						</div>
					</li>
				))}
			</ul>
		</>
	)
}
