"use client"

import AppearanceForm from "@/src/components/AppearanceForm"
import Preview from "@/src/components/Preview"
import SupportBannerForm from "@/src/components/SupportBannerForm"
import useAuth from "@/src/hooks/useAuth"
import { deleteAccount } from "@/src/services/userService"

export default function Preferences() {
	useAuth()

	const handleDeleteAccount = async () => {
		const confirm = window.confirm("Are you sure you want to delete your account?")
		if (!confirm) return false
		else {
			const response = await deleteAccount()
			if (response.error) {
				alert(response.error)
			} else {
				window.location.href = "/"
			}
		}
	}

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
						<h3>Appearance</h3>
						<h6 className="text-muted-foreground">Customize the Appearance for Your Page.</h6>
						<AppearanceForm />
					</section>

					<section className="section-container">
						<h3>Support Banner</h3>
						<h6 className="text-muted-foreground">Show Your Support for Important Causes.</h6>
						<SupportBannerForm />
					</section>

					<section className="section-container border-danger">
						<h3>Delete Account</h3>
						<h6 className="text-danger">This action is irreversible. All data will be lost.</h6>
						<div className="input-group">
							<button onClick={handleDeleteAccount} className="btn bg-danger">
								Delete Account
							</button>
						</div>
					</section>
				</div>
			</main>

			<aside className="md:w-4/12">
				<Preview />
			</aside>
		</div>
	)
}
