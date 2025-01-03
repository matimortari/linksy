"use client"

import ThemeSwitch from "@/src/components/ThemeSwitch"
import { Icon } from "@iconify/react"
import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

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

			<header className="relative flex w-full items-center justify-between">
				<Link href="/" className="flex flex-row items-center justify-start gap-2">
					<Image src="/logo.png" alt="Logo" width={35} height={35} className="icon rounded-full" />
					<span className="hidden text-lg font-bold md:block">Linksy</span>
				</Link>

				<div className="flex flex-row items-center justify-end gap-1">
					<ThemeSwitch />
					<Link href="/login" className="btn">
						<Icon icon="material-symbols:login" width={20} height={20} className="icon" />
					</Link>
				</div>
			</header>

			<main className="flex flex-col items-center justify-center py-8 text-center">
				<p className="p-2 text-5xl font-extrabold">Sign In</p>
				<p className="text-muted-foreground">Sign in with your preferred provider.</p>
				<hr className="my-4 w-full" />

				<div className="flex flex-col items-center justify-center gap-2">
					<button className="btn bg-google text-accent-foreground" onClick={() => signIn("google")}>
						<Icon icon="simple-icons:google" className="icon" />
						Sign In With Google
					</button>
					<button className="btn bg-github text-accent-foreground" onClick={() => signIn("github")}>
						<Icon icon="simple-icons:github" className="icon" />
						Sign In With GitHub
					</button>
				</div>
			</main>
		</div>
	)
}
