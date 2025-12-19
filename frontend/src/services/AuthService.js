const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser({ username, email, password }) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.error || "Registration failed");
    }

    return result;
}

export async function deleteCurrentUser() {
    const res = await fetch(`${API_URL}/auth/me`, {
        method: "DELETE",
        credentials: "include",
    });

    const result = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(result.error || "Failed to delete user");
    }

    return result;
}

export async function loginUser({ username, password }) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.error || "Login failed");
    }

    return result;
}

export async function logoutUser() {
    const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        cache: "no-store",
    });

    if (!res.ok) {
        const result = await res.json().catch(() => ({}));
        throw new Error(result.error || "Logout failed");
    }

    return true;
}

export async function getCurrentUser() {
    const res = await fetch(`${API_URL}/auth/me`, {
        credentials: "include",
        cache: "no-store",
    });

    if (!res.ok) return null;
    if (res.status === 401) {
        return null;
    }

    return await res.json();
}

export async function updateProfile({ username, bio }) {
    const res = await fetch(`${API_URL}/user/me`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, bio }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
    }

    return data;
}