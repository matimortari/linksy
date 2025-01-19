import { useQuery } from "@tanstack/react-query"
import { getAnalytics, getClicksByLink } from "../services/analyticsService"
import { getButtons } from "../services/buttonsService"
import { getLinks } from "../services/linksService"
import { getSettings } from "../services/settingsService"
import { getUserData } from "../services/userService"

export function useGetUserData() {
	return useQuery({
		queryKey: ["getUserData"],
		queryFn: getUserData
	})
}

export function useGetLinks() {
	return useQuery({
		queryKey: ["getLinks"],
		queryFn: getLinks
	})
}

export function useGetButtons() {
	return useQuery({
		queryKey: ["getButtons"],
		queryFn: getButtons
	})
}

export function useGetSettings() {
	return useQuery({
		queryKey: ["getSettings"],
		queryFn: getSettings
	})
}

export function useGetAnalytics() {
	return useQuery({
		queryKey: ["getAnalytics"],
		queryFn: getAnalytics
	})
}

export function useGetClicksByLink() {
	return useQuery({
		queryKey: ["getClicksByLink"],
		queryFn: getClicksByLink
	})
}
