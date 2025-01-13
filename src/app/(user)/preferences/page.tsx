"use client"

import AppearanceForm from "@/src/components/forms/AppearanceForm"
import SupportBannerForm from "@/src/components/forms/SupportBannerForm"
import Preview from "@/src/components/Preview"
import useAuth from "@/src/hooks/useAuth"

export default function Preferences() {
	const { slug, description, image, settings, links, buttons, setSettings } = useAuth()

	return (
		<div className="flex flex-col gap-4 md:flex-row">
			<div className="card md:w-8/12">
				<header>
					<h1>Preferences</h1>
					<h5>Manage your profile.</h5>
				</header>

				<hr className="my-4" />

				<main className="flex flex-col gap-4">
					<div className="section-container">
						<h3>Appearance</h3>
						<h6 className="text-muted-foreground">Customize the Appearance for Your Page.</h6>
						<AppearanceForm settings={settings} setSettings={setSettings} />
						<hr />
					</div>

					<div className="section-container">
						<h3>Support Banner</h3>
						<h6 className="text-muted-foreground">Show Your Support for Important Causes.</h6>
						<SupportBannerForm settings={settings} />
						<hr />
					</div>

					<div className="section-container">
						<h3>Delete Account</h3>
						<h6 className="text-danger">This action is irreversible. All data will be lost.</h6>
						<div className="input-group">
							<button className="btn bg-danger">Delete Account</button>
							<hr />
						</div>
					</div>
				</main>
			</div>

			<aside className="md:w-4/12">
				<h2>Preview</h2>
				<Preview
					slug={slug}
					description={description}
					image={image}
					settings={settings}
					links={links}
					buttons={buttons}
				/>
			</aside>
		</div>
	)
}
