import { Icon } from "@iconify/react"
import Link from "next/link"
import { useState } from "react"
import AddButtonDialog from "../dialogs/AddButtonDialog"

export default function ButtonList({ buttons, setButtons }) {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleAddButton = (newButton: Button) => {
		setButtons((prevButtons: Button[]) => [...prevButtons, newButton])
	}

	const handleDeleteButton = (id: number) => {
		setButtons(buttons.filter((b: Button) => b.id !== id))
	}

	return (
		<>
			<ul className="flex flex-row gap-2">
				{buttons.map((b: Button) => (
					<li key={b.id} className="card relative flex flex-col gap-2">
						<Link href={b.url} target="_blank" rel="noopener noreferrer">
							<Icon icon={b.icon} />
						</Link>
						<button onClick={() => handleDeleteButton(b.id)} className="absolute bottom-0 right-0 p-1 text-danger">
							<Icon icon="mdi:remove-circle-outline" className="icon size-5" />
						</button>
					</li>
				))}
			</ul>

			<div>
				<button onClick={() => setIsModalOpen(true)} className="btn bg-primary">
					Add Social Button
				</button>
			</div>

			<AddButtonDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddButton={handleAddButton} />
		</>
	)
}
