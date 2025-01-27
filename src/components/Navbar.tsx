"use client"

import { useUserStore } from "@/src/lib/store"
import { Icon } from "@iconify/react"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { Chau_Philomene_One } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const chau = Chau_Philomene_One({ subsets: ["latin"], weight: "400" })

const navLinks = [
	{ href: "/profile", icon: "material-symbols:view-timeline-outline", label: "My Profile" },
	{ href: "/preferences", icon: "material-symbols:settings-applications-outline", label: "Preferences" },
	{ href: "/analytics", icon: "material-symbols:chart-data-outline", label: "Analytics" }
]

export default function Navbar() {
	const { slug, image } = useUserStore()
	const { theme, setTheme } = useTheme()

	const [isOpen, setIsOpen] = useState(false)

	const handleThemeToggle = () => {
		setTheme(theme === "light" ? "dark" : "light")
	}

	return (
		<>
			{/* Top navbar for mobile */}
			<div className="md:hidden">
				<div className="flex w-full items-center justify-between p-2 pb-4">
					<Link href="/" className="flex flex-row items-center justify-start gap-2">
						<Image src="/logo.png" alt="Logo" width={35} height={35} className="icon rounded-full" />
						<span className={`text-2xl ${chau.className}`}>Linksy</span>
					</Link>

					<div className="flex flex-row items-center justify-end gap-2">
						<button onClick={handleThemeToggle} className="btn bg-card">
							<Icon icon={theme === "light" ? "hugeicons:sun-03" : "hugeicons:moon"} className="icon size-6" />
						</button>
						<button onClick={() => setIsOpen(!isOpen)} className="btn bg-card">
							{isOpen ? <Icon icon="mdi:close" /> : <Icon icon="mdi:menu" />}
						</button>
					</div>
				</div>

				{isOpen && (
					<div className="flex flex-row items-center justify-between space-x-2 p-2 pb-4">
						{navLinks.map((item) => (
							<Link key={item.label} href={item.href} className="btn bg-card">
								<Icon icon={item.icon} className="icon size-6" />
							</Link>
						))}
						<button onClick={async () => await signOut({ redirect: true, callbackUrl: "/" })} className="btn bg-card">
							<Icon icon="material-symbols:logout" className="icon size-6" />
						</button>
					</div>
				)}
			</div>

			{/* Desktop sidebar */}
			<div className="hidden w-44 md:fixed md:inset-y-0 md:flex md:flex-col">
				<div className="flex flex-col gap-4">
					<div className="mt-8 flex flex-row items-center justify-start gap-2">
						<Image src="/logo.png" alt="Logo" width={35} height={35} className="icon rounded-full" />
						<span className={`text-2xl ${chau.className}`}>Linksy</span>
					</div>

					<Link href={`/${slug}`} className="flex flex-row items-center justify-start gap-2">
						{image && <Image src={image} alt={slug} width={30} height={30} className="hidden rounded-full md:block" />}
						<p className="truncate text-xs font-medium text-muted-foreground">@{slug}</p>
					</Link>

					<div className="flex flex-row items-center gap-2"></div>

					<div className="flex flex-col overflow-y-auto">
						<nav className="w-full space-y-2">
							<button onClick={handleThemeToggle} className="btn flex w-full justify-start gap-2">
								<Icon icon={theme === "light" ? "hugeicons:sun-03" : "hugeicons:moon"} className="icon size-6" />
								<span>Toggle Theme</span>
							</button>

							{navLinks.map((item) => (
								<div key={item.label}>
									<Link href={item.href} className="btn flex w-full justify-start gap-2">
										<Icon icon={item.icon} className="icon size-6" />
										{item.label}
									</Link>
								</div>
							))}
							<button
								onClick={async () => await signOut({ redirect: true, callbackUrl: "/" })}
								className="btn flex w-full justify-start gap-2"
							>
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
