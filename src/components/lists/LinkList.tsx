import { useDeleteLink, useUpdateLink } from "@/src/hooks/useMutations"
import { useGetLinks } from "@/src/hooks/useQueries"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { useState } from "react"
import AddLinkDialog from "../dialogs/AddLinkDialog"
import UpdateLinkDialog from "../dialogs/UpdateLinkDialog"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function LinkList({ links, setLinks }) {
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
	const [currentLink, setCurrentLink] = useState<Link | null>(null)

	const { data: userLinks } = useGetLinks()
	const { mutate: updateLink } = useUpdateLink()
	const { mutate: deleteLink } = useDeleteLink()

	const handleAddLink = (newLink: Link) => {
		setLinks((prevLinks: Link[]) => [...prevLinks, newLink])
	}

	const handleUpdateLink = (updatedLink: Link) => {
		updateLink(updatedLink, {
			onSuccess: () => {
				setLinks((prevLinks: Link[]) => prevLinks.map((l: Link) => (l.id === updatedLink.id ? updatedLink : l)))
				setIsUpdateDialogOpen(false)
			}
		})
	}

	const handleDeleteLink = (id: number) => {
		deleteLink(id, {
			onSuccess: () => {
				setLinks((prevLinks: Link[]) => prevLinks.filter((l: Link) => l.id !== id))
			}
		})
	}

	return (
		<>
			<ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
				{userLinks?.map((l: Link) => (
					<li key={l.id} className="card">
						<div className="flex flex-col gap-1">
							<div className="flex flex-row gap-4">
								<Link href={l.url} target="_blank" rel="noopener noreferrer">
									{l.title}
								</Link>

								<div className="input-group">
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
							</div>

							<span className="text-xs text-muted-foreground">{l.url}</span>
						</div>
					</li>
				))}
			</ul>

			<div className="input-group">
				<button onClick={() => setIsAddDialogOpen(true)} className="btn bg-primary">
					Add Link
				</button>
			</div>

			<AddLinkDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onAddLink={handleAddLink} />

			{currentLink && (
				<UpdateLinkDialog
					isOpen={isUpdateDialogOpen}
					onClose={() => setIsUpdateDialogOpen(false)}
					onUpdateLink={handleUpdateLink}
					currentLink={currentLink}
				/>
			)}
		</>
	)
}
