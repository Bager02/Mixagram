import '../css/PostCard.css';
import { useState } from 'react';
import { useLike } from '../contexts/LikeContext.jsx';
import { usePosts } from '../contexts/PostContext';
import PostWindow from './PostWindow.jsx';
import { getImageUrl } from '../utils/getImageUrl.js';
import defaultPfp from '../assets/default-pfp.png';

function PostCard({ post: initialPost }) {
    const { likedPosts, handleToggleLike } = useLike();
    const { toggleLikeOnPost } = usePosts();
    const isLiked = likedPosts.includes(initialPost.id);

    const [post, setPost] = useState(initialPost);
    const [isPostWindowOpen, setIsPostWindowOpen] = useState(false);

    const toggleLike = async () => {
        const liked = await handleToggleLike(post.id);
        toggleLikeOnPost(post.id, liked);
        setPost(prev => ({
            ...prev,
            likesCount: liked ? (prev.likesCount ?? 0) + 1 : (prev.likesCount ?? 1) - 1
        }));
    };

    const handleCommentAdded = () => {
        setPost(prev => ({
            ...prev,
            commentsCount: (prev.commentsCount ?? 0) + 1
        }));
    };

    const userAvatar = getImageUrl(post.user?.profile_image, defaultPfp);
    const postImage = post.post_image_url ? getImageUrl(post.post_image_url) : null;

    return (
        <>
            <div className="post">
                <div className="post-user-info">
                    <img
                        className="user-avatar"
                        src={userAvatar}
                        alt={post.user?.username || 'User Avatar'}
                    />
                    <span className="user-name">{post.user?.username || 'Unknown User'}</span>
                </div>

                <div className="post-image" onClick={() => setIsPostWindowOpen(true)}>
                    {postImage && <img src={postImage} alt={post.title || 'Post Image'} />}
                </div>

                <div className="post-content">
                    <div className="post-actions">
                        <button className="like-button" onClick={toggleLike}>
                            {isLiked ? '❤️' : '🤍'}
                        </button>
                        <p className="like-count">{post.likesCount ?? 0} likes</p>
                        <button className="comments-button" onClick={() => setIsPostWindowOpen(true)}>
                            {post.commentsCount ?? 0} comments
                        </button>
                    </div>

                    <h2 className="post-title">{post.title || 'Untitled'}</h2>
                    <p className="post-description">{post.description || ''}</p>
                    <p className="post-timestamp">{post.created_at ? new Date(post.created_at).toLocaleString() : ''}</p>
                </div>
            </div>

            {isPostWindowOpen && (
                <PostWindow
                    post={post}
                    onClose={() => setIsPostWindowOpen(false)}
                    onCommentAdded={handleCommentAdded}
                />
            )}
        </>
    );
}

export default PostCard;