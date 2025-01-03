"use client"

import UpdateHeaderForm from "@/src/components/forms/UpdateHeaderForm"
import UpdateSlugForm from "@/src/components/forms/UpdateSlugForm"
import ButtonList from "@/src/components/lists/ButtonList"
import LinkList from "@/src/components/lists/LinkList"
import Navbar from "@/src/components/Navbar"
import Preview from "@/src/components/Preview"
import useUser from "@/src/hooks/useUser"
import { useSession } from "next-auth/react"

export default function Dashboard() {
	const { data: session } = useSession()
	const { slug, setSlug, description, setDescription, image, settings, links, setLinks, buttons, setButtons } =
		useUser()

	return (
		<div className="flex min-h-screen flex-col md:flex-row">
			<aside className="p-4 md:w-2/12">
				<Navbar slug={slug} image={image} />
			</aside>

			<main className="card md:w-7/12">
				<header className="mb-2 flex flex-col">
					<h1>Dashboard</h1>
					<span className="description-label">
						Welcome back, <span className="font-bold text-primary">{session?.user?.name}</span>!
					</span>
				</header>
				<hr />

				<div className="flex flex-col">
					<div className="my-4 flex flex-col">
						<h3>Update Slug</h3>
						<p className="description-label text-muted-foreground">Customize your profile URL.</p>
						<UpdateSlugForm setSlug={setSlug} />
					</div>
					<hr />

					<div className="my-4 flex flex-col">
						<h3>Update Header</h3>
						<p className="description-label text-muted-foreground">Update the description for your profile header.</p>
						<UpdateHeaderForm setDescription={setDescription} />
					</div>
					<hr />

					<div className="my-4 flex flex-col">
						<h3 className="subtitle">My Links</h3>
						<p className="description-label text-muted-foreground">Manage your links.</p>
						<LinkList links={links} setLinks={setLinks} />
					</div>
					<hr />

					<div className="my-4 flex flex-col">
						<h3 className="subtitle">My Social Buttons</h3>
						<h6 className="text-muted-foreground">Manage your social buttons.</h6>
						<ButtonList buttons={buttons} setButtons={setButtons} />
					</div>
					<hr />
				</div>
			</main>

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
