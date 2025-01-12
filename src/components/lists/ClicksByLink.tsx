import { useGetButtons, useGetLinks } from "@/src/hooks/useQueries"
import { Icon } from "@iconify/react"
import { useQuery } from "@tanstack/react-query"

async function getClicksByLink() {
	const { data: userLinks } = useGetLinks()
	const { data: userButtons } = useGetButtons()

	// Combine links & buttons into a single array with a type identifier
	const combinedItems = [
		...userLinks.map((link: Link) => ({ ...link, type: "link" })),
		...userButtons.map((button: Button) => ({ ...button, type: "button" }))
	]

	return combinedItems
}

export default function ClicksByLink() {
	const { data } = useQuery({ queryKey: ["getClicksByLink"], queryFn: getClicksByLink })

	return (
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
						<p className="text-xs text-muted-foreground">Created at {item.createdAt}</p>
					</div>
				</li>
			))}
		</ul>
	)
}
