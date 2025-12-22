import '../css/PostCard.css'
import { useLike } from '../contexts/LikeContext.jsx';
import { usePosts } from '../contexts/PostContext';

const BACKEND_URL = 'http://localhost:8000';

function PostCard({ post }) {
    const { likedPosts, handleToggleLike } = useLike();
    const { toggleLikeOnPost } = usePosts();
    const isLiked = likedPosts.includes(post.id);

    const toggleLike = async () => {
        const result = await handleToggleLike(post.id);
        toggleLikeOnPost(post.id, result);
    };

    const getImageUrl = (path, defaultPath) => {
        if (!path || path === '/default-avatar.jpg') return defaultPath;
        return path.startsWith('http') ? path : `${BACKEND_URL}${path}`;
    };

    return (
        <div className="post">
            <div className="post-user-info">
                <img
                    className="user-avatar"
                    src={getImageUrl(post.user?.profile_image, `${BACKEND_URL}/uploads/profile-pictures/default-pfp.png`)}
                    alt={post.user?.username || 'User Avatar'}
                />
                <span className="user-name">{post.user?.username || 'Unknown User'}</span>
            </div>
            <div className="post-image">
                {post.post_image_url && (
                    <img src={getImageUrl(post.post_image_url)} alt={post.title || 'Post Image'} />
                )}
            </div>
            <div className="post-content">
                <div className="post-actions">
                    <button className="like-button" onClick={toggleLike}>
                        {isLiked ? '❤️' : '🤍'}
                    </button>
                    <p className="like-count">{post.likesCount ?? post._count?.likes ?? 0} likes</p>
                </div>
                <h2 className="post-title">{post.title || 'Untitled'}</h2>
                <p className="post-description">{post.description || ''}</p>
                <p className="post-timestamp">{post.created_at ? new Date(post.created_at).toLocaleString() : ''}</p>
            </div>
        </div>
    );
}

export default PostCard;