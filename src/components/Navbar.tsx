"use client"

import { useUserStore } from "@/src/hooks/useUserStore"
import { Icon } from "@iconify/react"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { Chau_Philomene_One } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const chau = Chau_Philomene_One({ subsets: ["latin"], weight: "400" })

const navLinks = [
	{ href: "/profile", icon: "material-symbols:location-home-outline", label: "My Profile" },
	{ href: "/preferences", icon: "material-symbols:settings-applications-outline", label: "Preferences" },
	{ href: "/analytics", icon: "material-symbols:chart-data-outline", label: "Analytics" }
]

export default function Navbar() {
	const { slug, image } = useUserStore()
	const { theme, setTheme } = useTheme()

	const [isOpen, setIsOpen] = useState(false)

	const handleSignOut = async () => {
		await signOut({ redirect: true, callbackUrl: "/" })
	}

	const handleThemeToggle = () => {
		setTheme(theme === "light" ? "dark" : "light")
	}

	return (
		<>
			{/* Top navbar for mobile */}
			<div className="md:hidden">
				<div className="flex w-full items-center justify-between p-4">
					<Link href="/" className="flex flex-row items-center justify-start gap-2">
						<Image src="/logo.png" alt="Logo" width={35} height={35} className="icon rounded-full" />
						<span className={`text-2xl ${chau.className}`}>Linksy</span>
					</Link>

					<div className="flex flex-row items-center justify-end gap-2">
						<button onClick={handleThemeToggle} className="btn bg-card">
							<Icon icon={theme === "light" ? "radix-icons:sun" : "radix-icons:moon"} className="icon size-6" />
						</button>
						<button onClick={() => setIsOpen(!isOpen)} className="btn bg-card">
							{isOpen ? (
								<Icon icon="mdi:close" className="icon size-6" />
							) : (
								<Icon icon="mdi:menu" className="icon size-6" />
							)}
						</button>
						<button onClick={handleSignOut} className="btn bg-card">
							<Icon icon="material-symbols:logout" className="icon size-6" />
						</button>
					</div>
				</div>

				{isOpen && (
					<div className="flex flex-row items-center justify-center gap-2 p-4">
						{navLinks.map((item) => (
							<Link key={item.label} href={item.href} className="btn bg-card">
								<Icon icon={item.icon} className="icon size-6" />
								{item.label}
							</Link>
						))}
					</div>
				)}
			</div>

			{/* Desktop sidebar */}
			<div className="hidden w-44 md:fixed md:inset-y-0 md:flex md:flex-col">
				<div className="flex flex-col gap-4">
					<Link href="/" className="mt-8 flex flex-row items-center justify-start gap-2">
						<Image src="/logo.png" alt="Logo" width={35} height={35} className="icon rounded-full" />
						<span className={`text-2xl ${chau.className}`}>Linksy</span>
					</Link>

					<Link href={`/${slug}`} className="flex flex-row items-center justify-start gap-2">
						<Image src={image} alt={slug} width={30} height={30} className="hidden rounded-full md:block" />
						<p className="truncate text-xs font-medium text-muted-foreground">@{slug}</p>
					</Link>

					<div className="flex flex-col overflow-y-auto">
						<nav className="w-full space-y-2">
							<button onClick={handleThemeToggle} className="btn flex w-full justify-start gap-2 bg-card">
								<Icon icon={theme === "light" ? "radix-icons:sun" : "radix-icons:moon"} className="icon size-6" />
								<span>Toggle Theme</span>
							</button>

							{navLinks.map((item) => (
								<div key={item.label}>
									<Link href={item.href} className="btn flex w-full justify-start gap-2 bg-card">
										<Icon icon={item.icon} className="icon size-6" />
										{item.label}
									</Link>
								</div>
							))}

							<button onClick={handleSignOut} className="btn flex w-full justify-start gap-2 bg-card">
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
