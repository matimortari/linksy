"use client"

import AppearanceForm from "@/src/components/forms/AppearanceForm"
import DeleteAccountForm from "@/src/components/forms/DeleteAccountForm"
import SupportBannerForm from "@/src/components/forms/SupportBannerForm"
import Preview from "@/src/components/Preview"
import useAuth from "@/src/hooks/useAuth"

export default function Preferences() {
	useAuth()

	return (
		<div className="flex w-full flex-col gap-4 md:flex-row">
			<main className="card md:w-8/12">
				<header className="space-y-1">
					<h2>Preferences</h2>
					<h5>Manage your profile.</h5>
				</header>

				<hr className="my-4" />

				<div className="flex flex-col gap-4">
					<section className="section-container">
						<AppearanceForm />
					</section>

					<section className="section-container">
						<SupportBannerForm />
					</section>

					<section className="section-container border-danger">
						<DeleteAccountForm />
					</section>
				</div>
			</main>

			<aside className="md:w-4/12">
				<Preview />
			</aside>
		</div>
	)
}
