import { useUpdateUserBanner } from "@/src/hooks/useMutations"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"

export default function SupportBannerForm({ settings }) {
	const [selectedOption, setSelectedOption] = useState("NONE")
	const { mutate: updateBannerMutation, isPending } = useUpdateUserBanner()

	useEffect(() => {
		if (settings) {
			setSelectedOption(settings.supportBanner || "NONE")
		}
	}, [settings])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		updateBannerMutation(selectedOption)
	}

	return (
		<form className="flex max-w-xs flex-col gap-2" onSubmit={handleSubmit}>
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
				<button type="submit" disabled={isPending} className="btn bg-primary">
					<Icon icon="material-symbols:volunteer-activism-outline" className="icon text-xl" />
					{isPending ? "Updating..." : "Update Banner"}
				</button>
			</div>
		</form>
	)
}
