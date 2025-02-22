const config = {
	content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
	darkMode: "class",
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
				ring: "var(--ring)"
			}
		}
	}
}

export default config
