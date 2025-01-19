import { useGetAnalytics } from "@/src/hooks/useQueries"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function AnalyticsCharts() {
	const { data: stats = [] } = useGetAnalytics()

	const totalViews = stats.reduce((sum: any, entry: any) => sum + entry.views, 0)
	const totalClicks = stats.reduce((sum: any, entry: any) => sum + entry.linkClicks + entry.buttonClicks, 0)

	const conversionRate = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : "0"

	return (
		<div className="flex flex-col gap-2">
			<h3>Analytics Summary</h3>
			<h6 className="text-muted-foreground">Your Key Metrics.</h6>
			<div className="mx-12 mb-4 flex flex-col items-center justify-between gap-2 md:flex-row">
				<div className="card flex flex-col text-center">
					<p className="whitespace-nowrap font-semibold text-muted-foreground">Total Page Views</p>
					<p className="text-2xl font-semibold">{totalViews}</p>
				</div>

				<div className="card flex flex-col text-center">
					<p className="whitespace-nowrap font-semibold text-muted-foreground">Total Link Clicks</p>
					<p className="text-2xl font-semibold">{totalClicks}</p>
				</div>

				<div className="card flex flex-col text-center">
					<p className="whitespace-nowrap font-semibold text-muted-foreground">Conversion Rate</p>
					<p className="text-2xl font-semibold text-primary">{conversionRate}%</p>
				</div>
			</div>

			<h3>Profile Views</h3>
			<h6 className="text-muted-foreground">Total views of your profile page over time.</h6>
			<ResponsiveContainer width="100%" height={200} className="card">
				<LineChart data={stats} margin={{ top: 20, right: 20, left: 0, bottom: 10 }} className="text-xs">
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" className="text-xs" />
					<YAxis />
					<Tooltip />
					<Line type="monotone" dataKey="views" stroke="#41a490" activeDot={{ r: 8 }} />
				</LineChart>
			</ResponsiveContainer>

			<div className="flex flex-col justify-between gap-2 md:flex-row">
				<div className="flex w-full flex-col gap-2">
					<h3 className="subtitle">Link Clicks</h3>
					<h6 className="text-muted-foreground">Total clicks on your links over time.</h6>
					<ResponsiveContainer width="100%" height={200} className="card">
						<BarChart data={stats} margin={{ top: 20, right: 20, left: 0, bottom: 10 }} className="text-xs">
							<XAxis dataKey="date" className="text-xs" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="linkClicks" fill="#4b3e68" barSize={25} />
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className="flex w-full flex-col gap-2">
					<h3 className="subtitle">Button Clicks</h3>
					<h6 className="text-muted-foreground">Total clicks on your social buttons over time.</h6>
					<ResponsiveContainer width="100%" height={200} className="card">
						<BarChart data={stats} margin={{ top: 20, right: 20, left: 0, bottom: 10 }} className="text-xs">
							<XAxis dataKey="date" className="text-xs" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="buttonClicks" fill="#9863a2" barSize={25} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	)
}
