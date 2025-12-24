import { useComment } from '../contexts/CommentContext.jsx';
import { useEffect, useState } from 'react';
import '../css/PostWindow.css';
import { getImageUrl } from '../utils/getImageUrl.js';

function PostWindow({ post, onClose, onCommentAdded }) {
    const { commentsByPost, handleFetchComments, handleAddComment } = useComment();
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        handleFetchComments(post.id);
    }, [post.id]);

    const comments = commentsByPost?.[post.id] || [];

    const submitComment = async () => {
        if (!newComment.trim()) return;
        await handleAddComment(post.id, newComment);
        setNewComment('');
        if (onCommentAdded) onCommentAdded();
    };

    const postImage = post.post_image_url ? getImageUrl(post.post_image_url) : null;

    return (
        <div className="post-window-overlay" onClick={onClose}>
            <div className="post-window" onClick={e => e.stopPropagation()}>
                <div className="post-window-left">
                    {postImage && <img src={postImage} alt={post.title || 'Post Image'} />}
                </div>
                <div className="post-window-right">
                    <div className="post-window-header">
                        <h2>{post.title || 'Untitled'}</h2>
                        <p>{post.description || ''}</p>
                        <p>{post.created_at ? new Date(post.created_at).toLocaleString() : ''}</p>
                        <p>{post.likesCount ?? 0} likes</p>
                        <p className="comments-count">{post.commentsCount ?? 0} comments</p>
                    </div>

                    <div className="post-window-comments">
                        {comments.map(c => (
                            <div key={c.id} className="comment">
                                <strong>{c.user.username}</strong>: {c.content}
                            </div>
                        ))}
                    </div>

                    <div className="post-window-add-comment">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && submitComment()}
                        />
                        <button onClick={submitComment}>Post</button>
                    </div>

                    <button className="post-window-close" onClick={onClose}>X</button>
                </div>
            </div>
        </div>
    );
}

export default PostWindow;
