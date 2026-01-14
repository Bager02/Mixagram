import { createContext, useContext, useEffect, useState } from 'react';
import {
    fetchPosts,
    uploadPost,
    deletePost,
    fetchPostsFromUser,
    fetchFeedPostsPaginated
} from '../services/PostService.js';

const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [nextCursor, setNextCursor] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {}, []);

    async function toggleLikeOnPost(postId, liked) {
        setPosts(prevPosts =>
            prevPosts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        isLiked: liked,
                        likesCount: liked
                            ? post.likesCount + 1
                            : post.likesCount - 1
                    };
                }
                return post;
            })
        );
    }

    async function fetchAllPosts() {
        try {
            const data = await fetchPosts();
            setPosts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch all posts:", err);
            setPosts([]);
        }
    }

    async function fetchUserPosts() {
        try {
            const data = await fetchPostsFromUser();
            setPosts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch user posts:", err);
            setPosts([]);
        }
    }

    async function fetchInitialFeed() {
        try {
            setIsLoading(true);

            const { posts: newPosts, nextCursor } =
                await fetchFeedPostsPaginated(null);

            setPosts(newPosts);
            setNextCursor(nextCursor);
            setHasMore(nextCursor !== null);
        } catch (err) {
            console.error("Failed to fetch feed:", err);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchMoreFeedPosts() {
        if (!hasMore || isLoading) return;

        try {
            setIsLoading(true);

            const {
                posts: newPosts,
                nextCursor: newCursor
            } = await fetchFeedPostsPaginated(nextCursor);

            setPosts(prev => [...prev, ...newPosts]);
            setNextCursor(newCursor);
            setHasMore(newCursor !== null);
        } catch (err) {
            console.error("Failed to fetch more posts:", err);
        } finally {
            setIsLoading(false);
        }
    }

    async function addPost(formData) {
        try {
            const newPost = await uploadPost(formData);
            setPosts(prev => [newPost, ...prev]);
            return newPost;
        } catch (err) {
            console.error("Upload failed:", err);
            throw err;
        }
    }

    async function deletePostFromUser(postId) {
        try {
            await deletePost(postId);
            setPosts(prev => prev.filter(p => p.id !== postId));
        } catch (err) {
            console.error("Failed to delete post:", err);
            throw err;
        }
    }

    return (
        <PostContext.Provider
            value={{
                posts,
                setPosts,
                fetchAllPosts,
                fetchUserPosts,
                fetchInitialFeed,
                fetchMoreFeedPosts,
                hasMore,
                isLoading,
                addPost,
                deletePostFromUser,
                toggleLikeOnPost
            }}
        >
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => {
    return useContext(PostContext);
};