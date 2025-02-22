import SupportBanner from "@/src/components/SupportBanner"
import UserButton from "@/src/components/UserButton"
import UserLink from "@/src/components/UserLink"
import { db } from "@/src/lib/db"
import { trackPageVisit, updateClickStats } from "@/src/lib/utils"
import { Chau_Philomene_One } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

type Params = Promise<{ slug: string }>

const chau = Chau_Philomene_One({ subsets: ["latin"], weight: "400" })

export default async function slugPage({ params }: { params: Params }) {
	const { slug } = await params

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
			<div className="flex min-h-screen flex-col items-center justify-between gap-12 p-12">
				<div className="flex flex-col items-center justify-center gap-12">
					<p className="text-center text-2xl text-muted-foreground">User `{slug}` not found.</p>
				</div>
				<Link href="/" className="flex flex-row items-center justify-start gap-2">
					<Image src="/logo.png" alt="Logo" width={35} height={35} className="icon rounded-full" />
					<span className={`text-2xl ${chau.className}`}>Linksy</span>
				</Link>
			</div>
		)
	}

	const { description, userLinks, image, userButtons, settings, id: userId } = user

	await trackPageVisit(userId)
	await updateClickStats(userId)

	const backgroundStyle =
		settings?.backgroundType === "GRADIENT"
			? {
					background: `linear-gradient(to bottom, ${settings?.backgroundGradientStart}, ${settings?.backgroundGradientEnd})`
			  }
			: { backgroundColor: settings?.backgroundColor }

	return (
		<div style={backgroundStyle} className="min-h-screen p-12 pb-24">
			<div className="flex flex-col items-center justify-center gap-3 text-center">
				{settings && settings.supportBanner !== "NONE" && <SupportBanner bannerType={settings.supportBanner} />}
				{image && (
					<Image
						src={image}
						alt={slug}
						width={100}
						height={100}
						style={{ borderRadius: settings?.profilePictureRadius }}
					/>
				)}
				<p
					style={{
						color: settings?.slugTextColor,
						fontWeight: settings?.slugTextWeight,
						fontSize: settings?.slugTextSize
					}}
				>
					@{slug}
				</p>
				{description && (
					<p
						style={{
							color: settings?.headerTextColor,
							fontWeight: settings?.headerTextWeight,
							fontSize: settings?.headerTextSize
						}}
					>
						{description}
					</p>
				)}
				{userButtons.length > 0 ? (
					<ul className="my-2 flex flex-row justify-center gap-2">
						{userButtons.map((b) => (
							<UserButton key={b.id} url={b.url} icon={b.icon} settings={settings} buttonId={b.id} userId={userId} />
						))}
					</ul>
				) : (
					<hr />
				)}
				{userLinks.length > 0 ? (
					<ul className="space-y-4">
						{userLinks.map((l) => (
							<UserLink key={l.id} url={l.url} title={l.title} settings={settings} linkId={l.id} userId={userId} />
						))}
					</ul>
				) : (
					<p className="text-center text-muted-foreground">No links yet.</p>
				)}
			</div>
		</div>
	)
}
