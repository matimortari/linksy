import { useEffect, useRef } from "react"

export default function Dialog({ isOpen, onClose, title, children }) {
	const dialogRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose()
			}
			if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
				const form = e.target.form
				if (form) {
					e.preventDefault()
					form.requestSubmit()
				}
			}
		}

		const handleClickOutside = (e: MouseEvent) => {
			if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
				onClose()
			}
		}

		if (isOpen) {
			document.documentElement.style.overflow = "hidden"
			window.addEventListener("keydown", handleKeyDown)
			document.addEventListener("mousedown", handleClickOutside)

			setTimeout(() => {
				const firstInput = dialogRef.current?.querySelector("input, textarea, select, button") as HTMLElement | null
				firstInput?.focus()
			}, 50)
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
			<div ref={dialogRef} className="popover m-12 min-w-96 max-w-full outline-none">
				<header>
					<h2>{title}</h2>
				</header>

				<hr className="mb-4 mt-2" />

				{children}
			</div>
		</div>
	)
}
