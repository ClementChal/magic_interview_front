import type { PostModel } from "@/models/post-model";
import { POST_LABELS } from "./types";
import { getPostsForDate } from "./utils";

interface MonthViewProps {
	currentDate: Date;
	posts: PostModel[];
	onPostClick: (post: PostModel) => void;
}

export function MonthView({ currentDate, posts, onPostClick }: MonthViewProps) {
	const firstDayOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1,
	);
	const firstDayOfWeek = firstDayOfMonth.getDay();
	const days: Date[] = [];
	const startDate = new Date(firstDayOfMonth);
	startDate.setDate(
		startDate.getDate() - (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1),
	);

	for (let i = 0; i < 42; i++) {
		const date = new Date(startDate);
		date.setDate(startDate.getDate() + i);
		days.push(date);
	}

	return (
		<div className="h-full grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
			{["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
				<div
					key={day}
					className="p-2 md:p-3 text-center font-semibold text-xs md:text-sm bg-gray-100"
				>
					<span className="hidden sm:inline">{day}</span>
					<span className="sm:hidden">{day.charAt(0)}</span>
				</div>
			))}
			{days.map((date, index) => {
				const isCurrentMonth = date.getMonth() === currentDate.getMonth();
				const isToday = date.toDateString() === new Date().toDateString();
				const dayPosts = getPostsForDate(posts, date);
				console.log(isCurrentMonth, isToday, date.getDate())

				return (
					<div
						key={index}
						onClick={() => console.log('click')}
						className={`min-h-16 md:min-h-24 lg:min-h-28 p-1 md:p-2 ${
							!isCurrentMonth ? "bg-gray-50" : isToday ? "bg-blue-50" : "bg-white"
						}`}

					>
						<div
							className={`text-xs md:text-sm mb-1 ${isCurrentMonth ? "text-gray-900" : "text-gray-400"} ${isToday ? "font-bold" : ""}`}
						>
							{date.getDate()}
						</div>
						<div className="space-y-1">
							{dayPosts.slice(0, 2).map((post) => {
								const labelConfig = POST_LABELS[post.label];
								return (
									<div
										key={post.id}
										className={`text-xs p-1 rounded-md text-white truncate cursor-pointer hover:opacity-80 transition-opacity ${labelConfig.color} flex items-center gap-1`}
										title={`${labelConfig.emoji} ${post.title} (${labelConfig.name})`}
										onClick={(event) => {
											event.stopPropagation();
											onPostClick(post);
										}
										}
									>
										<span className="hidden sm:inline">
											{labelConfig.emoji}
										</span>
										<span className="truncate text-xs">{post.title}</span>
									</div>
								);
							})}
							{dayPosts.length > 2 && (
								<div className="text-xs text-gray-500 hidden md:block">
									+{dayPosts.length - 2} autres
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
