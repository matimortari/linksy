"use client"

import { defaultSettings } from "@/src/data/userSettings"
import { useUpdateUserBanner } from "@/src/hooks/useMutations"
import { getUserSettings } from "@/src/lib/actions"
import { Icon } from "@iconify/react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export default function SupportBannerForm() {
	const [selectedOption, setSelectedOption] = useState("NONE")

	const { data: settings = defaultSettings, isPending } = useQuery({
		queryKey: ["userSettings"],
		queryFn: getUserSettings
	})
	const { mutate: updateBannerMutation, isPending: isUpdating, isSuccess, isError } = useUpdateUserBanner()

	useEffect(() => {
		if (settings) {
			setSelectedOption(settings.supportBanner || "NONE")
		}
	}, [settings])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		updateBannerMutation(selectedOption)
	}

	if (isPending) return <p className="description-label text-muted-foreground">Loading support banner options...</p>

	return (
		<>
			<form className="my-2 flex max-w-xs flex-col gap-2" onSubmit={handleSubmit}>
				<select
					value={selectedOption}
					onChange={(event) => setSelectedOption(event.target.value)}
					className="form-container appearance-none bg-transparent text-sm font-medium"
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
					<button type="submit" disabled={isUpdating} className="btn bg-primary text-primary-foreground">
						<Icon icon="material-symbols:volunteer-activism-outline" className="icon text-xl" />
						{isUpdating ? "Updating..." : "Update Banner"}
					</button>
				</div>
			</form>

			{isSuccess && <p className="description-label text-success">Support banner updated successfully!</p>}
			{isError && <p className="description-label text-danger">Failed to update support banner.</p>}
		</>
	)
}
