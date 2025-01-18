import SupportBanner from "@/src/components/SupportBanner"
import UserButton from "@/src/components/UserButton"
import UserLink from "@/src/components/UserLink"
import { db } from "@/src/lib/db"
import { trackPageVisit, updateClickStats } from "@/src/lib/utils"
import Image from "next/image"

export default async function UserPage({ params }: { params: { slug: string } }) {
	const { slug } = params

	const user = await db.user.findUnique({
		where: { slug },
		include: {
			userLinks: true,
			userButtons: true,
			settings: true
		}
	})

	if (!user) {
		return (
			<div className="main-container">
				<div className="mb-2 flex flex-col items-center justify-center gap-3">
					<p className="text-center text-muted-foreground">User `{slug}` not found.</p>
				</div>
			</div>
		)
	}

	const { description, userLinks, image, userButtons, settings, id: userId } = user

	await trackPageVisit(userId)
	await updateClickStats(userId)

	return (
		<div className="min-h-screen p-12" style={{ backgroundColor: settings?.backgroundColor }}>
			<div className="flex flex-col items-center justify-center gap-3 text-center">
				{settings && settings.supportBanner !== "NONE" && <SupportBanner bannerType={settings.supportBanner} />}
				{image && <Image src={image} alt={slug} width={100} height={100} className="icon rounded-full" />}
				<p
					style={{
						color: settings?.slugTextColor,
						fontWeight: settings?.slugTextWeight,
						fontSize: settings?.slugTextSize
					}}
					className="text-center"
				>
					@{slug}
				</p>
				{description && (
					<p style={{ color: settings?.headerTextColor }} className="max-w-lg text-center">
						{description}
					</p>
				)}

				{userButtons.length > 0 ? (
					<ul className="my-2 flex flex-row justify-center gap-2">
						{userButtons.map((button) => (
							<UserButton
								key={button.id}
								url={button.url}
								icon={button.icon}
								settings={settings}
								buttonId={button.id}
								userId={userId}
							/>
						))}
					</ul>
				) : (
					<hr />
				)}

				{userLinks.length > 0 ? (
					<ul className="space-y-4">
						{userLinks.map((link) => (
							<UserLink
								key={link.id}
								url={link.url}
								title={link.title}
								settings={settings}
								linkId={link.id}
								userId={userId}
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
