"use client"

import ButtonList from "@/src/components/lists/ButtonList"
import LinkList from "@/src/components/lists/LinkList"
import Preview from "@/src/components/Preview"
import ShareBanner from "@/src/components/ShareBanner"
import useAuth from "@/src/hooks/useAuth"
import { useUserStore } from "@/src/hooks/useUserStore"

export default function Profile() {
	useAuth()

	const { slug } = useUserStore()

	return (
		<div className="flex w-full flex-col gap-4 md:flex-row">
			<main className="card md:w-8/12">
				<header className="mb-4 space-y-1">
					<h1>My Profile</h1>
					<h5>
						Welcome back, <span className="font-bold text-accent">{slug}</span>!
					</h5>
				</header>

				<ShareBanner />

				<hr className="my-4" />

				<div className="flex flex-col gap-4">
					<section className="section-container">
						<LinkList />
					</section>

					<section className="section-container">
						<ButtonList />
					</section>
				</div>
			</main>

			<aside className="md:w-4/12">
				<Preview />
			</aside>
		</div>
	)
}
