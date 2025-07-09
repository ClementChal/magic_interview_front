import type { PostModel } from "@/models/post-model";
import type { ViewType } from "./types";

export const formatDate = (date: Date) => {
	return date.toLocaleDateString("fr-FR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

export const formatMonthYear = (date: Date) => {
	return date.toLocaleDateString("fr-FR", {
		year: "numeric",
		month: "long",
	});
};

export const navigateDate = (
	currentDate: Date,
	direction: "prev" | "next",
	view: ViewType,
): Date => {
	const newDate = new Date(currentDate);

	if (view === "month") {
		newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
	} else if (view === "week") {
		newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
	} else {
		newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
	}

	return newDate;
};

export const getPostsForDate = (posts: PostModel[], date: Date) => {
	return posts.filter(
		(post) => post.date.toDateString() === date.toDateString(),
	);
};
