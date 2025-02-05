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
		<Dialog title="My QR Code" isOpen={isOpen} onClose={onClose}>
			<div className="my-4 flex flex-col items-center gap-4">
				<QRCodeCanvas value={`https://linksy-live.vercel.app/${slug}`} size={200} />

				<p className="text-sm text-muted-foreground">Scan this QR code to visit your Linksy profile!</p>

				<div className="input-group">
					<button onClick={() => handleDownloadQRCode(slug)} className="btn bg-primary">
						Download QR Code
					</button>
					<button className="btn bg-danger" onClick={onClose}>
						Close
					</button>
				</div>
			</div>
		</Dialog>
	)
}
