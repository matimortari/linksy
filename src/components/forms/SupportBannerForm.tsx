"use client"

import { Icon } from "@iconify/react"
import { useState } from "react"

export default function SupportBannerForm() {
	const [selectedOption, setSelectedOption] = useState("NONE")
	const [isUpdating, setIsUpdating] = useState(false)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<>
			<form className="my-2 flex max-w-xs flex-col gap-2" onSubmit={handleSubmit}>
				<select
					value={selectedOption}
					onChange={(event) => setSelectedOption(event.target.value)}
					className="appearance-none rounded-2xl border border-border bg-transparent p-4 text-sm font-medium"
				>
					<option value="NONE" className="bg-card font-medium text-muted-foreground">
						None
					</option>
					<option value="LGBTQ_RIGHTS" className="bg-card font-medium">
						Pride
					</option>
					<option value="ANTI_RACISM" className="bg-card font-medium">
						Anti-Racism
					</option>
					<option value="MENTAL_HEALTH" className="bg-card font-medium">
						Mental Health
					</option>
					<option value="CLIMATE_ACTION" className="bg-card font-medium">
						Climate Action
					</option>
				</select>

				<div>
					<button type="submit" disabled={isUpdating} className="btn bg-primary">
						<Icon icon="material-symbols:volunteer-activism-outline" className="icon text-xl" />
						{isUpdating ? "Updating..." : "Update Banner"}
					</button>
				</div>
			</form>
		</>
	)
}
