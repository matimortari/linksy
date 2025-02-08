"use client"

import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { signIn, useSession } from "next-auth/react"
import { Bowlby_One, Lato } from "next/font/google"
import Image from "next/image"
import { redirect } from "next/navigation"

const bowlby = Bowlby_One({ subsets: ["latin"], weight: "400" })
const lato = Lato({ subsets: ["latin"], weight: "400" })

export default function Login() {
	const { status } = useSession()

	if (status === "authenticated") {
		redirect("/")
	}

	return (
		<div className="relative min-h-screen">
			<div className="absolute inset-x-0 bottom-0 hidden opacity-20 md:block md:h-3/6">
				<Image src="/grid-bg.png" alt="Background" fill />
			</div>

			<main className="relative z-10 flex flex-col items-center px-4 py-8 md:px-12 md:py-0">
				{/* Sign-in form */}
				<motion.div
					className="popover"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
				>
					<div className="m-8 flex flex-col gap-4 text-center">
						<h1 className={`${bowlby.className}`}>Sign In</h1>

						<hr className="my-2" />

						<h3 className={`${lato.className} mb-4 text-muted-foreground`}>
							Sign in with your preferred provider to continue.
						</h3>

						<div className="flex flex-row items-center justify-center gap-4">
							<button
								className="flex items-center justify-center rounded-full border bg-[#db4437] p-4 text-white"
								onClick={() => signIn("google")}
							>
								<Icon icon="simple-icons:google" className="icon size-6" />
							</button>

							<button
								className="flex items-center justify-center rounded-full border bg-[#333333] p-4 text-white"
								onClick={() => signIn("github")}
							>
								<Icon icon="simple-icons:github" className="icon size-6" />
							</button>
						</div>
					</div>
				</motion.div>
			</main>
		</div>
	)
}
