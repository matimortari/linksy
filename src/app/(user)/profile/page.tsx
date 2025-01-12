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
		<div className="flex flex-row gap-4">
			<div className="card md:w-8/12">
				<header>
					<h1>My Profile</h1>
					<h5>
						Welcome back, <span className="font-bold text-primary">{slug}</span>!
					</h5>
				</header>

				<hr className="my-4" />

				<main className="flex flex-col gap-4">
					<div className="flex flex-row justify-between rounded-2xl border border-border bg-muted p-4 text-foreground">
						<div className="flex flex-col gap-1">
							<h4 className="text-lg font-semibold">Share your Linksy Page:</h4>
							<p className="truncate text-xs font-medium">Linksy.vercel.app/{slug}</p>
						</div>
						<button className="btn bg-card">Share Now</button>
					</div>
					<hr />

					<div className="section-container">
						<h3>Update Header</h3>
						<h6 className="text-muted-foreground">Change the display name and description for your header.</h6>
						<HeaderForm description={description} setDescription={setDescription} slug={slug} setSlug={setSlug} />
						<hr />
					</div>

					<div className="section-container">
						<h3>My Links</h3>
						<h6 className="text-muted-foreground">Manage your social links.</h6>
						<LinkList links={links} setLinks={setLinks} />
						<hr />
					</div>

					<div className="section-container">
						<h3>My Social Buttons</h3>
						<h6 className="text-muted-foreground">Manage your social buttons.</h6>
						<ButtonList buttons={buttons} setButtons={setButtons} />
						<hr />
					</div>
				</main>
			</div>

			<aside className="p-4 md:w-3/12">
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
