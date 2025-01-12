import { useUpdateUserBanner } from "@/src/hooks/useMutations"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"

export default function SupportBannerForm({ settings }) {
	const { mutate: updateBannerMutation, isPending } = useUpdateUserBanner()

	const [selectedOption, setSelectedOption] = useState("NONE")

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
		<form className="flex max-w-xs flex-row gap-2" onSubmit={handleSubmit}>
			<div className="flex flex-row items-center gap-2 rounded-2xl border border-border p-1 pl-2">
				<select value={selectedOption} onChange={(event) => setSelectedOption(event.target.value)}>
					<option value="NONE" className="bg-card text-muted-foreground">
						None
					</option>
					<option value="LGBTQ_RIGHTS" className="bg-card">
						Pride
					</option>
					<option value="ANTI_RACISM" className="bg-card">
						Anti-Racism
					</option>
					<option value="MENTAL_HEALTH" className="bg-card">
						Mental Health
					</option>
					<option value="CLIMATE_ACTION" className="bg-card">
						Climate Action
					</option>
				</select>

				<div className="input-group">
					<button type="submit" disabled={isPending} className="btn bg-primary">
						<Icon icon="material-symbols:volunteer-activism-outline" className="icon text-xl" />
						{isPending ? "Updating..." : "Update Banner"}
					</button>
				</div>
			</div>
		</form>
	)
}
