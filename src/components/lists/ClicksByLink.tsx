import { useGetClicksByLink } from "@/src/hooks/useQueries"
import { formatDate } from "@/src/lib/utils"
import { Icon } from "@iconify/react"

export default function ClicksByLink() {
	const { data: items } = useGetClicksByLink()

	return (
		<ul className="grid grid-cols-1 gap-2 md:grid-cols-3">
			{items?.map((item) => (
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
