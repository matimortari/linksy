import Link from "next/link"
import { useEffect, useState } from "react"
import { useUserStore } from "../hooks/useUserStore"
import QRCodeDialog from "./dialogs/QRCodeDialog"

function ShareDropdown({ isOpen, onClose }) {
	const { slug } = useUserStore()

	const [isQrCodeDialogOpen, setIsQrCodeDialogOpen] = useState(false)

	const handleCopyLink = () => {
		const pageUrl = `https://linksy-live.vercel.app/${slug}`
		navigator.clipboard.writeText(pageUrl)
		alert("Link copied to clipboard!")
	}

	const handleShareTwitter = () => {
		const pageUrl = `https://linksy-live.vercel.app/${slug}`
		const tweetText = `🚀 Check out my #Linksy profile! 🌟\n\n🔗 ${pageUrl}`
		const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
		window.open(twitterUrl, "_blank")
	}

	const handleQRCode = () => {
		setIsQrCodeDialogOpen(true)
	}

	const handleClickOutside = (e: MouseEvent) => {
		if (!(e.target as HTMLElement).closest(".popover")) onClose()
	}

	useEffect(() => {
		if (isOpen) {
			document.addEventListener("click", handleClickOutside)
		} else {
			document.removeEventListener("click", handleClickOutside)
		}
		return () => document.removeEventListener("click", handleClickOutside)
	}, [isOpen])

	return (
		<>
			{isOpen && (
				<div className="animate-slide-in popover absolute right-0 top-full">
					<div className="flex flex-col items-start gap-2 text-xs font-semibold">
						<button className="rounded-2xl p-2 hover:bg-muted" onClick={handleCopyLink}>
							Copy Link
						</button>
						<button className="rounded-2xl p-2 hover:bg-muted" onClick={handleShareTwitter}>
							Share on X
						</button>
						<button className="rounded-2xl p-2 hover:bg-muted" onClick={handleQRCode}>
							Get QR Code
						</button>
					</div>
				</div>
			)}

			{isQrCodeDialogOpen && (
				<QRCodeDialog isOpen={isQrCodeDialogOpen} onClose={() => setIsQrCodeDialogOpen(false)} slug={slug} />
			)}
		</>
	)
}

export default function ShareBanner() {
	const { slug } = useUserStore()

	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev)
	}

	const closeDropdown = () => {
		setIsDropdownOpen(false)
	}

	return (
		<div className="relative mt-2 flex max-w-lg flex-row justify-between rounded-2xl border bg-muted p-2">
			<div className="flex flex-col gap-1">
				<p className="text-base font-semibold text-foreground">Share your Linksy Page:</p>
				<Link href={`/${slug}`} className="truncate text-xs font-medium">
					linksy-live.vercel.app/{slug}
				</Link>
			</div>
			<div className="input-group">
				<button type="button" className="btn bg-card text-foreground" onClick={toggleDropdown}>
					Share Now
				</button>
			</div>
			<ShareDropdown isOpen={isDropdownOpen} onClose={closeDropdown} />
		</div>
	)
}
