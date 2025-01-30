"use client"

import { useUserStore } from "@/src/hooks/useUserStore"
import { Icon } from "@iconify/react"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { Chau_Philomene_One } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import UpdateUserDialog from "./dialogs/UpdateUserDialog"

const chau = Chau_Philomene_One({ subsets: ["latin"], weight: "400" })

const navLinks = [
	{ href: "/profile", icon: "material-symbols:location-home-outline", label: "My Profile" },
	{ href: "/preferences", icon: "material-symbols:settings-applications-outline", label: "Preferences" },
	{ href: "/analytics", icon: "material-symbols:chart-data-outline", label: "Analytics" }
]

export default function Navbar() {
	const { slug, description, image, setUserData } = useUserStore()
	const { theme, setTheme } = useTheme()

	const [isNavOpen, setIsNavOpen] = useState(false)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [currentUser, setCurrentUser] = useState<UserFormData | null>(null)

	const handleSignOut = async () => {
		await signOut({ redirect: true, callbackUrl: "/" })
	}

	const handleThemeToggle = () => {
		setTheme(theme === "light" ? "dark" : "light")
	}

	const handleUpdateUser = (updatedUser: UserFormData) => {
		setUserData(updatedUser)
		setIsDialogOpen(false)
	}

	useEffect(() => {
		setCurrentUser({ slug, description, image })
	}, [slug, description, image])

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
						<button onClick={() => setIsNavOpen(!isNavOpen)} className="btn bg-card">
							{isNavOpen ? (
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

				{/* Mobile navigation menu */}
				{isNavOpen && (
					<div className="flex flex-col">
						<div className="flex flex-row items-center justify-center gap-2 p-4">
							{navLinks.map((item) => (
								<Link key={item.label} href={item.href} className="btn bg-card">
									<Icon icon={item.icon} className="icon size-6" />
									{item.label}
								</Link>
							))}
						</div>

						<div className="mx-4 mb-4 flex flex-row items-center justify-between gap-2">
							<div className="flex flex-row items-center gap-4">
								<Image src={image} alt={slug} width={50} height={50} className="rounded-full" />

								<div className="flex flex-col gap-1">
									<h5 className="truncate">@{slug}</h5>
									<p className="text-xs text-muted-foreground">{description}</p>
								</div>

								<button onClick={() => setIsDialogOpen(true)} className="btn ml-4 bg-card">
									<Icon icon="material-symbols:edit" className="icon size-6" />
								</button>
							</div>
						</div>
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

					<div className="flex flex-row items-center gap-4 p-4">
						<Link href={`/${slug}`} className="flex flex-row items-center justify-start gap-2">
							<Image src={image} alt={slug} width={30} height={30} className="hidden rounded-full md:block" />
							<p className="truncate text-xs font-medium text-muted-foreground">@{slug}</p>
						</Link>

						<button onClick={() => setIsDialogOpen(true)} className="btn bg-card">
							<Icon icon="material-symbols:edit" className="icon size-6" />
						</button>
					</div>

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

			{/* Update user dialog */}
			<UpdateUserDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				onUpdateUser={handleUpdateUser}
				currentUser={currentUser}
			/>
		</>
	)
}
