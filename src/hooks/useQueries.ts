import { useQuery } from "@tanstack/react-query"
import { getButtons, getLinks, getSettings, getUserData } from "../lib/apiServices"

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
