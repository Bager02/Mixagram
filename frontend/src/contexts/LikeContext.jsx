import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { toggleLike, fetchLikedPosts } from '../services/LikeService.js';

const LikeContext = createContext(null);

export const LikeProvider = ({ children }) => {
    const [likedPosts, setLikedPosts] = useState([]);

    const handleToggleLike = useCallback(async (postId) => {
        try {
            const result = await toggleLike(postId);

            setLikedPosts(prev => {
                if (result.liked) return [...prev, postId];
                return prev.filter(id => id !== postId);
            });

            return result.liked;
        } catch (err) {
            console.error('Failed to toggle like:', err);
            return false;
        }
    }, []);

    const handleFetchLikedPosts = useCallback(async () => {
        try {
            const posts = await fetchLikedPosts();
            setLikedPosts(posts.map(post => post.id));
        } catch (err) {
            console.error('Failed to fetch liked posts:', err);
        }
    }, []);

    useEffect(() => {
        handleFetchLikedPosts();
    }, [handleFetchLikedPosts]);

    return (
        <LikeContext.Provider
            value={{
                likedPosts,
                handleToggleLike,
                handleFetchLikedPosts
            }}
        >
            {children}
        </LikeContext.Provider>
    );
};

export const useLike = () => useContext(LikeContext);