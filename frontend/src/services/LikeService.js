const API_URL = import.meta.env.VITE_API_URL;

export async function toggleLike(postId) {
    const res = await fetch(`${API_URL}/posts/${postId}/like`, {
        method: "POST",
        credentials: "include",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) throw new Error(data.error || "Failed to toggle like");

    return data; 
}

export async function fetchLikedPosts() {
    const res = await fetch(`${API_URL}/posts/me/liked-posts`, {
        credentials: "include",
        cache: "no-store",
    });

    const data = await res.json().catch(() => []);

    if (!res.ok) throw new Error(data.error || "Failed to fetch liked posts");

    return data; 
}