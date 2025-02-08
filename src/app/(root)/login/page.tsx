"use client"

import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { signIn, useSession } from "next-auth/react"
import { Bowlby_One, Lato } from "next/font/google"
import Image from "next/image"
import { redirect } from "next/navigation"

const bowlby = Bowlby_One({ subsets: ["latin"], weight: "400" })
const lato = Lato({ subsets: ["latin"], weight: "900" })

export default function Login() {
	const { status } = useSession()

	if (status === "authenticated") {
		redirect("/")
	}

	return (
		<div className="relative min-h-screen">
			<div className="absolute inset-x-0 bottom-0 z-0 hidden opacity-20 md:block md:h-3/6">
				<Image src="/grid-bg.png" alt="Background" fill />
			</div>

			<main className="relative z-10 flex flex-col items-center justify-between md:p-8">
				{/* Sign In form */}
				<motion.div
					className="popover gap-4 text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className="flex flex-col items-center gap-4 p-8">
						<h1 className={`${bowlby.className}`}>Sign In</h1>
						<h4 className={`${lato.className} text-muted-foreground`}>Sign in with your preferred provider.</h4>
					</div>

					<hr />

					<div className="flex flex-row items-center justify-center gap-4 p-8">
						<button
							className="flex items-center justify-center rounded-full border bg-[#db4437] p-3 text-white"
							onClick={() => signIn("google")}
						>
							<Icon icon="simple-icons:google" className="icon size-5" />
						</button>
						<button
							className="flex items-center justify-center rounded-full border bg-[#333333] p-3 text-white"
							onClick={() => signIn("github")}
						>
							<Icon icon="simple-icons:github" className="icon size-5" />
						</button>
					</div>
				</motion.div>
			</main>
		</div>
	)
}
