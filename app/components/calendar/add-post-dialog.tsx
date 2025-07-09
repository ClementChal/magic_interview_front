import { useState } from "react";
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
	isAddOrUpdatePostModel,
	type PostLabel,
} from "@/models/post-model";
import { POST_LABELS } from "./types";

interface AddPostDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onAddEvent: (eventData: AddOrUpdatePostModel) => void;
	loading: boolean;
}

export function AddPostDialog({
	isOpen,
	onOpenChange,
	onAddEvent,
	loading,
}: AddPostDialogProps) {
	const [newPost, setNewPost] = useState({
		title: "",
		content: "",
		date: "",
		schedule: "",
		label: "draft",
	});

	const handleSubmit = () => {
		if (isAddOrUpdatePostModel(newPost)) {
			onAddEvent(newPost);

			setNewPost({
				title: "",
				content: "",
				date: "",
				schedule: "",
				label: "draft",
			});
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="w-[95vw] max-w-md">
				<DialogHeader>
					<DialogTitle>Nouvel événement</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div>
						<Label htmlFor="title">Titre</Label>
						<Input
							id="title"
							value={newPost.title}
							onChange={(e) =>
								setNewPost({ ...newPost, title: e.target.value })
							}
							placeholder="Titre de l'événement"
						/>
					</div>

					<div>
						<Label htmlFor="content">Sujet</Label>
						<Textarea
							id="content"
							value={newPost.content}
							onChange={(e) =>
								setNewPost({ ...newPost, content: e.target.value })
							}
							placeholder="Sujet"
						/>
					</div>
					<div>
						<Label htmlFor="date">Date</Label>
						<Input
							id="date"
							type="date"
							value={newPost.date}
							onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
						/>
					</div>

					<div>
						<Label htmlFor="schedule">Heure de début</Label>
						<Input
							id="schedule"
							type="time"
							value={newPost.schedule}
							onChange={(e) =>
								setNewPost({ ...newPost, schedule: e.target.value })
							}
						/>
					</div>

					<div>
						<Label htmlFor="label">Statut</Label>
						<Select
							value={newPost.label}
							onValueChange={(value: PostLabel) =>
								setNewPost({ ...newPost, label: value })
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

					<Button onClick={handleSubmit} className="w-full" disabled={loading}>
						{loading ? "Création en cours..." : "Ajouter l'événement"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
