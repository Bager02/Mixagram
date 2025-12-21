import { createContext, useContext, useEffect, useState } from 'react';
import { fetchPosts, uploadPost, deletePost, fetchPostsFromUser } from '../services/PostService.js';

const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => { }, []);

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
                addPost,
                deletePostFromUser
            }}
        >
            {children}
        </PostContext.Provider>
    );
}

export const usePosts = () => {
    return useContext(PostContext);
}