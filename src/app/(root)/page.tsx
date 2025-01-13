"use client"

import { Carousel } from "@/src/components/carousel/Carousel"
import Header from "@/src/components/Header"
import { Icon } from "@iconify/react"
import { useSession } from "next-auth/react"
import { Bowlby_One } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

const bowlby = Bowlby_One({ subsets: ["latin"], weight: "400" })

export default function Home() {
	const { status } = useSession()

	if (status === "authenticated") {
		redirect("/profile")
	}

	const features = [
		{
			title: "Unlimited Links",
			description: "Add as many links or social buttons as you want to your personal page.",
			icon: "ri:infinity-fill"
		},
		{
			title: "Fully Customizable",
			description: "Customize the colors, change the sizes or add shadows for your links.",
			icon: "ri:paint-brush-fill"
		},
		{
			title: "Detailed Analytics",
			description: "Track your page views, link clicks, and more with detailed analytics.",
			icon: "ri:line-chart-fill"
		},
		{
			title: "Free to Use!",
			description: "Linksy is completely free to use, with no hidden fees or charges.",
			icon: "ri:price-tag-3-fill"
		}
	]

	return (
		<div className="card relative flex min-h-screen items-center justify-between">
			<div className="absolute inset-x-0 bottom-0 h-2/6 opacity-50 md:h-3/6">
				<Image src="/grid-bg.png" alt="Background" fill className="" />
			</div>

			<Header />

			<main className="z-20 grid justify-items-center py-8 md:grid-cols-2 md:gap-12">
				<div className="order-1">
					<div className="flex max-w-lg flex-col gap-4 text-center md:items-start md:text-start">
						<p className={`${bowlby.className} text-5xl`}>Keep all your stuff together!</p>
						<p className={`${bowlby.className} text-3xl`}>Your link-in-bio page 🔗</p>
						<p>
							Welcome to <span className="font-bold">Linksy</span>! Your links, profiles, contact info, and more in one
							place. Create and customize your page and share it with your audience.
						</p>
					</div>
					<form className="my-8 inline-flex items-center rounded-2xl border border-border bg-card p-1 pl-3">
						<span className="hidden text-muted-foreground md:block">linksy-live.vercel.app/</span>
						<span className="block text-muted-foreground md:hidden">@</span>
						<input type="text" placeholder="your_name" />
						<Link href="/login" className="btn bg-primary">
							Get Started!
						</Link>
					</form>

					<div className="grid grid-cols-1 gap-2 px-4 md:grid-cols-2">
						{features.map((feature, index) => (
							<div key={index} className="card flex flex-col items-start gap-2">
								<div className="flex flex-row items-center gap-2">
									<span className="icon rounded-full bg-muted p-2">
										<Icon icon={feature.icon} />
									</span>
									<p className="font-bold">{feature.title}</p>
								</div>
								<span className="text-sm text-muted-foreground">{feature.description}</span>
							</div>
						))}
					</div>
				</div>

				<div className="animate-expand animate-float z-50 order-2 my-12 flex w-full max-w-xl flex-col items-center justify-center">
					<Carousel />
				</div>
			</main>
		</div>
	)
}
