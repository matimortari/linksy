import { useEffect, useRef } from "react"

export default function Dialog({ isOpen, onClose, title, children }) {
	const dialogRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose()
			}
		}

		const handleClickOutside = (e: MouseEvent) => {
			if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
				onClose()
			}
		}

		// Prevent scrolling when dialog is open
		if (isOpen) {
			document.documentElement.style.overflow = "hidden"
			window.addEventListener("keydown", handleKeyDown)
			document.addEventListener("mousedown", handleClickOutside)
		} else {
			document.documentElement.style.overflow = ""
		}

		return () => {
			document.documentElement.style.overflow = ""
			window.removeEventListener("keydown", handleKeyDown)
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	return (
		<div className="animate-slide-in fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
			<div ref={dialogRef} className="popover m-12 min-w-96 max-w-full">
				<header>
					<h2>{title}</h2>
				</header>

				<hr className="mb-4 mt-2" />

				<main>{children}</main>
			</div>
		</div>
	)
}
