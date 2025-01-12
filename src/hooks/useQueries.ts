import { useQuery } from "@tanstack/react-query"
import { getAnalytics } from "../services/analyticsService"
import { getButtons } from "../services/buttonsService"
import { getLinks } from "../services/linksService"
import { getSettings } from "../services/settingsService"
import { getUserData } from "../services/userService"

export function useGetUserData() {
	return useQuery({
		queryKey: ["user"],
		queryFn: getUserData
	})
}

export function useGetLinks() {
	return useQuery({
		queryKey: ["links"],
		queryFn: getLinks
	})
}

export function useGetButtons() {
	return useQuery({
		queryKey: ["buttons"],
		queryFn: getButtons
	})
}

export function useGetSettings() {
	return useQuery({
		queryKey: ["settings"],
		queryFn: getSettings
	})
}

export function useGetAnalytics() {
	return useQuery({
		queryKey: ["analytics"],
		queryFn: getAnalytics
	})
}
