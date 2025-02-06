import { PADDING_OPTIONS, RADIUS_OPTIONS, SLUG_FONT_SIZES, SLUG_FONT_WEIGHTS } from "@/src/data/formConfig"
import { useResetSettings, useUpdateSettings } from "@/src/hooks/useMutations"
import { useGetSettings } from "@/src/hooks/useQueries"
import { useUserStore } from "@/src/hooks/useUserStore"
import { Icon } from "@iconify/react"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { CheckboxInput, ColorInput, RadioOptions } from "./Inputs"

export default function AppearanceForm() {
	const { settings, setSettings } = useUserStore()

	const { data: userSettings, refetch: refetchSettings } = useGetSettings()
	const { mutate: resetSettingsMutation, isPending: pendingReset } = useResetSettings()
	const { mutate: updateSettingsMutation, isPending: pendingUpdate } = useUpdateSettings()

	const { control, handleSubmit, reset, watch } = useForm<SettingsFormData>({
		defaultValues: settings
	})

	useEffect(() => {
		if (userSettings) {
			reset(userSettings)
		}
	}, [userSettings, reset])

	useEffect(() => {
		const subscription = watch((updatedSettings) => setSettings(updatedSettings)) // Update global state from Zustand store
		return () => subscription.unsubscribe()
	}, [setSettings, watch])

	const handleReset = () => {
		resetSettingsMutation()
	}

	const onSubmit = (data: SettingsFormData) => {
		updateSettingsMutation(data, {
			onSuccess: () => {
				refetchSettings()
			}
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<section>
				<h4>General Settings</h4>
				<hr className="my-2" />

				<div className="flex flex-col gap-2 md:flex-row">
					<div className="card w-full">
						<Controller
							name="backgroundColor"
							control={control}
							render={({ field }) => <ColorInput id="backgroundColor" label="Main Page Background Color" {...field} />}
						/>
						<Controller
							name="slugTextColor"
							control={control}
							render={({ field }) => <ColorInput id="slugTextColor" label="Username Font Color" {...field} />}
						/>
						<Controller
							name="headerTextColor"
							control={control}
							render={({ field }) => <ColorInput id="headerTextColor" label="Header Font Color" {...field} />}
						/>
					</div>

					<div className="card w-full">
						<Controller
							name="slugTextSize"
							control={control}
							render={({ field }) => <RadioOptions label="Username Font Size" options={SLUG_FONT_SIZES} {...field} />}
						/>
						<Controller
							name="slugTextWeight"
							control={control}
							render={({ field }) => (
								<RadioOptions label="Username Font Weight" options={SLUG_FONT_WEIGHTS} {...field} />
							)}
						/>
					</div>
				</div>
			</section>

			<section>
				<h4>Social Buttons</h4>
				<hr className="my-2" />

				<div className="flex flex-col gap-2 md:flex-row">
					<div className="card w-full">
						<Controller
							name="buttonBackgroundColor"
							control={control}
							render={({ field }) => (
								<ColorInput id="buttonBackgroundColor" label="Social Button Background Color" {...field} />
							)}
						/>
						<Controller
							name="buttonIconColor"
							control={control}
							render={({ field }) => <ColorInput id="buttonIconColor" label="Social Button Icon Color" {...field} />}
						/>
						<Controller
							name="buttonHoverBackgroundColor"
							control={control}
							render={({ field }) => (
								<ColorInput id="buttonHoverBackgroundColor" label="Social Button Hover Background Color" {...field} />
							)}
						/>
					</div>

					<div className="card w-full">
						<Controller
							name="isButtonShadow"
							control={control}
							render={({ field }) => (
								<CheckboxInput
									id="isButtonShadow"
									label="Enable Social Button Shadow"
									checked={field.value}
									{...field}
								/>
							)}
						/>
						<Controller
							name="buttonShadowColor"
							control={control}
							render={({ field }) => (
								<ColorInput
									id="buttonShadowColor"
									label="Social Button Shadow Color"
									disabled={!watch("isButtonShadow")}
									{...field}
								/>
							)}
						/>
					</div>
				</div>
			</section>

			<section>
				<h4>Links</h4>
				<hr className="my-2" />

				<div className="flex flex-col gap-2 md:flex-row">
					<div className="card w-full">
						<Controller
							name="linkBackgroundColor"
							control={control}
							render={({ field }) => <ColorInput id="linkBackgroundColor" label="Link Background Color" {...field} />}
						/>
						<Controller
							name="linkTextColor"
							control={control}
							render={({ field }) => <ColorInput id="linkTextColor" label="Link Font Color" {...field} />}
						/>
						<Controller
							name="linkHoverBackgroundColor"
							control={control}
							render={({ field }) => (
								<ColorInput id="linkHoverBackgroundColor" label="Link Hover Background Color" {...field} />
							)}
						/>

						<Controller
							name="isLinkShadow"
							control={control}
							render={({ field }) => (
								<CheckboxInput id="isLinkShadow" label="Enable Link Shadow" checked={field.value} {...field} />
							)}
						/>
						<Controller
							name="linkShadowColor"
							control={control}
							render={({ field }) => (
								<ColorInput
									id="linkShadowColor"
									label="Link Shadow Color"
									disabled={!watch("isLinkShadow")}
									{...field}
								/>
							)}
						/>
					</div>
					<div className="card w-full">
						<Controller
							name="linkBorderRadius"
							control={control}
							render={({ field }) => <RadioOptions label="Link Corner Radius" options={RADIUS_OPTIONS} {...field} />}
						/>
						<Controller
							name="linkPadding"
							control={control}
							render={({ field }) => <RadioOptions label="Link Padding" options={PADDING_OPTIONS} {...field} />}
						/>
					</div>
				</div>
			</section>

			<div className="input-group justify-end">
				<button type="submit" disabled={pendingUpdate} className="btn bg-primary">
					<Icon icon="material-symbols:update" className="icon text-xl" />
					{pendingUpdate ? "Updating..." : "Update Appearance"}
				</button>
				<button type="button" onClick={handleReset} disabled={pendingReset} className="btn bg-danger">
					<Icon icon="material-symbols:device-reset" className="icon text-xl" />
					{pendingReset ? "Updating..." : "Reset To Default"}
				</button>
			</div>
		</form>
	)
}
