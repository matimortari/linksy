"use client"

import { Icon } from "@iconify/react"
import { signOut } from "next-auth/react"
import { Chau_Philomene_One } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import ThemeSwitch from "./ThemeSwitch"

const chau = Chau_Philomene_One({ subsets: ["latin"], weight: "400" })

const navLinks = [
	{ href: "/profile", icon: "material-symbols:view-timeline-outline", label: "My Profile" },
	{ href: "/preferences", icon: "material-symbols:settings-applications-outline", label: "Preferences" },
	{ href: "/analytics", icon: "material-symbols:chart-data-outline", label: "Analytics" }
]

export default function Navbar({ slug, image }) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			{/* Mobile Top Navbar */}
			<div className="md:hidden">
				<div className="flex w-full items-center justify-between p-2 pb-4">
					<Link href="/" className="flex flex-row items-center justify-start gap-2">
						<Image src="/logo.png" alt="Logo" width={35} height={35} className="icon rounded-full" />
					</Link>

					<ThemeSwitch />

					<button onClick={() => setIsOpen(!isOpen)}>
						{isOpen ? <Icon icon="mdi:close" className="size-8" /> : <Icon icon="mdi:menu" className="size-8" />}
					</button>
				</div>

				{isOpen && (
					<div className="flex flex-row items-center justify-between space-x-2 p-2 pb-4">
						{navLinks.map((item) => (
							<Link key={item.label} href={item.href} className="btn">
								<Icon icon={item.icon} className="icon size-6" />
							</Link>
						))}
						<button onClick={async () => await signOut({ redirect: true, callbackUrl: "/" })} className="btn">
							<Icon icon="material-symbols:logout" className="icon size-6" />
						</button>
					</div>
				)}
			</div>

			{/* Desktop Sidebar */}
			<div className="hidden w-44 md:fixed md:inset-y-0 md:flex md:flex-col">
				<div className="flex flex-col gap-4">
					<div className="mt-8 flex flex-row items-center justify-start gap-2">
						<Image src="/logo.png" alt="Logo" width={35} height={35} className="icon rounded-full" />
						<span className={`hidden text-2xl md:block ${chau.className}`}>Linksy</span>
					</div>

					<Link href={`/${slug}`} className="flex flex-row items-center justify-start gap-2">
						{image && <Image src={image} alt={image} width={30} height={30} className="hidden rounded-full md:block" />}
						<p className="truncate text-xs font-medium text-muted-foreground">@{slug}</p>
					</Link>

					<ThemeSwitch />

					<div className="flex flex-col overflow-y-auto">
						<nav className="w-full space-y-2">
							{navLinks.map((item) => (
								<>
									<Link key={item.label} href={item.href} className="btn w-full">
										<Icon icon={item.icon} className="icon size-6" />
										{item.label}
									</Link>
									<hr />
								</>
							))}
							<button onClick={async () => await signOut({ redirect: true, callbackUrl: "/" })} className="btn w-full">
								<Icon icon="material-symbols:logout" className="icon size-6" />
								<p className="hidden md:block">Sign Out</p>
							</button>
						</nav>
					</div>
				</div>
			</div>
		</>
	)
}
