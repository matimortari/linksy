import { Icon } from "@iconify/react"
import { Chau_Philomene_One } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import ThemeSwitch from "./ThemeSwitch"

const chau = Chau_Philomene_One({ subsets: ["latin"], weight: "400" })

export default function Header() {
	return (
		<header className="relative flex w-full items-center justify-between">
			<Link href="/" className="flex flex-row items-center justify-start gap-2">
				<Image src="/logo.png" alt="Logo" width={35} height={35} className="icon rounded-full" />
				<span className={`hidden text-2xl md:block ${chau.className}`}>Linksy</span>
			</Link>

			<div className="flex flex-row items-center justify-end gap-1">
				<ThemeSwitch />

				<Link href="/login" className="btn size-12">
					<Icon icon="material-symbols:login" width={20} height={20} className="icon" />
				</Link>
			</div>
		</header>
	)
}
