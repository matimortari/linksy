"use client"

import UpdateHeaderForm from "@/src/components/forms/UpdateHeaderForm"
import UpdateSlugForm from "@/src/components/forms/UpdateSlugForm"
import ButtonList from "@/src/components/lists/ButtonList"
import LinkList from "@/src/components/lists/LinkList"
import Preview from "@/src/components/Preview"
import useAuth from "@/src/hooks/useAuth"

export default function Profile() {
	const { slug, setSlug, description, setDescription, image, settings, links, setLinks, buttons, setButtons } =
		useAuth()

	return (
		<div className="flex flex-row gap-4">
			<div className="card md:w-8/12">
				<header>
					<h1>Profile</h1>
					<h5>
						Welcome back, <span className="font-bold text-primary">{slug}</span>!
					</h5>
				</header>

				<hr className="my-4" />

				<main className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<h3>Update Slug</h3>
						<h6 className="text-muted-foreground">Change the URL for your page.</h6>
						<UpdateSlugForm setSlug={setSlug} />
						<hr />
					</div>

					<div className="flex flex-col gap-2">
						<h3>Update Description</h3>
						<h6 className="text-muted-foreground">Change the description for your header.</h6>
						<UpdateHeaderForm setDescription={setDescription} />
						<hr />
					</div>

					<div className="flex flex-col gap-2">
						<h3>My Links</h3>
						<h6 className="text-muted-foreground">Manage your social links.</h6>
						<LinkList links={links} setLinks={setLinks} />
						<hr />
					</div>

					<div className="flex flex-col gap-2">
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
