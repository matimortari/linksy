import { useAddLink, useDeleteLink, useUpdateLink } from "@/src/hooks/useMutations"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { useState } from "react"
import AddLinkDialog from "../dialogs/AddLinkDialog"
import UpdateLinkDialog from "../dialogs/UpdateLinkDialog"

export default function LinkList({ links, setLinks }) {
	const { mutate: addLink } = useAddLink()
	const { mutate: updateLink } = useUpdateLink()
	const { mutate: deleteLink } = useDeleteLink()
	const [currentLink, setCurrentLink] = useState<Link | null>(null)
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)

	const handleAddLink = (newLink: Link) => {
		addLink(newLink, {
			onSuccess: (addedLink) => {
				setLinks((prevLinks: Link[]) => [...prevLinks, addedLink])
			}
		})
	}

	const handleUpdateLink = (updatedLink: Link) => {
		updateLink(updatedLink, {
			onSuccess: () => {
				setLinks((prevLinks: Link[]) => prevLinks.map((l: Link) => (l.id === updatedLink.id ? updatedLink : l)))
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
			<ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
				{links.map((l: Link) => (
					<li key={l.id} className="card flex flex-col gap-2">
						<div className="flex flex-col">
							<div className="flex flex-row gap-1">
								<Link href={l.url} target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2">
									{l.title}
								</Link>
								<button
									onClick={() => {
										setCurrentLink(l)
										setIsUpdateDialogOpen(true)
									}}
								>
									<Icon icon="mdi:circle-edit-outline" className="icon size-5 text-accent" />
								</button>
								<button onClick={() => handleDeleteLink(l.id)}>
									<Icon icon="mdi:remove-circle-outline" className="icon size-5 text-danger" />
								</button>
							</div>
							<span className="text-xs text-muted-foreground">{l.url}</span>
						</div>
					</li>
				))}
			</ul>

			<div>
				<button onClick={() => setIsAddDialogOpen(true)} className="btn bg-primary">
					Add Link
				</button>
			</div>

			<AddLinkDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onAddLink={handleAddLink} />

			{currentLink && (
				<UpdateLinkDialog
					isOpen={isUpdateDialogOpen}
					onClose={() => setIsUpdateDialogOpen(false)}
					currentLink={currentLink}
					onUpdateLink={handleUpdateLink}
				/>
			)}
		</>
	)
}
