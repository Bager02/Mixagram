const API_URL = import.meta.env.VITE_API_URL;

export function getImageUrl(path, defaultPath) {
    if (!path || path === '/default-avatar.jpg') return defaultPath;
    return path.startsWith('http') ? path : `${API_URL}${path}`;
}