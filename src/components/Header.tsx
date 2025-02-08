"use client"

import { Icon } from "@iconify/react"
import { useTheme } from "next-themes"
import { Chau_Philomene_One } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

const chau = Chau_Philomene_One({ subsets: ["latin"], weight: "400" })

export default function Header() {
	const { theme, setTheme } = useTheme()

	const handleThemeToggle = () => {
		setTheme(theme === "light" ? "dark" : "light")
	}

	return (
		<div className="flex w-full items-center justify-between p-4">
			<Link href="/" className="flex flex-row items-center justify-start gap-2">
				<Image src="/logo.png" alt="Logo" width={35} height={35} className="icon rounded-full" />
				<span className={`text-2xl ${chau.className}`}>Linksy</span>
			</Link>

			<div className="flex flex-row items-center justify-end gap-2">
				<button onClick={handleThemeToggle} className="btn bg-card">
					<Icon icon={theme === "light" ? "radix-icons:moon" : "radix-icons:sun"} className="icon size-6" />
				</button>
				<Link href="/login" className="btn bg-card">
					<Icon icon="material-symbols:login" className="icon size-6" />
				</Link>
			</div>
		</div>
	)
}
