import { getAnalytics } from "@/src/lib/analytics"
import { useQuery } from "@tanstack/react-query"

export default function AnalyticsSummary() {
	const { data: stats, isPending } = useQuery({ queryKey: ["analytics"], queryFn: getAnalytics })

	if (isPending) return <p className="description-label text-muted-foreground">Loading analytics...</p>

	const totalViews = stats.reduce((sum, entry) => sum + entry.views, 0)
	const totalClicks = stats.reduce((sum, entry) => sum + entry.linkClicks + entry.buttonClicks, 0)
	const conversionRate = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : 0

	return (
		<div className="card">
			<div className="flex flex-row items-center justify-between gap-2">
				<div className="card flex flex-col text-center">
					<p className="description-label">Total Page Views</p>
					<p className="text-2xl font-semibold">{totalViews}</p>
				</div>

				<div className="card flex flex-col text-center">
					<p className="description-label">Total Link Clicks</p>
					<p className="text-2xl font-semibold">{totalClicks}</p>
				</div>

				<div className="card flex flex-col text-center">
					<p className="description-label">Conversion Rate</p>
					<p className="text-2xl font-semibold text-primary">{conversionRate}%</p>
				</div>
			</div>
		</div>
	)
}
