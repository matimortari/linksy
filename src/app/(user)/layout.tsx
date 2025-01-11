import Providers from "@/src/components/context/Providers"
import Footer from "@/src/components/Footer"
import Navbar from "@/src/components/Navbar"
import { authOptions } from "@/src/lib/auth"
import "@/src/styles/globals.css"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Inter } from "next/font/google"
import { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export default async function UserLayout({ children }: { children: ReactNode }) {
	const session = await getServerSession(authOptions)
	const slug = session?.user?.slug
	const image = session?.user?.image

	const metadata: Metadata = {
		title: session?.user?.slug ? `${session.user.slug} | Linksy` : "Linksy",
		description: "Keep all your stuff together! Share your links in one page and share it with your audience."
	}

	return (
		<html lang="en">
			<head>
				<title>{String(metadata.title)}</title>
				<meta name="description" content={metadata.description ?? ""} />
			</head>

			<body className={inter.className}>
				<Providers session={session}>
					<div className="flex min-h-screen flex-col md:flex-row">
						<aside className="p-4 md:w-2/12">
							<Navbar slug={slug} image={image} />
						</aside>
						<main className="md:w-full">{children}</main>
					</div>
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
