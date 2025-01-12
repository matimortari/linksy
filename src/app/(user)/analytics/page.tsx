"use client"

import AnalyticsCharts from "@/src/components/lists/AnalyticsCharts"
import ClicksByLink from "@/src/components/lists/ClicksByLink"
import useAuth from "@/src/hooks/useAuth"

export default function Analytics() {
	useAuth()

	return (
		<div className="card">
			<header>
				<h1>Analytics</h1>
				<h5>View your profile analytics.</h5>
			</header>

			<hr className="my-4" />

			<main className="flex flex-col gap-4">
				<div className="section-container">
					<AnalyticsCharts />
					<hr />
				</div>

				<div className="section-container">
					<h3>Clicks By Link</h3>
					<h6 className="text-muted-foreground">Your most visited links & social buttons.</h6>
					<ClicksByLink />
					<hr />
				</div>
			</main>
		</div>
	)
}
