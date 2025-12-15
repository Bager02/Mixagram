

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchPosts() {
    const res = await fetch(`${API_URL}/posts`,{
        credentials: "include",
    });
    return res.json();
}

export async function uploadPost(data) {
    const res = await fetch(`${API_URL}/posts/new-post`, {
        method: "POST",
        body: formData,
    });

    return res.json();
}