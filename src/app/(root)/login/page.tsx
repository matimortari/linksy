"use client"

import Header from "@/src/components/Header"
import { Icon } from "@iconify/react"
import { signIn, useSession } from "next-auth/react"
import { Bowlby_One } from "next/font/google"
import Image from "next/image"
import { redirect } from "next/navigation"

const bowlby = Bowlby_One({ subsets: ["latin"], weight: "400" })

export default function Login() {
	const { status } = useSession()

	if (status === "authenticated") {
		redirect("/")
	}

	return (
		<div className="card relative min-h-screen overflow-hidden">
			<div className="absolute inset-x-0 bottom-0 h-2/6 opacity-50 md:h-3/6">
				<Image src="/grid-bg.png" alt="Background" fill />
			</div>

			<Header />

			<main className="z-20 flex flex-col items-center justify-center py-8">
				<div className="card max-w-lg gap-4 text-center">
					<div className="flex flex-col items-center gap-2">
						<p className={`${bowlby.className} text-3xl`}>Sign In</p>
						<p className="text-muted-foreground">Sign in with your preferred provider.</p>
					</div>

					<div className="flex flex-row items-center justify-center gap-4">
						<button
							className="btn-circle flex items-center justify-center bg-google text-accent-foreground"
							onClick={() => signIn("google")}
						>
							<Icon icon="simple-icons:google" className="icon" />
						</button>
						<button
							className="btn-circle flex items-center justify-center bg-github text-accent-foreground"
							onClick={() => signIn("github")}
						>
							<Icon icon="simple-icons:github" className="icon" />
						</button>
					</div>
				</div>
			</main>
		</div>
	)
}
