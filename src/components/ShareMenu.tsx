import { useEffect, useState } from "react"
import { useUserStore } from "../hooks/useUserStore"
import QRCodeDialog from "./dialogs/QRCodeDialog"

export default function ShareMenu({ isOpen, onClose }) {
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
