"use client"

import AnalyticsCharts from "@/src/components/lists/AnalyticsCharts"
import ClicksByLink from "@/src/components/lists/ClicksByLink"
import useAuth from "@/src/hooks/useAuth"

export default function Analytics() {
	useAuth() // Check if authenticated

	return (
		<div className="flex w-full flex-col gap-4 md:flex-row">
			<div className="card md:w-full">
				<header>
					<h1>Analytics</h1>
					<h5>View your profile analytics.</h5>
				</header>

				<hr className="my-4" />

				<main className="flex flex-col gap-4">
					<div className="section-container">
						<AnalyticsCharts />
					</div>

					<div className="section-container">
						<h3>Clicks By Link</h3>
						<h6 className="text-muted-foreground">Your most visited links & social buttons.</h6>
						<ClicksByLink />
					</div>
				</main>
			</div>
		</div>
	)
}
