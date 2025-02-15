import { useDeleteButton } from "@/src/hooks/useMutations"
import { useGetButtons } from "@/src/hooks/useQueries"
import { useUserStore } from "@/src/hooks/useUserStore"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { useState } from "react"
import AddButtonDialog from "../dialogs/AddButtonDialog"

export default function ButtonList() {
	const { buttons, setButtons } = useUserStore()
	const { data: userButtons } = useGetButtons()
	const { mutate: deleteButton } = useDeleteButton()

	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

	const handleDeleteButton = (id: number) => {
		deleteButton(id, {
			onSuccess: () => {
				setButtons(buttons.filter((b: Button) => b.id !== id))
			}
		})
	}

	const handleAddButton = (newButton: Button) => {
		setButtons([...buttons, newButton])
	}

	return (
		<>
			<header className="my-2">
				<h2>My Social Buttons</h2>
				<h6 className="text-muted-foreground">Manage your social buttons.</h6>
			</header>

			{userButtons == 0 ? (
				<h4 className="my-2 text-center text-muted-foreground">No social buttons here yet. Get started!</h4>
			) : (
				<ul className="flex flex-row gap-2">
					{userButtons?.map((b: Button) => (
						<li key={b.id} className="card relative">
							<Link href={b.url} title={b.platform} target="_blank" rel="noopener noreferrer">
								<Icon icon={b.icon} className="m-1 size-6" />
							</Link>

							{b.id !== undefined && (
								<button
									onClick={() => b.id !== undefined && handleDeleteButton(b.id)}
									title="Remove Social Button"
									className="absolute bottom-0 right-0 p-1"
								>
									<Icon icon="mdi:remove-circle-outline" className="icon size-5 text-danger" />
								</button>
							)}
						</li>
					))}
				</ul>
			)}

			<div className="input-group justify-end">
				<button onClick={() => setIsAddDialogOpen(true)} title="Add Social Button" className="btn bg-primary">
					Add Social Button
				</button>
			</div>

			<AddButtonDialog
				isOpen={isAddDialogOpen}
				onClose={() => setIsAddDialogOpen(false)}
				onAddButton={handleAddButton}
			/>
		</>
	)
}
