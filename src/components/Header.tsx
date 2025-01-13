import { Icon } from "@iconify/react"
import { Chau_Philomene_One } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import ThemeSwitch from "./ThemeSwitch"

const chau = Chau_Philomene_One({ subsets: ["latin"], weight: "400" })

export default function Header() {
	return (
		<div className="flex w-full items-center justify-between p-2 pb-4">
			<Link href="/" className="flex flex-row items-center justify-start gap-2">
				<Image src="/logo.png" alt="Logo" width={35} height={35} className="icon rounded-full" />
				<span className={`hidden text-2xl md:block ${chau.className}`}>Linksy</span>
			</Link>

			<div className="flex flex-row items-center justify-end gap-2">
				<ThemeSwitch />
				<Link href="/login" className="btn">
					<Icon icon="material-symbols:login" className="icon size-6" />
				</Link>
			</div>
		</div>
	)
}
