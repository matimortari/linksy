import Providers from "@/src/components/context/Providers"
import Footer from "@/src/components/Footer"
import Header from "@/src/components/Header"
import { authOptions } from "@/src/lib/auth"
import "@/src/styles/globals.css"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Inter } from "next/font/google"
import { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Linksy — Your link-in-bio page 🔗🌐",
	description: "Keep all your stuff together! Share your links in one page and share it with your audience.",
	keywords: ["Linksy", "Link in bio", "Linksy page"],
	other: {
		"google-site-verification": "2j0bcfhh8FCYPpzFylzbiPjl3Pa0X7lMuG060ctsCsA"
	}
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	const session = await getServerSession(authOptions)

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className}`}>
				<Providers session={session}>
					<Header />
					<main>{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
