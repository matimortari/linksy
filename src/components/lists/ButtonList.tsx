import { Icon } from "@iconify/react"
import Link from "next/link"

export default function LinkList({ buttons, setButtons }) {
	// TODO - Add Social Button

	// TODO - Delete Social Button

	return (
		<>
			<ul className="flex flex-row gap-2">
				{buttons.map((b: Button) => (
					<li key={b.id} className="card relative flex flex-col gap-2">
						<Link href={b.url} target="_blank" rel="noopener noreferrer">
							<Icon icon={b.icon} />
						</Link>
						<button className="absolute bottom-0 right-0 p-1 text-danger">
							<Icon icon="mdi:remove-circle-outline" className="icon size-5" />
						</button>
					</li>
				))}
			</ul>

			<div>
				<button className="btn bg-primary">Add Social Button</button>
			</div>
		</>
	)
}
