

const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(data) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.error || "Registration failed");
    }

    return result;
}

export async function loginUser(data) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.error || "Login failed");
    }

    return result;
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