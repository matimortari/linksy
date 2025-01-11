import "@/src/styles/animations.css"
import Image from "next/image"

export default function Loading() {
	return (
		<div className="flex h-screen items-center justify-center">
			<Image src="/spinner.png" alt="spinner" width={400} height={400} className="animate-spin" />
			<Image src="/spinner.png" alt="spinner" width={250} height={250} className="animate-spin-reverse" />
		</div>
	)
}
