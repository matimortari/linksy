"use client"

import AnalyticsCharts from "@/src/components/lists/AnalyticsCharts"
import ClicksByLink from "@/src/components/lists/ClicksByLink"

export default function Analytics() {
	// TODO - Add redirect for unauthenticated users

	return (
		<div className="card">
			<header>
				<h1>Analytics</h1>
				<h5>View your profile analytics.</h5>
			</header>

			<hr className="my-4" />

			<main className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<AnalyticsCharts />
					<hr />
				</div>

				<div className="flex flex-col gap-2">
					<h3>Clicks By Link</h3>
					<h6 className="text-muted-foreground">Your most visited links & social buttons.</h6>
					<ClicksByLink />
					<hr />
				</div>
			</main>
		</div>
	)
}
