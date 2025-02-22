import {
	BACKGROUND_TYPE_OPTIONS,
	BUTTON_SHADOW_WEIGHTS,
	HEADER_FONT_SIZES,
	HEADER_FONT_WEIGHTS,
	LINK_FONT_SIZES,
	LINK_FONT_WEIGHTS,
	LINK_PADDING_OPTIONS,
	LINK_SHADOW_WEIGHTS,
	RADIUS_OPTIONS,
	SLUG_FONT_SIZES,
	SLUG_FONT_WEIGHTS
} from "@/src/config/preferencesConfig"
import { useResetSettings, useUpdateSettings } from "@/src/hooks/useMutations"
import { useGetSettings } from "@/src/hooks/useQueries"
import { useUserStore } from "@/src/hooks/useUserStore"
import { Icon } from "@iconify/react"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { CheckboxInput, ColorInput, RadioOptions, SelectInput } from "../Inputs"
import ThemeForm from "./ThemeForm"

export default function AppearanceForm() {
	const { settings, setSettings } = useUserStore()

	const { data: userSettings, refetch: refetchSettings } = useGetSettings()
	const { mutate: resetSettingsMutation, isPending: pendingReset } = useResetSettings()
	const { mutate: updateSettingsMutation, isPending: pendingUpdate } = useUpdateSettings()

	const { control, handleSubmit, reset, watch } = useForm<SettingsFormData>({
		defaultValues: settings || {}
	})

	useEffect(() => {
		if (userSettings) {
			reset(userSettings)
		}
	}, [userSettings, reset])

	useEffect(() => {
		const subscription = watch((updatedSettings) => setSettings(updatedSettings))
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
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
			<header className="my-2">
				<h2>Appearance</h2>
				<h6 className="text-muted-foreground">Customize the appearance for your page.</h6>
			</header>

			<ThemeForm reset={reset} setSettings={setSettings} />

			<div className="flex flex-col gap-2 md:flex-row">
				<section className="card w-full">
					<h4>Main Page - Theme Options</h4>
					<hr className="my-2" />

					<Controller
						name="backgroundType"
						control={control}
						render={({ field }) => (
							<SelectInput id="backgroundType" label="Background Type" options={BACKGROUND_TYPE_OPTIONS} {...field} />
						)}
					/>
					<Controller
						name="backgroundColor"
						control={control}
						disabled={watch("backgroundType") === "GRADIENT"}
						render={({ field }) => <ColorInput id="backgroundColor" label="Main Page Background Color" {...field} />}
					/>
					<Controller
						name="backgroundGradientStart"
						control={control}
						disabled={watch("backgroundType") === "FLAT"}
						render={({ field }) => <ColorInput id="backgroundGradientStart" label="Gradient Start Color" {...field} />}
					/>
					<Controller
						name="backgroundGradientEnd"
						disabled={watch("backgroundType") === "FLAT"}
						control={control}
						render={({ field }) => <ColorInput id="backgroundGradientEnd" label="Gradient End Color" {...field} />}
					/>
				</section>

				<section className="card w-full">
					<h4>Main Page - Other Options</h4>
					<hr className="my-2" />

					<Controller
						name="profilePictureRadius"
						control={control}
						render={({ field }) => <RadioOptions label="Profile Picture Radius" options={RADIUS_OPTIONS} {...field} />}
					/>
					<Controller
						name="showCopyButton"
						control={control}
						render={({ field }) => (
							<CheckboxInput
								id="showCopyButton"
								label="Show 'Copy to Clipboard' Button"
								checked={field.value}
								{...field}
							/>
						)}
					/>
				</section>
			</div>

			<div className="flex flex-col gap-2 md:flex-row">
				<section className="card w-full">
					<h4>Username - Font & Theme</h4>
					<hr className="my-2" />

					<Controller
						name="slugTextColor"
						control={control}
						render={({ field }) => <ColorInput id="slugTextColor" label="Username Font Color" {...field} />}
					/>
					<Controller
						name="slugTextSize"
						control={control}
						render={({ field }) => <RadioOptions label="Username Font Size" options={SLUG_FONT_SIZES} {...field} />}
					/>
					<Controller
						name="slugTextWeight"
						control={control}
						render={({ field }) => <RadioOptions label="Username Font Weight" options={SLUG_FONT_WEIGHTS} {...field} />}
					/>
				</section>

				<section className="card w-full">
					<h4>Header - Font & Theme</h4>
					<hr className="my-2" />

					<Controller
						name="headerTextColor"
						control={control}
						render={({ field }) => <ColorInput id="headerTextColor" label="Header Text Color" {...field} />}
					/>
					<Controller
						name="headerTextSize"
						control={control}
						render={({ field }) => <RadioOptions label="Header Text Size" options={HEADER_FONT_SIZES} {...field} />}
					/>
					<Controller
						name="headerTextWeight"
						control={control}
						render={({ field }) => <RadioOptions label="Header Text Weight" options={HEADER_FONT_WEIGHTS} {...field} />}
					/>
				</section>
			</div>

			<div className="flex flex-col gap-2 md:flex-row">
				<section className="card w-full">
					<h4>Links - Theme</h4>
					<hr className="my-2" />

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
						name="linkTextSize"
						control={control}
						render={({ field }) => <RadioOptions label="Link Font Size" options={LINK_FONT_SIZES} {...field} />}
					/>
					<Controller
						name="linkTextWeight"
						control={control}
						render={({ field }) => <RadioOptions label="Link Font Weight" options={LINK_FONT_WEIGHTS} {...field} />}
					/>
					<Controller
						name="linkBorderRadius"
						control={control}
						render={({ field }) => <RadioOptions label="Link Corner Radius" options={RADIUS_OPTIONS} {...field} />}
					/>
					<Controller
						name="linkPadding"
						control={control}
						render={({ field }) => <RadioOptions label="Link Padding" options={LINK_PADDING_OPTIONS} {...field} />}
					/>
				</section>

				<section className="card w-full">
					<h4>Links - Hover & Shadows</h4>
					<hr className="my-2" />
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
							<ColorInput id="linkShadowColor" label="Link Shadow Color" disabled={!watch("isLinkShadow")} {...field} />
						)}
					/>
					<Controller
						name="linkShadowWeight"
						control={control}
						render={({ field }) => (
							<RadioOptions
								label="Link Shadow Weight"
								options={LINK_SHADOW_WEIGHTS}
								disabled={!watch("isLinkShadow")}
								{...field}
							/>
						)}
					/>
				</section>
			</div>

			<div className="flex flex-col gap-2 md:flex-row">
				<section className="card w-full">
					<h4>Social Buttons - Theme</h4>
					<hr className="my-2" />

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
				</section>

				<section className="card w-full">
					<h4>Social Buttons - Hover & Shadows</h4>
					<hr className="my-2" />

					<Controller
						name="buttonHoverBackgroundColor"
						control={control}
						render={({ field }) => (
							<ColorInput id="buttonHoverBackgroundColor" label="Social Button Hover Background Color" {...field} />
						)}
					/>
					<Controller
						name="isButtonShadow"
						control={control}
						render={({ field }) => (
							<CheckboxInput id="isButtonShadow" label="Enable Social Button Shadow" checked={field.value} {...field} />
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

					<Controller
						name="buttonShadowWeight"
						control={control}
						render={({ field }) => (
							<RadioOptions
								label="Button Shadow Weight"
								options={BUTTON_SHADOW_WEIGHTS}
								disabled={!watch("isButtonShadow")}
								{...field}
							/>
						)}
					/>
				</section>
			</div>

			<div className="input-group justify-end">
				<button type="submit" disabled={pendingUpdate} title="Update Appearance" className="btn bg-primary">
					<Icon icon="material-symbols:update" width={20} height={20} />
					{pendingUpdate ? "Updating..." : "Update Appearance"}
				</button>
				<button
					onClick={handleReset}
					disabled={pendingReset}
					title="Reset To Default Appearance"
					className="btn bg-danger"
				>
					<Icon icon="material-symbols:device-reset" width={20} height={20} />
					{pendingReset ? "Updating..." : "Reset To Default"}
				</button>
			</div>
		</form>
	)
}
