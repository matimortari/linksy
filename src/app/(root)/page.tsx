"use client"

import Carousel from "@/src/components/Carousel"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { Bowlby_One, Lato } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

const bowlby = Bowlby_One({ subsets: ["latin"], weight: "400" })
const lato = Lato({ subsets: ["latin"], weight: "900" })

export default function Home() {
	const { status } = useSession()

	if (status === "authenticated") {
		redirect("/profile")
	}

	const features = [
		{
			title: "Unlimited Links",
			description: "Add as many links or social buttons as you want to your page.",
			icon: "ri:infinity-fill"
		},
		{
			title: "Fully Customizable",
			description: "Customize the colors, layouts and more for your page.",
			icon: "ri:paint-brush-fill"
		},
		{
			title: "Detailed Analytics",
			description: "Track your page views, clicks, and more with analytics.",
			icon: "ri:line-chart-fill"
		},
		{
			title: "Free to Use!",
			description: "Linksy is completely free to use, with no hidden fees.",
			icon: "ri:price-tag-3-fill"
		}
	]

	return (
		<div className="relative min-h-screen">
			<div className="absolute inset-x-0 bottom-0 z-0 hidden opacity-20 md:block md:h-3/6">
				<Image src="/grid-bg.png" alt="Background" fill className="object-cover" />
			</div>

			<main className="relative z-10 flex flex-col items-center gap-4 px-4 md:px-8 md:pb-8">
				<div className="flex w-full flex-col items-center md:flex-row">
					<motion.section
						className="flex flex-col md:w-1/2"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<div className="space-y-6 text-center md:text-left">
							<h4 className={`${lato.className} text-lg text-accent`}>Your link-in-bio page 🔗</h4>
							<h1 className={`${bowlby.className} max-w-md text-4xl leading-tight md:text-5xl`}>
								Keep all your stuff together!
							</h1>
							<p className={`${lato.className} max-w-xl text-muted-foreground`}>
								Welcome to <span className="font-bold text-accent">Linksy</span>! Your links, profiles, contact info,
								and more in one place. Create and customize your page and share it with your audience.
							</p>
						</div>

						<motion.div
							className="my-8 flex max-w-md flex-row items-center rounded-2xl border bg-card p-1 pl-3 text-sm text-muted-foreground shadow-xl"
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 400, damping: 10 }}
						>
							<span className="hidden cursor-default sm:inline">linksy-live.vercel.app/</span>
							<span className="cursor-default sm:hidden">@</span>
							<input type="text" placeholder="your_name" className="w-full flex-1 bg-transparent outline-none" />
							<Link href="/login" className="btn bg-primary transition-colors">
								Get Started!
							</Link>
						</motion.div>
					</motion.section>

					<motion.section
						className="mt-16 w-full md:mt-4 md:w-1/2"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<Carousel />
					</motion.section>
				</div>

				<section className="mt-12 w-full max-w-6xl">
					<h3 className={`${bowlby.className} mb-4 text-center`}>Why Choose Linksy?</h3>
					<div className="grid grid-cols-2 gap-2 md:grid-cols-4">
						{features.map((feature, index) => (
							<div key={index} className="card icon flex cursor-default flex-col gap-2 shadow-xl">
								<div className="flex items-center gap-2">
									<span className="rounded-full bg-muted p-2">
										<Icon icon={feature.icon} className="icon size-4" />
									</span>
									<h4 className="font-bold">{feature.title}</h4>
								</div>
								<p className="text-sm text-muted-foreground">{feature.description}</p>
							</div>
						))}
					</div>
				</section>
			</main>
		</div>
	)
}
