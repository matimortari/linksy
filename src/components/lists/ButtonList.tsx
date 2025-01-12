import { useDeleteButton } from "@/src/hooks/useMutations"
import { useGetButtons } from "@/src/hooks/useQueries"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { useState } from "react"
import AddButtonDialog from "../dialogs/AddButtonDialog"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ButtonList({ buttons, setButtons }) {
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

	const { data: userButtons } = useGetButtons()
	const { mutate: deleteButton } = useDeleteButton()

	const handleDeleteButton = (id: number) => {
		deleteButton(id, {
			onSuccess: () => {
				setButtons((prevButtons: Button[]) => prevButtons.filter((b: Button) => b.id !== id))
			}
		})
	}

	return (
		<>
			<ul className="flex flex-row gap-2">
				{userButtons?.map((b: Button) => (
					<li key={b.id} className="card relative">
						<Link href={b.url} target="_blank" rel="noopener noreferrer">
							<Icon icon={b.icon} className="m-1 size-6" />
						</Link>

						<button onClick={() => handleDeleteButton(b.id)} className="absolute bottom-0 right-0 p-1">
							<Icon icon="mdi:remove-circle-outline" className="icon size-5 text-danger" />
						</button>
					</li>
				))}
			</ul>

			<div className="input-group">
				<button onClick={() => setIsAddDialogOpen(true)} className="btn bg-primary">
					Add Social Button
				</button>
			</div>

			<AddButtonDialog
				isOpen={isAddDialogOpen}
				onClose={() => setIsAddDialogOpen(false)}
				onAddButton={(newButton: Button) => setButtons((prev: Button[]) => [...prev, newButton])}
			/>
		</>
	)
}
