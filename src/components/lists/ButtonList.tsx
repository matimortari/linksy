import { useAddButton, useDeleteButton } from "@/src/hooks/useMutations"
import { useGetButtons } from "@/src/hooks/useQueries"
import { useUserStore } from "@/src/hooks/useUserStore"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { useState } from "react"
import AddButtonDialog from "../dialogs/AddButtonDialog"

export default function ButtonList() {
	const { buttons, setButtons } = useUserStore()

	const { data: userButtons = [] } = useGetButtons()
	const { mutate: addButton, isSuccess: isAddSuccess, isError: isAddError, error: addError } = useAddButton()
	const { mutate: deleteButton, isError: isDeleteError, error: deleteError } = useDeleteButton()

	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

	const handleAddButton = (newButton: Button) => {
		addButton(newButton, {
			onSuccess: () => {
				setButtons([...buttons, newButton])
				setIsAddDialogOpen(false)
			}
		})
	}

	const handleDeleteButton = (id: number) => {
		deleteButton(id, {
			onSuccess: () => {
				setButtons(buttons.filter((b: Button) => b.id !== id))
			}
		})
	}

	return (
		<>
			<header className="my-2">
				<h2>My Social Buttons</h2>
				<h6 className="text-muted-foreground">Manage your social buttons.</h6>
			</header>

			{userButtons.length === 0 ? (
				<h4 className="my-2 text-center text-muted-foreground">No social buttons here yet. Get started!</h4>
			) : (
				<ul className="flex flex-row gap-2">
					{userButtons.map((b: Button) => (
						<li key={b.id} className="card relative">
							<Link href={b.url} title={b.platform} target="_blank" rel="noopener noreferrer">
								<Icon icon={b.icon} width={25} height={25} className="m-1" />
							</Link>

							{b.id && (
								<button
									onClick={() => b.id && handleDeleteButton(b.id)}
									title="Remove Social Button"
									className="absolute bottom-0 right-0 p-1"
								>
									<Icon icon="mdi:remove-circle-outline" width={20} height={20} className="text-danger" />
								</button>
							)}
						</li>
					))}
				</ul>
			)}

			<div className="input-group justify-end">
				{isAddSuccess && <p className="mx-2 text-sm font-semibold text-success">Button added!</p>}
				{isAddError && (
					<p className="mx-2 text-sm font-semibold text-danger">
						Error adding button: {addError?.message || "Unknown error"}
					</p>
				)}
				{isDeleteError && (
					<p className="mx-2 text-sm font-semibold text-danger">
						Error deleting button: {deleteError?.message || "Unknown error"}
					</p>
				)}

				<button onClick={() => setIsAddDialogOpen(true)} title="Add Social Button" className="btn bg-primary">
					<Icon icon="mdi:shape-circle-plus" width={20} height={20} />
					Add Social Button
				</button>
			</div>

			<AddButtonDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onSubmit={handleAddButton} />
		</>
	)
}
