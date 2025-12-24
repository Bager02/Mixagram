import { createContext, useContext, useState, useCallback } from 'react';
import { fetchComments, addComment } from '../services/CommentService.js';

const CommentContext = createContext(null);

export const CommentProvider = ({ children }) => {
    const [commentsByPost, setCommentsByPost] = useState({});

    const handleFetchComments = useCallback(async (postId) => {
        try {
            const comments = await fetchComments(postId);
            setCommentsByPost(prev => ({ ...prev, [postId]: comments }));
        } catch (err) {
            console.error(err);
        }
    }, []);

    const handleAddComment = useCallback(async (postId, content) => {
        try {
            const comment = await addComment(postId, content);
            setCommentsByPost(prev => ({
                ...prev,
                [postId]: prev[postId] ? [...prev[postId], comment] : [comment]
            }));
            return comment;
        } catch (err) {
            console.error(err);
            return null;
        }
    }, []);

    return (
        <CommentContext.Provider
            value={{
                commentsByPost,
                handleFetchComments,
                handleAddComment
            }}
        >
            {children}
        </CommentContext.Provider>
    );
};

export const useComment = () => useContext(CommentContext);