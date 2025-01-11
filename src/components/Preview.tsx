"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import UserButton from "./UserButton"
import UserLink from "./UserLink"

// TODO - Update styling
export default function Preview({ slug, description, image, settings, links, buttons }) {
	const { data: session } = useSession()

	if (!session) {
		return <p className="text-sm text-muted-foreground">Loading...</p>
	}

	return (
		<div
			className="card mx-auto my-2 min-h-96 w-full overflow-hidden"
			style={{ backgroundColor: settings?.backgroundColor }}
		>
			<div className="flex flex-col items-center justify-center gap-2 py-5 text-center">
				{image && <Image src={image} alt={slug} width={80} height={80} className="icon rounded-full" />}
				<p
					className="text-center"
					style={{
						color: settings?.slugTextColor,
						fontWeight: settings?.slugTextWeight,
						fontSize: settings?.slugTextSize
					}}
				>
					@{slug}
				</p>

				{description && (
					<p className="text-center" style={{ color: settings?.headerTextColor }}>
						{description}
					</p>
				)}

				{buttons && buttons.length > 0 ? (
					<ul className="my-2 flex flex-row justify-center gap-2">
						{buttons.map((b: Button) => (
							<UserButton
								key={b.id}
								url={b.url}
								icon={b.icon}
								buttonId={b.id}
								settings={settings}
								userId={session.user.id}
							/>
						))}
					</ul>
				) : (
					<hr />
				)}

				{links && links.length > 0 ? (
					<ul className="space-y-4">
						{links.map((l: Link) => (
							<UserLink
								key={l.id}
								url={l.url}
								title={l.title}
								linkId={l.id}
								settings={settings}
								userId={session.user.id}
							/>
						))}
					</ul>
				) : (
					<p className="text-center text-muted-foreground">No links yet.</p>
				)}
			</div>
		</div>
	)
}
