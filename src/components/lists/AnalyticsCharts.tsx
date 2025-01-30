import { useGetAnalytics, useGetUserData } from "@/src/hooks/useQueries"
import { formatDate } from "@/src/lib/utils"
import { Icon } from "@iconify/react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function AnalyticsCharts() {
	const { data: stats = [] } = useGetAnalytics()
	const { data: userData } = useGetUserData()

	const totalViews = stats.reduce((sum: any, entry: any) => sum + entry.views, 0)
	const totalClicks = stats.reduce((sum: any, entry: any) => sum + entry.linkClicks + entry.buttonClicks, 0)
	const conversionRate = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : "0"

	return (
		<div className="flex flex-col gap-2">
			<h3>Analytics Summary</h3>
			<h6 className="text-muted-foreground">Your Key Metrics.</h6>
			<div className="my-2 grid grid-cols-2 gap-4 md:grid-cols-4">
				<div className="flex flex-row items-center gap-2">
					<Icon icon="material-symbols:table-eye" className="size-6 text-accent" />
					<div className="flex flex-col items-start">
						<p className="text-xs text-muted-foreground">Total Page Views</p>
						<p className="font-semibold md:text-lg">{totalViews}</p>
					</div>
				</div>

				<div className="flex flex-row items-center gap-2">
					<Icon icon="material-symbols:ads-click" className="size-6 text-accent" />
					<div className="flex flex-col items-start">
						<p className="text-xs text-muted-foreground">Total Link Clicks</p>
						<p className="font-semibold md:text-lg">{totalClicks}</p>
					</div>
				</div>

				<div className="flex flex-row items-center gap-2">
					<Icon icon="material-symbols:percent" className="size-6 text-accent" />
					<div className="flex flex-col items-start">
						<p className="text-xs text-muted-foreground">Conversion Rate</p>
						<p className="font-semibold md:text-lg">{conversionRate}%</p>
					</div>
				</div>

				<div className="flex flex-row items-center gap-2">
					<Icon icon="material-symbols:calendar-month" className="size-6 text-accent" />
					<div className="flex flex-col items-start">
						<p className="text-xs text-muted-foreground">Joined On</p>
						<p className="font-semibold md:text-lg">{formatDate(userData?.createdAt)}</p>
					</div>
				</div>
			</div>

			<hr />

			<h3>Profile Views</h3>
			<h6 className="text-muted-foreground">Total views of your profile page over time.</h6>
			<ResponsiveContainer width="100%" height={200}>
				<BarChart data={stats} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
					<XAxis dataKey="date" className="text-xs" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="views" fill="#4b3e68" barSize={25} />
				</BarChart>
			</ResponsiveContainer>

			<hr />

			<div className="my-2 flex flex-col justify-between gap-2 md:flex-row">
				<div className="flex w-full flex-col gap-2">
					<h3 className="subtitle">Link Clicks</h3>
					<h6 className="text-muted-foreground">Total clicks on your links over time.</h6>
					<ResponsiveContainer width="100%" height={200}>
						<LineChart data={stats} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
							<XAxis dataKey="date" className="text-xs" />
							<YAxis />
							<Tooltip />
							<Line type="monotone" dataKey="linkClicks" stroke="#4b3e68" />
						</LineChart>
					</ResponsiveContainer>
				</div>

				<div className="flex w-full flex-col gap-2">
					<h3 className="subtitle">Button Clicks</h3>
					<h6 className="text-muted-foreground">Total clicks on your social buttons over time.</h6>
					<ResponsiveContainer width="100%" height={200}>
						<LineChart data={stats} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
							<XAxis dataKey="date" className="text-xs" />
							<YAxis />
							<Tooltip />
							<Line type="monotone" dataKey="buttonClicks" stroke="#4b3e68" />
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	)
}
