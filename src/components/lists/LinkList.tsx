import { useAddLink, useDeleteLink, useUpdateLink } from "@/src/hooks/useMutations"
import { useGetLinks } from "@/src/hooks/useQueries"
import { useUserStore } from "@/src/hooks/useUserStore"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { useState } from "react"
import AddLinkDialog from "../dialogs/AddLinkDialog"
import UpdateLinkDialog from "../dialogs/UpdateLinkDialog"

export default function LinkList() {
	const { links, setLinks } = useUserStore()

	const { data: userLinks = [] } = useGetLinks()
	const { mutate: addLink, isSuccess: isAddSuccess, isError: isAddError, error: addError } = useAddLink()
	const { mutate: updateLink } = useUpdateLink()
	const { mutate: deleteLink, isError: isDeleteError, error: deleteError } = useDeleteLink()

	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
	const [currentLink, setCurrentLink] = useState<Link | null>(null)

	const handleAddLink = (newLink: Link) => {
		addLink(newLink, {
			onSuccess: () => {
				setLinks([...links, newLink])
				setIsAddDialogOpen(false)
			}
		})
	}

	const handleUpdateLink = (updatedLink: Link) => {
		updateLink(updatedLink, {
			onSuccess: () => {
				setLinks(links.map((l: Link) => (l.id === updatedLink.id ? updatedLink : l)))
				setIsUpdateDialogOpen(false)
			}
		})
	}

	const handleDeleteLink = (id: number) => {
		deleteLink(id, {
			onSuccess: () => {
				setLinks(links.filter((l: Link) => l.id !== id))
			}
		})
	}

	return (
		<>
			<header className="my-2">
				<h2>My Links</h2>
				<h6 className="text-muted-foreground">Manage your social links.</h6>
			</header>

			{userLinks.length === 0 ? (
				<h4 className="my-2 text-center text-muted-foreground">No links here yet. Get started!</h4>
			) : (
				<ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
					{userLinks.map((l: Link) => (
						<li key={l.id} className="card">
							<div className="flex flex-col gap-2">
								<div className="flex flex-row items-center gap-4">
									<Link href={l.url} target="_blank" rel="noopener noreferrer" className="w-full overflow-hidden">
										<h4 className="truncate">{l.title}</h4>
									</Link>

									<div className="input-group">
										<button
											onClick={() => {
												setCurrentLink(l)
												setIsUpdateDialogOpen(true)
											}}
											title="Edit Link"
										>
											<Icon icon="mdi:circle-edit-outline" width={20} height={20} className="text-accent" />
										</button>

										<button onClick={() => l.id && handleDeleteLink(l.id)} title="Remove Link">
											<Icon icon="mdi:remove-circle-outline" width={20} height={20} className="text-danger" />
										</button>
									</div>
								</div>

								<span className="truncate text-xs text-muted-foreground">{l.url}</span>
							</div>
						</li>
					))}
				</ul>
			)}

			<div className="input-group justify-end">
				{isAddSuccess && <p className="mx-2 text-sm font-semibold text-success">Link added!</p>}
				{isAddError && (
					<p className="mx-2 text-sm font-semibold text-danger">
						Error adding link: {addError?.message || "Unknown error"}
					</p>
				)}
				{isDeleteError && (
					<p className="mx-2 text-sm font-semibold text-danger">
						Error deleting link: {deleteError?.message || "Unknown error"}
					</p>
				)}

				<button onClick={() => setIsAddDialogOpen(true)} title="Add Link" className="btn bg-primary">
					<Icon icon="mdi:link-plus" width={20} height={20} />
					Add Link
				</button>
			</div>

			<AddLinkDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onSubmit={handleAddLink} />
			{currentLink && (
				<UpdateLinkDialog
					isOpen={isUpdateDialogOpen}
					onClose={() => setIsUpdateDialogOpen(false)}
					onSubmit={handleUpdateLink}
					currentLink={currentLink}
				/>
			)}
		</>
	)
}
