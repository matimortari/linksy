"use client"

import HeaderForm from "@/src/components/forms/HeaderForm"
import ButtonList from "@/src/components/lists/ButtonList"
import LinkList from "@/src/components/lists/LinkList"
import Preview from "@/src/components/Preview"
import ShareMenu from "@/src/components/ShareMenu"
import useAuth from "@/src/hooks/useAuth"
import { useUserStore } from "@/src/lib/store"
import Link from "next/link"
import { useState } from "react"

export default function Profile() {
	useAuth()

	const { slug } = useUserStore()

	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev)
	}

	const closeDropdown = () => {
		setIsDropdownOpen(false)
	}

	return (
		<div className="flex flex-col gap-4 md:flex-row">
			<div className="card md:w-8/12">
				<header>
					<h1>My Profile</h1>
					<h5>
						Welcome back, <span className="font-bold text-primary">{slug}</span>!
					</h5>
				</header>

				<div className="relative mt-2 flex max-w-lg flex-row justify-between rounded-2xl border bg-muted p-2">
					<div className="flex flex-col gap-1">
						<p className="text-base font-semibold text-foreground">Share your Linksy Page:</p>
						<Link href={`/${slug}`} className="truncate text-xs font-medium">
							linksy-live.vercel.app/{slug}
						</Link>
					</div>
					<div className="input-group">
						<button type="button" className="btn bg-card text-foreground" onClick={toggleDropdown}>
							Share Now
						</button>
					</div>

					<ShareMenu isOpen={isDropdownOpen} onClose={closeDropdown} />
				</div>

				<hr className="my-4" />

				<main className="flex flex-col gap-4">
					<div className="section-container">
						<h3>Update Header</h3>
						<h6 className="text-muted-foreground">Change your display name and description.</h6>
						<HeaderForm />
					</div>

					<div className="section-container">
						<h3>My Links</h3>
						<h6 className="text-muted-foreground">Manage your social links.</h6>
						<LinkList />
					</div>

					<div className="section-container">
						<h3>My Social Buttons</h3>
						<h6 className="text-muted-foreground">Manage your social buttons.</h6>
						<ButtonList />
					</div>
				</main>
			</div>

			<aside className="md:w-4/12">
				<Preview />
			</aside>
		</div>
	)
}
