"use client"

import Carousel from "@/src/components/carousel/Carousel"
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
		<div className="card relative min-h-screen">
			<div className="absolute inset-x-0 bottom-0 z-0 h-2/6 opacity-50 md:h-3/6">
				<Image src="/grid-bg.png" alt="Background" fill />
			</div>

			<Header />

			<main className="relative z-10 flex flex-col items-center gap-4 px-4 md:px-8 md:pb-8">
				<div className="flex w-full flex-col md:flex-row md:gap-4">
					<section className="flex flex-col md:w-1/2">
						<div className="my-8 max-w-md space-y-4 text-center md:text-left">
							<h4 className="text-accent">Your link-in-bio page 🔗</h4>
							<h1 className={`${bowlby.className} text-3xl md:text-5xl`}>Keep all your stuff together!</h1>
							<p>
								Welcome to <span className="font-bold">Linksy</span>! Your links, profiles, contact info, and more in
								one place. Create and customize your page and share it with your audience.
							</p>
						</div>
						<div className="flex max-w-md flex-row items-center rounded-2xl border bg-card p-1 pl-3 text-sm text-muted-foreground">
							<span className="hidden sm:inline">linksy-live.vercel.app/</span>
							<span className="sm:hidden">@</span>
							<input type="text" placeholder="your_name" className="w-full flex-1 bg-transparent px-1 outline-none" />
							<Link href="/login" className="btn bg-primary">
								Get Started!
							</Link>
						</div>
					</section>

					<section className="flex w-full justify-center md:w-1/2">
						<div className="animate-expand animate-float w-full max-w-sm">
							<Carousel />
						</div>
					</section>
				</div>

				<section>
					<h2 className="m-4">Features</h2>

					<div className="grid grid-cols-1 gap-2 md:grid-cols-4">
						{features.map((feature, index) => (
							<div key={index} className="card flex flex-col space-y-2">
								<div className="flex items-center gap-2">
									<span className="icon rounded-full bg-muted p-2">
										<Icon icon={feature.icon} className="icon size-4" />
									</span>
									<p className="font-bold">{feature.title}</p>
								</div>
								<span className="text-sm text-muted-foreground">{feature.description}</span>
							</div>
						))}
					</div>
				</section>
			</main>
		</div>
	)
}
