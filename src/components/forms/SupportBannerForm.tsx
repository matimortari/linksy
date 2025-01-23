import { useUpdateSupportBanner } from "@/src/hooks/useMutations"
import { Icon } from "@iconify/react"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"

export default function SupportBannerForm({ settings }) {
	const { mutate: updateBannerMutation, isPending } = useUpdateSupportBanner()

	const { control, handleSubmit, reset } = useForm<SupportBannerFormData>({
		defaultValues: {
			supportBanner: "NONE"
		}
	})

	useEffect(() => {
		if (settings?.supportBanner) {
			reset({ supportBanner: settings.supportBanner })
		}
	}, [settings, reset])

	const onSubmit = (data: SupportBannerFormData) => {
		updateBannerMutation(data.supportBanner)
	}

	return (
		<form className="flex max-w-xs flex-row gap-2" onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-row items-center gap-2 rounded-2xl border bg-card p-1 pl-2">
				<Controller
					name="supportBanner"
					control={control}
					render={({ field }) => (
						<select {...field} className="bg-card text-muted-foreground">
							<option value="NONE">None</option>
							<option value="LGBTQ_RIGHTS">Pride</option>
							<option value="ANTI_RACISM">Anti-Racism</option>
							<option value="MENTAL_HEALTH">Mental Health</option>
							<option value="CLIMATE_ACTION">Climate Action</option>
						</select>
					)}
				/>
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
