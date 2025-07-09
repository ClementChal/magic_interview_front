import type { AddOrUpdatePostModel, PostModel } from "@/models/post-model";

const API_URL = import.meta.env.VITE_BACKEND_URL;

async function apiFetch<T>(
	endpoint: string,
	options: RequestInit = {},
): Promise<T | null> {
	const defaultHeaders = {
		"Content-Type": "application/json",
	};

	const config: RequestInit = {
		...options,
		headers: {
			...defaultHeaders,
			...options.headers,
		},
	};

	try {
		const response = await fetch(`${API_URL}/${endpoint}`, config);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		// // Gère les réponses sans contenu (ex: DELETE)
		// if (
		// 	response.status === 204 ||
		// 	response.headers.get("content-length") === "0"
		// ) {
		// 	return null;
		// }

		return await response.json();
	} catch (error) {
		console.error(`Erreur de l'appel API vers ${endpoint}:`, error);
		throw error;
	}
}

// --- Fonctions d'API exportées ---

export const getPosts = () => {
	return apiFetch<PostModel[]>("post", { method: "GET" });
};

export const createPost = (data: AddOrUpdatePostModel) => {
	return apiFetch<PostModel | null>("post", {
		method: "POST",
		body: JSON.stringify(data),
	});
};

export const updatePost = (
	postId: string | number,
	data: AddOrUpdatePostModel,
) => {
	return apiFetch<PostModel | null>(`post/${postId}`, {
		method: "PATCH",
		body: JSON.stringify(data),
	});
};

export const deletePost = (postId: string | number) => {
	return apiFetch(`post/${postId}`, { method: "DELETE" });
};
