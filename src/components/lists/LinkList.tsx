import { Icon } from "@iconify/react"
import Link from "next/link"

export default function LinkList({ links, setLinks }) {
	// TODO - Add Link

	// TODO - Update Link

	// TODO - Delete Link

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

								<button>
									<Icon icon="mdi:circle-edit-outline" className="icon size-5 text-accent" />
								</button>
								<button>
									<Icon icon="mdi:remove-circle-outline" className="icon size-5 text-danger" />
								</button>
							</div>
							<span className="text-xs text-muted-foreground">{l.url}</span>
						</div>
					</li>
				))}
			</ul>

			<div>
				<button className="btn bg-primary">Add Link</button>
			</div>
		</>
	)
}
