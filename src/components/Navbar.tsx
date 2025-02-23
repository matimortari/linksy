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
			<Image src="/logo.png" alt="Logo" width={35} height={35} className="icon" />
			<span className={`text-2xl ${chau.className}`}>Linksy</span>
		</Link>
	)
}

function UserCard({ slug, description, image, setIsDialogOpen }) {
	return (
		<div className="my-4 flex flex-row items-center gap-4">
			<div className="relative">
				{image && <Image src={image} alt={slug} width={60} height={60} className="rounded-full border" />}
				<button
					onClick={() => setIsDialogOpen(true)}
					title="Edit Profile Information"
					className="absolute -bottom-2 -right-2 rounded-full border bg-accent p-1"
				>
					<Icon icon="mdi:square-edit-outline" width={20} height={20} />
				</button>
			</div>

			<div className="flex w-full flex-col gap-1 overflow-x-hidden">
				<Link href={`/${slug}`} title={`linksy-live.vercel.app/${slug}`} className="w-full truncate">
					<span className="w-full truncate text-xs font-medium hover:underline">{`@${slug}`}</span>
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
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

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

	const themeIcon = !mounted ? null : theme === "light" ? "radix-icons:moon" : "radix-icons:sun"

	const themeTitle = !mounted ? "Loading..." : `Switch to ${theme === "light" ? "dark" : "light"} mode`

	return (
		<>
			{/* Top navbar for mobile */}
			<div className="md:hidden">
				<div className="flex w-full items-center justify-between p-4">
					<Logo />

					<nav className="flex flex-row items-center justify-end gap-2">
						<button onClick={handleThemeToggle} title={themeTitle} className="btn bg-card">
							{themeIcon && <Icon icon={themeIcon} width={25} height={25} />}
						</button>

						<button onClick={() => setIsNavOpen(!isNavOpen)} className="btn bg-card">
							{isNavOpen ? (
								<Icon icon="mdi:close" width={25} height={25} />
							) : (
								<Icon icon="mdi:menu" width={25} height={25} />
							)}
						</button>

						<button onClick={handleSignOut} className="btn bg-card">
							<Icon icon="material-symbols:logout" width={25} height={25} />
						</button>
					</nav>
				</div>

				{isNavOpen && (
					<div className="flex flex-col p-4">
						<nav className="flex flex-row items-center justify-center gap-2 ">
							{navLinks.map((item) => (
								<Link key={item.label} href={item.href} title={item.label} className="btn bg-card">
									<Icon icon={item.icon} width={25} height={25} />
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
							<button
								onClick={handleThemeToggle}
								title={themeTitle}
								className="btn flex w-full justify-start gap-2 bg-card"
							>
								{themeIcon && <Icon icon={themeIcon} width={25} height={25} />}
								<span>{mounted ? (theme === "light" ? "Dark" : "Light") : ""} Mode</span>
							</button>

							{navLinks.map((item) => (
								<Link
									key={item.label}
									href={item.href}
									title={item.label}
									className="btn flex w-full justify-start gap-2 bg-card"
								>
									<Icon icon={item.icon} width={25} height={25} />
									{item.label}
								</Link>
							))}

							<button onClick={handleSignOut} title="Sign Out" className="btn flex w-full justify-start gap-2 bg-card">
								<Icon icon="material-symbols:logout" width={25} height={25} />
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
