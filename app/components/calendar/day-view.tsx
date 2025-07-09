import type { PostModel } from "@/models/post-model";
import { POST_LABELS } from "./types";
import { getPostsForDate } from "./utils";

interface DayViewProps {
	currentDate: Date;
	posts: PostModel[];
	onPostClick: (post: PostModel) => void;
}

export function DayView({ currentDate, posts, onPostClick }: DayViewProps) {
	const hours = Array.from({ length: 24 }, (_, i) => i);
	const dayPosts = getPostsForDate(posts, currentDate);

	return (
		<div className="space-y-px bg-gray-200 rounded-lg overflow-hidden h-full overflow-y-auto">
			{hours.map((hour) => {
				const hourPosts = dayPosts.filter((post) => {
					const eventHour = Number.parseInt(post.schedule.split(":")[0]);
					return eventHour === hour;
				});

				return (
					<div key={hour} className="flex bg-white">
						<div className="w-12 md:w-16 p-2 text-xs md:text-sm text-gray-500 bg-gray-50 flex items-start justify-center">
							<span className="hidden sm:inline">
								{hour.toString().padStart(2, "0")}:00
							</span>
							<span className="sm:hidden">{hour}</span>
						</div>
						<div className="flex-1 min-h-12 md:min-h-16 p-2">
							{hourPosts.map((post) => {
								const labelConfig = POST_LABELS[post.label];
								return (
									<div
										key={post.id}
										className={`p-2 md:p-3 rounded-lg mb-2 text-white cursor-pointer hover:opacity-80 transition-opacity ${labelConfig.color}`}
										onClick={() => onPostClick(post)}
									>
										<div className="font-semibold flex items-center gap-2 flex-wrap">
											<span className="text-base md:text-lg">
												{labelConfig.emoji}
											</span>
											<span className="text-sm md:text-base">{post.title}</span>
											<span className="text-xs bg-white/20 px-2 py-1 rounded-full hidden sm:inline">
												{labelConfig.name}
											</span>
										</div>
										<div className="text-xs md:text-sm mt-1">
											{post.schedule}
										</div>
										{post.content && (
											<div className="text-xs md:text-sm mt-1 opacity-90 hidden md:block">
												{post.content}
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}
