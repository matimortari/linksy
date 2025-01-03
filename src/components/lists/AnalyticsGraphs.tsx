"use client"

import { getAnalytics } from "@/src/lib/analytics"
import { useQuery } from "@tanstack/react-query"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function AnalyticsGraphs() {
	const { data: stats } = useQuery({ queryKey: ["analytics"], queryFn: getAnalytics })

	return (
		<div className="flex flex-col">
			<div className="my-4 flex flex-col">
				<h3>Profile Views</h3>
				<h6 className="text-muted-foreground">Total views of your profile page over time.</h6>
				<ResponsiveContainer width="100%" height={200}>
					<LineChart data={stats} margin={{ top: 20, right: 20, left: 0, bottom: 10 }} className="text-xs">
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" className="text-xs" />
						<YAxis />
						<Tooltip />
						<Line type="monotone" dataKey="views" stroke="#41a490" activeDot={{ r: 8 }} />
					</LineChart>
				</ResponsiveContainer>
			</div>
			<hr />

			<div className="my-4 flex flex-col justify-between gap-2 md:flex-row">
				<div className="flex-1">
					<h3 className="subtitle">Link Clicks</h3>
					<h6 className="text-muted-foreground">Total clicks on your links over time.</h6>
					<ResponsiveContainer width="100%" height={200} className="rounded-xl border border-muted">
						<BarChart data={stats} margin={{ top: 20, right: 20, left: 0, bottom: 10 }} className="text-xs">
							<XAxis dataKey="date" className="text-xs" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="linkClicks" fill="#4b3e68" barSize={25} />
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className="flex-1">
					<h3 className="subtitle">Button Clicks</h3>
					<h6 className="text-muted-foreground">Total clicks on your social buttons over time.</h6>
					<ResponsiveContainer width="100%" height={200} className="rounded-xl border border-muted">
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
