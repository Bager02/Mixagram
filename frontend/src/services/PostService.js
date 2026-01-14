const API_URL = import.meta.env.VITE_API_URL;

export async function fetchPosts() {
    const res = await fetch(`${API_URL}/posts`,{
        credentials: "include",
    });
    
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }

    return await res.json();
}

export async function uploadPost(formData) {
    const res = await fetch(`${API_URL}/posts/new-post`, {
        method: "POST",
        body: formData,
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to upload post");

    return data;
}

export async function fetchPostsFromUser() {
    const res = await fetch(`${API_URL}/posts/user-posts`, {
        credentials: 'include',
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch user posts');
    }

    return await res.json();
}

export async function deletePost(postId) {
    const res = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Failed to delete post");
    }

    return data; 
}

export async function fetchFeedPostsPaginated(
    cursor = null,
    limit = 10
) {
    const params = new URLSearchParams();

    if (cursor) params.append('cursor', cursor);
    params.append('limit', limit);

    const res = await fetch(
        `${API_URL}/posts/feed?${params.toString()}`,
        {
            credentials: 'include'
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch feed posts');
    }

    return await res.json();
}