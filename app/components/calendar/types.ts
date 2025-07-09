export type ViewType = "month" | "week" | "day";

export const POST_LABELS = {
	draft: {
		color: "bg-gray-500",
		emoji: "📝",
		name: "Brouillon",
	},
	progress: {
		color: "bg-sky-500",
		emoji: "⚡",
		name: "En cours",
	},
	scheduled: {
		color: "bg-yellow-500",
		emoji: "📅",
		name: "Planifié",
	},
	published: {
		color: "bg-emerald-500",
		emoji: "✅",
		name: "Publié",
	},
} as const;