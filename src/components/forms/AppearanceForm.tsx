"use client"

import {
	BORDER_RADIUS_OPTIONS,
	defaultSettings,
	PADDING_OPTIONS,
	SLUG_FONT_SIZES,
	SLUG_FONT_WEIGHT_SIZES
} from "@/src/data/userSettings"
import { useResetSettings, useUpdateSettings } from "@/src/hooks/useMutations"
import { getUserSettings } from "@/src/lib/actions"
import { Icon } from "@iconify/react"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { CheckboxInput, ColorInput, RadioOptions } from "./Inputs"

export default function AppearanceForm({ settings, setSettings }) {
	const { data: userSettings, isPending } = useQuery({ queryKey: ["settings"], queryFn: getUserSettings })
	const { mutate: resetSettingsMutation, isSuccess: resetSuccess, isError: resetError } = useResetSettings()
	const { mutate: updateSettingsMutation, isSuccess: updateSuccess, isError: updateError } = useUpdateSettings()

	useEffect(() => {
		if (userSettings) {
			setSettings(userSettings)
		}
	}, [userSettings, setSettings])

	useEffect(() => {
		if (resetSuccess) {
			setSettings(defaultSettings)
		}
	}, [resetSuccess, setSettings])

	const handleColorChange = (key) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setSettings((prev) => ({ ...prev, [key]: e.target.value }))
	}

	const handleRadioChange = (key) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setSettings((prev) => ({ ...prev, [key]: e.target.value }))
	}

	const handleCheckboxChange = (key) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setSettings((prev) => ({ ...prev, [key]: e.target.checked }))
	}

	const handleReset = (e) => {
		e.preventDefault()
		resetSettingsMutation()
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		updateSettingsMutation(settings)
	}

	if (isPending) return <p className="description-label text-muted-foreground">Loading appearance preferences...</p>

	return (
		<>
			<form onSubmit={handleSubmit} className="flex flex-wrap">
				<div className="flex w-full flex-col md:w-1/2">
					<h4 className="my-2">General Settings</h4>
					<hr className="max-w-xs" />
					<ColorInput
						id="backgroundColor"
						label="Main Page Background Color"
						value={settings.backgroundColor}
						onChange={handleColorChange("backgroundColor")}
					/>
					<ColorInput
						id="slugTextColor"
						label="Username Font Color"
						value={settings.slugTextColor}
						onChange={handleColorChange("slugTextColor")}
					/>
					<ColorInput
						id="headerTextColor"
						label="Header Font Color"
						value={settings.headerTextColor}
						onChange={handleColorChange("headerTextColor")}
					/>
					<hr className="max-w-xs" />
					<RadioOptions
						name="slugTextSize"
						label="Username Font Size"
						options={SLUG_FONT_SIZES}
						value={settings.slugTextSize}
						onChange={handleRadioChange("slugTextSize")}
					/>
					<RadioOptions
						name="slugTextWeight"
						label="Username Font Weight"
						options={SLUG_FONT_WEIGHT_SIZES}
						value={settings.slugTextWeight}
						onChange={handleRadioChange("slugTextWeight")}
					/>
				</div>

				<div className="flex w-full flex-col md:w-1/2">
					<h4 className="my-2">Social Buttons</h4>
					<hr className="max-w-xs" />
					<ColorInput
						id="buttonBackgroundColor"
						label="Social Button Background Color"
						value={settings.buttonBackgroundColor}
						onChange={handleColorChange("buttonBackgroundColor")}
					/>
					<ColorInput
						id="buttonIconColor"
						label="Social Button Icon Color"
						value={settings.buttonIconColor}
						onChange={handleColorChange("buttonIconColor")}
					/>
					<ColorInput
						id="buttonHoverBackgroundColor"
						label="Social Button Hover Background Color"
						value={settings.buttonHoverBackgroundColor}
						onChange={handleColorChange("buttonHoverBackgroundColor")}
					/>
					<hr className="max-w-xs" />
					<CheckboxInput
						id="isButtonShadow"
						label="Enable Social Button Shadow"
						checked={settings.isButtonShadow}
						onChange={handleCheckboxChange("isButtonShadow")}
					/>
					<ColorInput
						id="buttonShadowColor"
						label="Social Button Shadow Color"
						value={settings.buttonShadowColor}
						disabled={!settings.isButtonShadow}
						onChange={handleColorChange("buttonShadowColor")}
					/>
					<hr className="max-w-xs" />

					<h4 className="my-2">Link Buttons</h4>
					<hr className="max-w-xs" />
					<ColorInput
						id="linkBackgroundColor"
						label="Link Button Background Color"
						value={settings.linkBackgroundColor}
						onChange={handleColorChange("linkBackgroundColor")}
					/>
					<ColorInput
						id="linkTextColor"
						label="Link Button Font Color"
						value={settings.linkTextColor}
						onChange={handleColorChange("linkTextColor")}
					/>
					<ColorInput
						id="linkHoverBackgroundColor"
						label="Link Button Hover Background Color"
						value={settings.linkHoverBackgroundColor}
						onChange={handleColorChange("linkHoverBackgroundColor")}
					/>
					<hr className="max-w-xs" />
					<CheckboxInput
						id="isLinkShadow"
						label="Enable Link Button Shadow"
						checked={settings.isLinkShadow}
						onChange={handleCheckboxChange("isLinkShadow")}
					/>
					<ColorInput
						id="linkShadowColor"
						label="Link Button Shadow Color"
						value={settings.linkShadowColor}
						disabled={!settings.isLinkShadow}
						onChange={handleColorChange("linkShadowColor")}
					/>
					<hr className="max-w-xs" />
					<RadioOptions
						name="linkBorderRadius"
						label="Link Button Corner Radius"
						options={BORDER_RADIUS_OPTIONS}
						value={settings.linkBorderRadius}
						onChange={handleRadioChange("linkBorderRadius")}
					/>
					<RadioOptions
						name="linkPadding"
						label="Link Button Padding"
						options={PADDING_OPTIONS}
						value={settings.linkPadding}
						onChange={handleRadioChange("linkPadding")}
					/>
				</div>

				<div className="flex flex-row gap-2">
					<button type="submit" className="btn bg-primary">
						<Icon icon="material-symbols:update" className="icon text-xl" />
						Update Settings
					</button>
					<button type="button" onClick={handleReset} className="btn bg-danger">
						<Icon icon="material-symbols:device-reset" className="icon text-xl" />
						Reset to Default
					</button>
				</div>
			</form>

			{resetSuccess && <p className="description-label text-success">Settings reset to default.</p>}
			{resetError && <p className="description-label text-danger">Failed to reset settings.</p>}
			{updateSuccess && <p className="description-label text-success">Settings updated successfully!</p>}
			{updateError && <p className="description-label text-danger">Failed to update settings.</p>}
		</>
	)
}
