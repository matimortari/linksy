import { Icon } from "@iconify/react"
import Link from "next/link"

export default function Footer() {
	return (
		<footer className="flex flex-col items-center justify-between gap-4 p-4 md:flex-row">
			<div className="mx-4 whitespace-nowrap font-light text-muted-foreground">
				<p>© 2025 Matheus Mortari. All rights reserved.</p>
			</div>

			<div className="mx-4 flex flex-row gap-4 text-muted-foreground">
				<Link href="https://github.com/matimortari" target="_blank" aria-label="GitHub">
					<Icon icon="simple-icons:github" className="icon size-6" />
				</Link>
				<Link href="https://www.linkedin.com/in/matheus-mortari-19rt" target="_blank" aria-label="LinkedIn">
					<Icon icon="simple-icons:linkedin" className="icon size-6" />
				</Link>
			</div>
		</footer>
	)
}
