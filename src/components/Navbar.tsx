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

function Logo() {
	return (
		<Link href="/" className="flex flex-row items-center justify-start gap-2">
			<Image src="/logo.png" alt="Logo" width={35} height={35} className="icon rounded-full" />
			<span className={`text-2xl ${chau.className}`}>Linksy</span>
		</Link>
	)
}

function UserCard({ slug, description, image, setIsDialogOpen }) {
	return (
		<div className="my-4 flex flex-row items-center gap-2">
			<div className="relative">
				<Image src={image} alt={slug} width={50} height={50} className="rounded-full border" />
				<button
					onClick={() => setIsDialogOpen(true)}
					className="absolute -bottom-2 -right-2 rounded-full border bg-accent p-1"
				>
					<Icon icon="mdi:square-edit-outline" className="icon size-4" />
				</button>
			</div>

			<div className="flex w-full flex-col gap-1 overflow-hidden">
				<Link href={`/${slug}`} className="w-full">
					<h5 className="w-full truncate text-sm font-semibold hover:underline">{`@${slug}`}</h5>
				</Link>
				<p className="break-all text-xs text-muted-foreground md:hidden">{description}</p>
			</div>
		</div>
	)
}

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
					<Logo />

					<nav className="flex flex-row items-center justify-end gap-2">
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
					</nav>
				</div>

				{isNavOpen && (
					<div className="flex flex-col p-4">
						<nav className="flex flex-row items-center justify-center gap-2 ">
							{navLinks.map((item) => (
								<Link key={item.label} href={item.href} className="btn bg-card">
									<Icon icon={item.icon} className="icon size-6" />
									{item.label}
								</Link>
							))}
						</nav>

						<UserCard slug={slug} description={description} image={image} setIsDialogOpen={setIsDialogOpen} />
					</div>
				)}
			</div>

			{/* Desktop sidebar */}
			<div className="hidden w-44 md:fixed md:inset-y-0 md:flex md:flex-col">
				<div className="mt-8 flex flex-col gap-4">
					<Logo />

					<UserCard slug={slug} description={description} image={image} setIsDialogOpen={setIsDialogOpen} />

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

			<UpdateUserDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				onUpdateUser={handleUpdateUser}
				currentUser={currentUser}
			/>
		</>
	)
}
