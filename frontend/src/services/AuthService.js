

const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(data) {
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.error || "Registration failed");
    }

    return result;
}