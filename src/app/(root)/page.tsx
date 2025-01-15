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
		<div className="card relative min-h-screen">
			<div className="absolute inset-x-0 bottom-0 z-0 h-2/6 opacity-50 md:h-3/6">
				<Image src="/grid-bg.png" alt="Background" fill />
			</div>

			<Header />

			<main className="relative z-10 flex flex-col items-center justify-between gap-12 md:flex-row md:p-8">
				<div className="w-full space-y-4 md:w-1/2">
					<div className="space-y-4 text-center md:text-left">
						<h1 className={`${bowlby.className} text-3xl md:text-6xl`}>Keep all your stuff together!</h1>
						<h2 className={`${bowlby.className} text-xl md:text-3xl`}>Your link-in-bio page 🔗</h2>
						<p className="">
							Welcome to <span className="font-bold">Linksy</span>! Your links, profiles, contact info, and more in one
							place. Create and customize your page and share it with your audience.
						</p>
					</div>

					<form className="flex flex-row items-center rounded-2xl border border-border bg-card p-1 pl-3 text-sm text-muted-foreground md:mr-16">
						<span className="hidden sm:inline">linksy-live.vercel.app/</span>
						<span className="sm:hidden">@</span>
						<input type="text" placeholder="your_name" className="w-full flex-1 bg-transparent px-1 outline-none" />
						<Link href="/login" className="btn bg-primary">
							Get Started!
						</Link>
					</form>

					<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:mr-16">
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
				</div>

				<div className="flex w-full justify-center md:w-1/2">
					<div className="animate-expand animate-float w-full max-w-sm">
						<Carousel />
					</div>
				</div>
			</main>
		</div>
	)
}
