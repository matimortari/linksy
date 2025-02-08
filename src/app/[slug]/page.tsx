import SupportBanner from "@/src/components/SupportBanner"
import UserButton from "@/src/components/UserButton"
import UserLink from "@/src/components/UserLink"
import { db } from "@/src/lib/db"
import { trackPageVisit, updateClickStats } from "@/src/lib/utils"
import Image from "next/image"

export default async function UserPage({ params }: Readonly<{ params: { slug: string } }>) {
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

	// Set the background style dynamically based on user settings
	const backgroundStyle =
		settings?.backgroundType === "GRADIENT"
			? {
					background: `linear-gradient(to bottom, ${settings?.backgroundGradientStart}, ${settings?.backgroundGradientEnd})`
			  }
			: { backgroundColor: settings?.backgroundColor }

	return (
		<div className="min-h-screen p-12" style={backgroundStyle}>
			<div className={`flex flex-col items-center justify-center gap-3 text-center`}>
				{settings && settings.supportBanner !== "NONE" && <SupportBanner bannerType={settings.supportBanner} />}
				{image && (
					<Image
						src={image}
						alt={slug}
						width={100}
						height={100}
						className="icon"
						style={{ borderRadius: settings?.profilePictureRadius }}
					/>
				)}
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

				{/* Buttons Section */}
				{userButtons.length > 0 ? (
					<ul className="my-2 flex flex-row justify-center gap-2">
						{userButtons.map((b) => (
							<UserButton
								key={b.id}
								url={b.url}
								icon={b.icon}
								settings={settings}
								buttonId={b.id}
								userId={userId}
								shadowWeight={settings?.buttonShadowWeight || "medium"}
							/>
						))}
					</ul>
				) : (
					<hr />
				)}

				{/* Links Section */}
				{userLinks.length > 0 ? (
					<ul className="space-y-4">
						{userLinks.map((l) => (
							<UserLink
								key={l.id}
								url={l.url}
								title={l.title}
								settings={settings}
								linkId={l.id}
								userId={userId}
								shadowWeight={settings?.linkShadowWeight || "medium"}
							/>
						))}
					</ul>
				) : (
					<p className="text-center text-muted-foreground">No links yet.</p>
				)}

				{settings?.showCopyButton && <button className="mt-4 rounded border p-2">Copy Profile Link</button>}
			</div>
		</div>
	)
}
