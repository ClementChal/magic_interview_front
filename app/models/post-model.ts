export type PostLabel = "draft" | "progress" | "scheduled" | "published";

export type PostModel = {
	id: string;
	title: string;
	content: string;
	date: Date;
	schedule: string;
	label: PostLabel;
};

export type AddOrUpdatePostModel = Omit<PostModel, "id">;

export function isAddOrUpdatePostModel(
	data: any,
): data is AddOrUpdatePostModel {
	return data.title && data.date && data.schedule && data.label && data.content;
}
