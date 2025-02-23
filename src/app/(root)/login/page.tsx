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

			<main className="relative z-10 flex flex-col items-center px-4 py-12 md:px-12 md:py-0">
				{/* Sign-in form */}
				<motion.div
					className="card shadow-2xl"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
				>
					<div className="m-8 flex flex-col items-center gap-4 text-center">
						<Image src="/logo.png" alt="Logo" width={70} height={70} />

						<h1 className={`${bowlby.className}`}>Sign In</h1>

						<hr className="w-full" />

						<h4 className={`${lato.className} mb-4 text-muted-foreground`}>
							Sign in with Google or GitHub to continue.
						</h4>

						<div className="flex flex-row items-center justify-center gap-4">
							<button
								onClick={() => signIn("google")}
								title="Sign In with Google"
								className="rounded-full border bg-[#db4437] p-4 text-white"
							>
								<Icon icon="simple-icons:google" width={25} height={25} />
							</button>

							<button
								onClick={() => signIn("github")}
								title="Sign In with GitHub"
								className="rounded-full border bg-[#333333] p-4 text-white"
							>
								<Icon icon="simple-icons:github" width={25} height={25} />
							</button>
						</div>
					</div>
				</motion.div>
			</main>
		</div>
	)
}
