import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
	type AddOrUpdatePostModel,
	type PostLabel,
	type PostModel,
	isAddOrUpdatePostModel,
} from "@/models/post-model";
import { useEffect, useState } from "react";
import { POST_LABELS } from "./types";

interface EditPostDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	selectedPost: PostModel | null;
	onUpdatePost: (eventData: AddOrUpdatePostModel) => void;
	onDeleteEvent: () => void;
	loading: boolean;
}

export function EditPostDialog({
	isOpen,
	onOpenChange,
	selectedPost,
	onUpdatePost,
	onDeleteEvent,
	loading,
}: EditPostDialogProps) {
	const [editPost, setEditPost] = useState({
		title: "",
		content: "",
		date: "",
		schedule: "",
		label: "draft" as PostLabel,
	});
	useEffect(() => {
		if (selectedPost) {
			setEditPost({
				title: selectedPost.title,
				content: selectedPost.content,
				date: new Date(
					selectedPost.date.getTime() -
						selectedPost.date.getTimezoneOffset() * 60000,
				)
					.toISOString()
					.split("T")[0],

				schedule: selectedPost.schedule,
				label: selectedPost.label,
			});
		}
	}, [selectedPost]);

	const handleUpdate = () => {
		if (isAddOrUpdatePostModel(editPost)) {
			onUpdatePost(editPost);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="w-[95vw] max-w-md">
				<DialogHeader>
					<DialogTitle>Modifier l'événement</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div>
						<Label htmlFor="edit-title">Titre</Label>
						<Input
							id="edit-title"
							value={editPost.title}
							onChange={(e) =>
								setEditPost({ ...editPost, title: e.target.value })
							}
							placeholder="Titre de l'événement"
						/>
					</div>

					<div>
						<Label htmlFor="edit-content">Sujet</Label>
						<Textarea
							id="edit-content"
							value={editPost.content}
							onChange={(e) =>
								setEditPost({ ...editPost, content: e.target.value })
							}
							placeholder="Sujet"
						/>
					</div>

					<div>
						<Label htmlFor="edit-date">Date</Label>
						<Input
							id="edit-date"
							type="date"
							value={editPost.date}
							onChange={(e) =>
								setEditPost({ ...editPost, date: e.target.value })
							}
						/>
					</div>

					<div>
						<Label htmlFor="edit-schedule">Heure de début</Label>
						<Input
							id="edit-schedule"
							type="time"
							value={editPost.schedule}
							onChange={(e) =>
								setEditPost({ ...editPost, schedule: e.target.value })
							}
						/>
					</div>

					<div>
						<Label htmlFor="edit-label">Statut</Label>
						<Select
							value={editPost.label}
							onValueChange={(value: PostLabel) =>
								setEditPost({ ...editPost, label: value })
							}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{Object.entries(POST_LABELS).map(([key, config]) => (
									<SelectItem key={key} value={key}>
										<div className="flex items-center gap-2">
											<span>{config.emoji}</span>
											<span>{config.name}</span>
										</div>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="flex gap-2">
						<Button
							onClick={handleUpdate}
							className="flex-1"
							disabled={loading}
						>
							{loading ? "Mise à jour..." : "Modifier"}
						</Button>
						<Button
							onClick={onDeleteEvent}
							variant="destructive"
							className="flex-1"
							disabled={loading}
						>
							{loading ? "Suppression..." : "Supprimer"}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
