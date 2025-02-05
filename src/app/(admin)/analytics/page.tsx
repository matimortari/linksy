"use client"

import AnalyticsCharts from "@/src/components/lists/AnalyticsCharts"
import ClicksByLink from "@/src/components/lists/ClicksByLink"
import useAuth from "@/src/hooks/useAuth"

export default function Analytics() {
	useAuth()

	return (
		<div className="flex w-full flex-col gap-4 md:flex-row">
			<main className="card md:w-full">
				<header className="space-y-1">
					<h2>Analytics</h2>
					<h5>View your profile analytics.</h5>
				</header>

				<hr className="my-4" />

				<div className="flex flex-col gap-4">
					<section className="section-container">
						<AnalyticsCharts />
					</section>

					<section className="section-container">
						<h3>Clicks By Link</h3>
						<h6 className="text-muted-foreground">Your most visited links & social buttons.</h6>
						<ClicksByLink />
					</section>
				</div>
			</main>
		</div>
	)
}
