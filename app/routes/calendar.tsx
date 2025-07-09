import { useState, useEffect } from "react";
import {
	type PostModel,
	type PostLabel,
	type AddOrUpdatePostModel,
	isAddOrUpdatePostModel,
} from "@/models/post-model";
import {
	getPosts,
	createPost,
	updatePost as apiUpdatePost,
	deletePost as apiDeletePost,
} from "@/services/api";
import { MonthView } from "@/components/calendar/month-view";
import { WeekView } from "@/components/calendar/week-view";
import { DayView } from "@/components/calendar/day-view";
import { CalendarHeader } from "@/components/calendar/header";
import { AddPostDialog } from "@/components/calendar/add-post-dialog";
import { EditPostDialog } from "@/components/calendar/edit-post-dialog";
import { navigateDate } from "@/components/calendar/utils";
import type { ViewType } from "@/components/calendar/types";

export default function CalendarPage() {
	const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1)); // 1er juillet 2025
	const [view, setView] = useState<ViewType>("month");
	const [posts, setPosts] = useState<PostModel[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Fetch posts from API on component mount
	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			setError(null);
			try {
				const fetchedPosts = await getPosts();
				if (fetchedPosts) {
					// Convert string dates from API to Date objects
					const formattedPosts = fetchedPosts.map((post) => ({
						...post,
						date: new Date(post.date),
					}));
					setPosts(formattedPosts);
				}
			} catch (err) {
				console.error("Error fetching posts:", err);
				setError(
					"Impossible de charger les événements. Veuillez réessayer plus tard.",
				);
			} finally {
				setLoading(false);
			}
		};
		fetchPosts();
	}, []);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedPost, setSelectedPost] = useState<PostModel | null>(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	const addPost = async (eventData: AddOrUpdatePostModel) => {
		if (isAddOrUpdatePostModel(eventData)) {
			setLoading(true);
			setError(null);

			try {
				const postData = {
					title: eventData.title,
					content: eventData.content,
					date: new Date(eventData.date),
					schedule: eventData.schedule,
					label: eventData.label,
				};

				const createdPost = await createPost(postData);

				if (createdPost) {
					// If the API returns the created post, use it
					const newPostWithDate = {
						...createdPost,
						date: new Date(createdPost.date),
					};
					setPosts([...posts, newPostWithDate]);
				} else {
					// If the API doesn't return the created post, use the local data with a temporary ID
					const tempPost: PostModel = {
						id: Date.now().toString(), // Temporary ID until refresh
						...postData,
					};
					setPosts([...posts, tempPost]);

					// Optionally refresh all posts to get the server-generated ID
					const refreshedPosts = await getPosts();
					if (refreshedPosts) {
						const formattedPosts = refreshedPosts.map((post) => ({
							...post,
							date: new Date(post.date),
						}));
						setPosts(formattedPosts);
					}
				}

				setIsDialogOpen(false);
			} catch (err) {
				console.error("Error creating post:", err);
				setError(
					"Impossible de créer l'événement. Veuillez réessayer plus tard.",
				);
			} finally {
				setLoading(false);
			}
		}
	};

	const handlePostClick = (post: PostModel) => {
		setSelectedPost(post);
		setIsEditDialogOpen(true);
	};

	const updatePost = async (eventData: AddOrUpdatePostModel) => {
		if (selectedPost && isAddOrUpdatePostModel(eventData)) {
			setLoading(true);
			setError(null);

			try {
				const postData = {
					title: eventData.title,
					content: eventData.content,
					date: new Date(eventData.date),
					schedule: eventData.schedule,
					label: eventData.label,
				};

				const updatedPost = await apiUpdatePost(selectedPost.id, postData);

				if (updatedPost) {
					// If the API returns the updated post, use it
					const updatedPostWithDate = {
						...updatedPost,
						date: new Date(updatedPost.date),
					};
					setPosts(
						posts.map((post) =>
							post.id === selectedPost.id ? updatedPostWithDate : post,
						),
					);
				} else {
					// If the API doesn't return the updated post, use the local data
					const localUpdatedPost: PostModel = {
						...selectedPost,
						...postData,
					};
					setPosts(
						posts.map((post) =>
							post.id === selectedPost.id ? localUpdatedPost : post,
						),
					);

					// Optionally refresh all posts to get the latest data
					const refreshedPosts = await getPosts();
					if (refreshedPosts) {
						const formattedPosts = refreshedPosts.map((post) => ({
							...post,
							date: new Date(post.date),
						}));
						setPosts(formattedPosts);
					}
				}

				setIsEditDialogOpen(false);
				setSelectedPost(null);
			} catch (err) {
				console.error("Error updating post:", err);
				setError(
					"Impossible de mettre à jour l'événement. Veuillez réessayer plus tard.",
				);
			} finally {
				setLoading(false);
			}
		}
	};

	const deletePost = async () => {
		if (selectedPost) {
			setLoading(true);
			setError(null);

			try {
				await apiDeletePost(selectedPost.id);

				// Remove the post from the local state
				setPosts(posts.filter((post) => post.id !== selectedPost.id));

				setIsEditDialogOpen(false);
				setSelectedPost(null);
			} catch (err) {
				console.error("Error deleting post:", err);
				setError(
					"Impossible de supprimer l'événement. Veuillez réessayer plus tard.",
				);
			} finally {
				setLoading(false);
			}
		}
	};

	const handleNavigate = (direction: "prev" | "next") => {
		setCurrentDate(navigateDate(currentDate, direction, view));
	};

	return (
		<div className="h-full overflow-hidden flex flex-col bg-gray-50">
			{loading && (
				<div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
					<div className="bg-white p-4 rounded-lg shadow-lg">
						<div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
						<p className="mt-2 text-sm text-gray-600">Chargement en cours...</p>
					</div>
				</div>
			)}

			{error && (
				<div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 shadow-md">
					<div className="flex items-center">
						<svg
							className="h-5 w-5 mr-2"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
								clipRule="evenodd"
							/>
						</svg>
						<span>{error}</span>
					</div>
					<button
						onClick={() => setError(null)}
						className="absolute top-0 right-0 mt-2 mr-2 text-red-700"
					>
						×
					</button>
				</div>
			)}

			<div className="flex-1 flex flex-col">
				<CalendarHeader
					currentDate={currentDate}
					view={view}
					onNavigate={handleNavigate}
					onViewChange={setView}
					onAddEvent={() => setIsDialogOpen(true)}
				/>

				<div className="flex-1 p-2 md:p-6 pt-4 overflow-y-auto bg-white">
					{view === "month" && (
						<MonthView
							currentDate={currentDate}
							posts={posts}
							onPostClick={handlePostClick}
						/>
					)}
					{view === "week" && (
						<WeekView
							currentDate={currentDate}
							posts={posts}
							onPostClick={handlePostClick}
						/>
					)}
					{view === "day" && (
						<DayView
							currentDate={currentDate}
							posts={posts}
							onPostClick={handlePostClick}
						/>
					)}
				</div>
			</div>

			<AddPostDialog
				isOpen={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				onAddEvent={addPost}
				loading={loading}
			/>

			<EditPostDialog
				isOpen={isEditDialogOpen}
				onOpenChange={setIsEditDialogOpen}
				selectedPost={selectedPost}
				onUpdatePost={updatePost}
				onDeleteEvent={deletePost}
				loading={loading}
			/>
		</div>
	);
}
