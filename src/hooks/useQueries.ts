import { useQuery } from "@tanstack/react-query"
import { getButtons, getLinks, getSettings, getUserData } from "../lib/apiServices"

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
