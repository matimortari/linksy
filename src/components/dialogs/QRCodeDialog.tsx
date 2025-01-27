import { QRCodeCanvas } from "qrcode.react"
import Dialog from "../Dialog"

export default function QRCodeDialog({ isOpen, slug, onClose }) {
	const handleDownloadQRCode = (slug: string) => {
		const canvas = document.querySelector("canvas")
		if (canvas) {
			const dataUrl = canvas.toDataURL("image/png")
			const link = document.createElement("a")
			link.href = dataUrl
			link.download = `${slug}-qrcode.png`
			link.click()
		}
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} title="My QR Code">
			<div className="my-4 flex flex-col items-center gap-4">
				<div>
					<QRCodeCanvas value={`https://linksy-live.vercel.app/${slug}`} size={200} />
				</div>
				<p className="text-sm text-muted-foreground">Scan this QR code to visit your Linksy profile!</p>
				<div className="flex gap-2">
					<button className="btn bg-primary" onClick={() => handleDownloadQRCode(slug)}>
						Download QR Code
					</button>
					<button className="btn bg-secondary" onClick={onClose}>
						Close
					</button>
				</div>
			</div>
		</Dialog>
	)
}
