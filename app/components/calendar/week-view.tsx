import type { PostModel } from "@/models/post-model";
import { POST_LABELS } from "./types";
import { getPostsForDate } from "./utils";

interface WeekViewProps {
	currentDate: Date;
	posts: PostModel[];
	onPostClick: (post: PostModel) => void;
}

export function WeekView({ currentDate, posts, onPostClick }: WeekViewProps) {
	const startOfWeek = new Date(currentDate);
	const day = startOfWeek.getDay();
	const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
	startOfWeek.setDate(diff);

	const weekDays: Date[] = [];
	for (let i = 0; i < 7; i++) {
		const date = new Date(startOfWeek);
		date.setDate(startOfWeek.getDate() + i);
		weekDays.push(date);
	}

	const hours = Array.from({ length: 24 }, (_, i) => i);

	return (
		<div className="flex flex-col h-full">
			<div className="grid grid-cols-8 gap-px bg-gray-200 mb-2 rounded-lg overflow-hidden">
				<div className="p-2 bg-gray-100" />
				{weekDays.map((date) => {
					const isToday = date.toDateString() === new Date().toDateString();
					return (
						<div
							key={date.toISOString()}
							className={`p-2 text-center bg-white ${isToday ? "bg-blue-100" : ""}`}
						>
							<div className="text-xs md:text-sm font-semibold">
								<span className="hidden sm:inline">
									{date.toLocaleDateString("fr-FR", { weekday: "short" })}
								</span>
								<span className="sm:hidden">
									{date.toLocaleDateString("fr-FR", { weekday: "narrow" })}
								</span>
							</div>
							<div
								className={`text-sm md:text-lg ${isToday ? "font-bold" : ""}`}
							>
								{date.getDate()}
							</div>
						</div>
					);
				})}
			</div>

			<div className="flex-1 grid grid-cols-8 gap-px bg-gray-200 overflow-y-auto rounded-lg">
				{hours.map((hour) => (
					<div key={hour} className="contents">
						<div className="p-1 md:p-2 text-xs text-gray-500 bg-gray-50 flex items-start justify-center">
							<span className="hidden sm:inline">
								{hour.toString().padStart(2, "0")}:00
							</span>
							<span className="sm:hidden">{hour}</span>
						</div>
						{weekDays.map((date) => {
							const dayPosts = getPostsForDate(posts, date).filter((post) => {
								const eventHour = Number.parseInt(post.schedule.split(":")[0]);
								return eventHour === hour;
							});

							return (
								<div
									key={`${date.toISOString()}-${hour}`}
									className="min-h-8 md:min-h-12 bg-white p-1"
								>
									{dayPosts.map((post) => {
										const labelConfig = POST_LABELS[post.label];
										return (
											<div
												key={post.id}
												className={`text-xs p-1 rounded-md text-white mb-1 cursor-pointer hover:opacity-80 transition-opacity ${labelConfig.color}`}
												onClick={() => onPostClick(post)}
											>
												<div className="font-semibold flex items-center gap-1">
													<span className="hidden sm:inline">
														{labelConfig.emoji}
													</span>
													<span className="truncate">{post.title}</span>
												</div>
												<div className="hidden sm:block text-xs">
													{post.schedule}
												</div>
											</div>
										);
									})}
								</div>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
}
