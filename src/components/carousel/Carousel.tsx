"use client"

import { previewPresets } from "@/src/data/previewPresets"
import { Icon } from "@iconify/react"
import { useState } from "react"
import CarouselPreview from "./CarouselPreview"

export default function Carousel() {
	const [currentIndex, setCurrentIndex] = useState(0)

	const nextCard = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % previewPresets.length)
	}

	const prevCard = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + previewPresets.length) % previewPresets.length)
	}

	return (
		<div className="relative flex h-[500px] items-center justify-center">
			<button
				onClick={prevCard}
				className="absolute -left-2 z-10 flex items-center justify-center rounded-full"
				style={{ top: "50%", transform: "translateY(-50%)" }}
			>
				<Icon icon="ri:arrow-left-s-line" className="icon size-10 hover:text-muted" />
			</button>

			<div className="flex items-center">
				<CarouselPreview presetId={currentIndex} />
			</div>

			<button
				onClick={nextCard}
				className="absolute -right-2 z-10 flex items-center justify-center rounded-full"
				style={{ top: "50%", transform: "translateY(-50%)" }}
			>
				<Icon icon="ri:arrow-right-s-line" className="icon size-10 hover:text-muted" />
			</button>
		</div>
	)
}
