import Image from "next/image"

export default function Loading() {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<Image src="/spinner.png" alt="spinner" width={400} height={400} className="animate-spin" />
			<Image src="/spinner.png" alt="spinner" width={250} height={250} className="animate-spin-reverse" />{" "}
		</div>
	)
}
