import { useEffect, useRef } from "react"

export default function Dialog({ isOpen, onClose, title, children }) {
	const dialogRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose() // Close dialog on Escape key press
			}
		}

		const handleClickOutside = (e: MouseEvent) => {
			if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
				onClose() // Close dialog on outside click
			}
		}

		// Prevent scrolling when dialog is open
		if (isOpen) {
			document.body.style.overflow = "hidden"
			window.addEventListener("keydown", handleKeyDown)
			document.addEventListener("mousedown", handleClickOutside)
		} else {
			document.body.style.overflow = ""
		}

		return () => {
			document.body.style.overflow = "" // Ensure scrolling is restored on cleanup
			window.removeEventListener("keydown", handleKeyDown)
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
			<div ref={dialogRef} className="popover m-12 min-w-96 max-w-full">
				{title && <h2 className="font-bold">{title}</h2>}
				<div>{children}</div>
			</div>
		</div>
	)
}
