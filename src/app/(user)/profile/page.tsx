"use client"

import HeaderForm from "@/src/components/forms/HeaderForm"
import ButtonList from "@/src/components/lists/ButtonList"
import LinkList from "@/src/components/lists/LinkList"
import Preview from "@/src/components/Preview"
import useAuth from "@/src/hooks/useAuth"

export default function Profile() {
	const { slug, setSlug, description, setDescription, image, settings, links, buttons, setLinks, setButtons } =
		useAuth()

	return (
		<div className="flex flex-col gap-4 md:flex-row">
			<div className="card md:w-8/12">
				<header>
					<h1>My Profile</h1>
					<h5>
						Welcome back, <span className="font-bold text-primary">{slug}</span>!
					</h5>
				</header>

				<div className="mt-2 flex max-w-lg flex-row justify-between rounded-2xl border bg-muted p-2">
					<div className="flex flex-col gap-1">
						<p className="text-base font-semibold text-foreground">Share your Linksy Page:</p>
						<p className="truncate text-xs font-medium">Linksy.vercel.app/{slug}</p>
					</div>
					<div className="input-group">
						<button type="submit" className="btn bg-card text-foreground">
							Share Now
						</button>
					</div>
				</div>

				<hr className="my-4" />

				<main className="flex flex-col gap-4">
					<div className="section-container card">
						<h3>Update Header</h3>
						<h6 className="text-muted-foreground">Change your display name and description.</h6>
						<HeaderForm description={description} setDescription={setDescription} slug={slug} setSlug={setSlug} />
					</div>

					<div className="section-container card">
						<h3>My Links</h3>
						<h6 className="text-muted-foreground">Manage your social links.</h6>
						<LinkList links={links} setLinks={setLinks} />
					</div>

					<div className="section-container card">
						<h3>My Social Buttons</h3>
						<h6 className="text-muted-foreground">Manage your social buttons.</h6>
						<ButtonList buttons={buttons} setButtons={setButtons} />
					</div>
				</main>
			</div>

			<aside className="md:w-4/12">
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
