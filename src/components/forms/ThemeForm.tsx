import { useEffect, useState } from "react"
import { themePresets } from "../../config/themePresets"

export default function ThemeForm({ reset, setSettings }) {
	const [selectedTheme, setSelectedTheme] = useState<string>("")

	const handleThemeSelection = (themeSlug: string) => {
		const selected = themePresets.find((theme) => theme.title === themeSlug)

		if (selected) {
			setSelectedTheme(themeSlug)
			reset(selected.settings)
			setSettings(selected.settings)
		}
	}

	// Reset settings to default if no theme is selected
	useEffect(() => {
		if (!selectedTheme) {
			reset()
		}
	}, [selectedTheme, reset])

	return (
		<section className="overflow-hidden">
			<div className="card">
				<header className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-4">
					<h2 className="hidden md:block">Select a Theme</h2>
					<h4 className="md:hidden">Select a Theme</h4>
					<h6 className="text-muted-foreground">Or customize your page to your liking!</h6>
				</header>

				<hr className="my-2" />

				<div className="grid h-64 grid-cols-2 gap-2 overflow-auto md:grid-cols-4">
					{themePresets.map((theme) => (
						<button
							key={theme.title}
							tabIndex={0}
							onClick={() => handleThemeSelection(theme.title)}
							className={`mb-2 size-full rounded-lg border p-2 ${
								selectedTheme === theme.title ? "bg-muted" : "bg-transparent"
							} hover:bg-muted`}
							style={{
								backgroundImage:
									theme.settings.backgroundType === "GRADIENT"
										? `linear-gradient(to right, ${theme.settings.backgroundGradientStart}, ${theme.settings.backgroundGradientEnd})`
										: "none",
								backgroundColor: theme.settings.backgroundType !== "GRADIENT" ? theme.settings.backgroundColor : "none"
							}}
						>
							<span
								className="line-clamp-1 truncate rounded-2xl p-1 text-center text-xs md:p-2 md:text-sm"
								style={{
									backgroundColor: theme.settings.linkBackgroundColor,
									fontWeight: theme.settings.slugTextWeight,
									color: theme.settings.linkTextColor,
									boxShadow: theme.settings.isLinkShadow
										? {
												none: "none",
												light: `0px 1px 2px ${theme.settings.linkShadowColor}`,
												medium: `0 2px 6px ${theme.settings.linkShadowColor}`,
												heavy: `1px 3px 10px ${theme.settings.linkShadowColor}`
										  }[theme.settings.linkShadowWeight || "none"]
										: "none"
								}}
							>
								{theme.title}
							</span>
						</button>
					))}
				</div>
			</div>
		</section>
	)
}
