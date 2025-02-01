import { useGetAnalytics, useGetUserData } from "@/src/hooks/useQueries"
import { formatDate } from "@/src/lib/utils"
import { Icon } from "@iconify/react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function AnalyticsCharts() {
	const { data: stats = [] } = useGetAnalytics()
	const { data: userData } = useGetUserData()

	// Calculate total views and total clicks (sum of linkClicks and buttonClicks)
	const totalViews = stats.reduce((sum: any, entry: any) => sum + entry.views, 0)
	const totalClicks = stats.reduce((sum: any, entry: any) => sum + entry.linkClicks + entry.buttonClicks, 0)

	// Calculate Click Rate
	const clickRate = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : "0"

	const hasEnoughData = stats.length > 1 // Checks if there is more than one data point

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
						<p className="text-xs text-muted-foreground">Click Rate</p>
						<p className="font-semibold md:text-lg">{clickRate}%</p>
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
			{totalViews === 0 || !hasEnoughData ? (
				<div className="card my-1 text-center font-semibold text-muted-foreground">
					{totalViews === 0 ? "Not enough data yet." : "Only one data point available."}
				</div>
			) : (
				<ResponsiveContainer height={200}>
					<BarChart data={stats} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
						<XAxis dataKey="date" className="text-xs" />
						<YAxis className="text-xs" />
						<Tooltip
							wrapperClassName="popover text-xs"
							labelClassName="text-foreground font-semibold"
							contentStyle={{ backgroundColor: "var(--background)", border: "none" }}
						/>
						<Bar dataKey="views" fill="#31589c" barSize={25} />
					</BarChart>
				</ResponsiveContainer>
			)}

			<hr />

			<div className="my-2 flex flex-col justify-between gap-2 md:flex-row">
				<div className="flex w-full flex-col gap-2">
					<h3 className="subtitle">Link Clicks</h3>
					<h6 className="text-muted-foreground">Total clicks on your links over time.</h6>
					{totalClicks === 0 || !hasEnoughData ? (
						<div className="card my-1 text-center font-semibold text-muted-foreground">
							{totalClicks === 0 ? "Not enough data yet." : "Only one data point available."}
						</div>
					) : (
						<ResponsiveContainer height={200}>
							<LineChart data={stats} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
								<XAxis dataKey="date" className="text-xs" />
								<YAxis className="text-xs" />
								<Tooltip
									wrapperClassName="popover text-xs"
									labelClassName="text-foreground font-semibold"
									contentStyle={{ backgroundColor: "var(--background)", border: "none" }}
								/>
								<Line type="monotone" dataKey="linkClicks" name="Link Clicks" stroke="#31589c" />
							</LineChart>
						</ResponsiveContainer>
					)}
				</div>

				<div className="flex w-full flex-col gap-2">
					<h3 className="subtitle">Button Clicks</h3>
					<h6 className="text-muted-foreground">Total clicks on your social buttons over time.</h6>
					{totalClicks === 0 || !hasEnoughData ? (
						<div className="card my-1 text-center font-semibold text-muted-foreground">
							{totalClicks === 0 ? "Not enough data yet." : "Only one data point available."}
						</div>
					) : (
						<ResponsiveContainer height={200}>
							<LineChart data={stats} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
								<XAxis dataKey="date" className="text-xs" />
								<YAxis className="text-xs" />
								<Tooltip
									wrapperClassName="popover text-xs"
									labelClassName="text-foreground font-semibold"
									contentStyle={{ backgroundColor: "var(--background)", border: "none" }}
								/>
								<Line type="monotone" dataKey="buttonClicks" name="Button Clicks" stroke="#31589c" />
							</LineChart>
						</ResponsiveContainer>
					)}
				</div>
			</div>
		</div>
	)
}
