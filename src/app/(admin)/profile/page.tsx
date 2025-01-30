"use client"

import ButtonList from "@/src/components/lists/ButtonList"
import LinkList from "@/src/components/lists/LinkList"
import Preview from "@/src/components/Preview"
import ShareBanner from "@/src/components/ShareBanner"
import useAuth from "@/src/hooks/useAuth"
import { useUserStore } from "@/src/hooks/useUserStore"

export default function Profile() {
	useAuth()

	return (
		<div className="flex w-full flex-col gap-4 md:flex-row">
			<div className="card md:w-8/12">
				<header className="mb-4 space-y-1">
					<h2>My Profile</h2>
					<h5>
						Welcome back, <span className="font-bold text-accent">{useUserStore((state) => state.slug)}</span>!
					</h5>
				</header>

				<ShareBanner />

				<hr className="my-4" />

				<main className="flex flex-col gap-4">
					<div className="section-container">
						<h3>My Links</h3>
						<h6 className="text-muted-foreground">Manage your social links.</h6>
						<LinkList />
					</div>

					<div className="section-container">
						<h3>My Social Buttons</h3>
						<h6 className="text-muted-foreground">Manage your social buttons.</h6>
						<ButtonList />
					</div>
				</main>
			</div>

			<aside className="md:w-4/12">
				<Preview />
			</aside>
		</div>
	)
}
