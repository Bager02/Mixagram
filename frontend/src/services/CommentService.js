const API_URL = import.meta.env.VITE_API_URL;

export async function fetchComments(postId) {
    const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
        credentials: "include",
        cache: "no-store",
    });

    const data = await res.json().catch(() => []);

    if (!res.ok) throw new Error(data.error || "Failed to fetch comments");

    return data; 
}

export async function addComment(postId, content) {
    const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) throw new Error(data.error || "Failed to add comment");

    return data; 
}