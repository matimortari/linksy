import { useUpdateSupportBanner } from "@/src/hooks/useMutations"
import { useUserStore } from "@/src/hooks/useUserStore"
import { Icon } from "@iconify/react"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"

export default function SupportBannerForm() {
	const { settings } = useUserStore()

	const { mutate: updateBannerMutation, isSuccess, isError, error } = useUpdateSupportBanner()

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
		<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
			<header className="my-2">
				<h2>Support Banner</h2>
				<h6 className="text-muted-foreground">Show your support for important causes.</h6>
			</header>

			<div className="flex max-w-xs flex-row items-center gap-2 rounded-2xl border bg-card p-1 pl-2">
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
			</div>

			<div className="input-group justify-end">
				{isSuccess && <p className="mx-2 text-sm font-semibold text-success">Support banner updated!</p>}
				{isError && (
					<p className="mx-2 text-sm font-semibold text-danger">
						Error updating support banner: {error?.message || "Unknown error"}
					</p>
				)}

				<button type="submit" title="Update Support Banner" className="btn bg-primary">
					<Icon icon="material-symbols:volunteer-activism-outline" width={20} height={20} />
					Update Banner
				</button>
			</div>
		</form>
	)
}
