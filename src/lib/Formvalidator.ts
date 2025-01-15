import { z } from "zod"

export const linkFormSchema = z.object({
	title: z.string().nonempty("Title is required").max(100, "Title must be 100 characters or less"),
	url: z
		.string()
		.nonempty("URL is required")
		.refine((url) => {
			try {
				const normalizedUrl = new URL(url.startsWith("http://") || url.startsWith("https://") ? url : `http://${url}`)
				return Boolean(normalizedUrl.hostname)
			} catch {
				return false
			}
		}, "Must be a valid URL")
})

export const buttonFormSchema = z.object({
	platform: z.string().nonempty("Platform is required"),
	url: z
		.string()
		.nonempty("URL is required")
		.refine((url) => {
			try {
				const normalizedUrl = new URL(url.startsWith("http://") || url.startsWith("https://") ? url : `http://${url}`)
				return Boolean(normalizedUrl.hostname)
			} catch {
				return false
			}
		}, "Must be a valid URL")
})

export type LinkFormData = z.infer<typeof linkFormSchema>
export type ButtonFormData = z.infer<typeof buttonFormSchema>
