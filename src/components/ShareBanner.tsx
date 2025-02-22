import { Icon } from "@iconify/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useUserStore } from "../hooks/useUserStore"
import QRCodeDialog from "./dialogs/QRCodeDialog"

function ShareDropdown({ isOpen, onClose }) {
	const { slug } = useUserStore()

	const [isQrCodeDialogOpen, setIsQrCodeDialogOpen] = useState(false)

	const handleCopy = () => {
		const pageUrl = `https://linksy-live.vercel.app/${slug}`
		navigator.clipboard.writeText(pageUrl)
		alert("Link copied to clipboard!")
	}

	const handleShareX = () => {
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
						<button onClick={handleCopy} className="flex flex-row items-center gap-2 rounded-2xl p-2 hover:bg-muted">
							<Icon icon="mdi:clipboard-multiple-outline" width={20} height={20} />
							Copy Link
						</button>
						<button onClick={handleShareX} className="flex flex-row items-center gap-2 rounded-2xl p-2 hover:bg-muted">
							<Icon icon="simple-icons:x" width={20} height={20} />
							Share on X
						</button>
						<button onClick={handleQRCode} className="flex flex-row items-center gap-2 rounded-2xl p-2 hover:bg-muted">
							<Icon icon="mdi:qrcode" width={20} height={20} />
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
		<div className="relative mt-2 flex max-w-lg flex-row justify-between gap-2 rounded-2xl border bg-muted p-2">
			<div className="flex w-full flex-col gap-1 overflow-x-hidden">
				<h4 className="text-foreground">Share your Linksy Page:</h4>
				<Link href={`/${slug}`} title={`linksy-live.vercel.app/${slug}`} className="truncate text-xs font-medium">
					<span>linksy-live.vercel.app/{slug}</span>
				</Link>
			</div>

			<div className="input-group">
				<button onClick={toggleDropdown} title="See sharing options" className="btn bg-card text-foreground">
					<Icon icon="mdi:share-variant" width={20} height={20} />
					Share Now
				</button>
			</div>

			<ShareDropdown isOpen={isDropdownOpen} onClose={closeDropdown} />
		</div>
	)
}
