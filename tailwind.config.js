import daisyui from "daisyui"

const config = {
	content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
	darkMode: "class",
	plugins: [daisyui],
	daisyui: {
		styled: false
	},
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)"
				},
				popover: {
					DEFAULT: "var(--popover)",
					foreground: "var(--popover-foreground)"
				},
				primary: {
					DEFAULT: "var(--primary)",
					foreground: "var(--primary-foreground)"
				},
				secondary: {
					DEFAULT: "var(--secondary)",
					foreground: "var(--secondary-foreground)"
				},
				accent: {
					DEFAULT: "var(--accent)",
					foreground: "var(--accent-foreground)"
				},
				muted: {
					DEFAULT: "var(--muted)",
					foreground: "var(--muted-foreground)"
				},
				danger: "var(--danger)",
				success: "var(--success)",
				border: "var(--border)",
				input: "var(--input)",
				ring: "var(--ring)",
				google: "#DB4437", // Google Sigin Button
				github: "#333333" // GitHub Sigin Button
			}
		}
	}
}

export default config
