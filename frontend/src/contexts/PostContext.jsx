import { createContext, useContext, useEffect, useState } from 'react';
import { fetchPosts, uploadPost } from '../services/PostService.js';

const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            try { 
                const data = await fetchPosts();
                console.log("Fetched posts:", data);
                setPosts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };
        
        getPosts();

    }, []);

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

    return (
        <PostContext.Provider value={{ posts, setPosts, addPost }}>
            {children}
        </PostContext.Provider>
    );
}

export const usePosts = () => {
    return useContext(PostContext);
}