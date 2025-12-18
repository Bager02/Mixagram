import '../css/PostCard.css'

function PostCard({ post }) {

    return (
        <div className="post">
            <div className="post-user-info">
                <img
                    className="user-avatar"
                    src={post.user?.profile_image || 'https://i.imgur.com/v6pgc42.jpeg'}
                    alt={post.user?.username || 'User Avatar'}
                />
                <span className="user-name">{post.user?.username || 'Unknown User'}</span>
            </div>
            <div className="post-image">
                {post.post_image_url && <img src={post.post_image_url} alt={post.title || 'Post Image'} />}
            </div>
            <div className="post-content">
                <div className="post-actions">
                    <button className="like-button">❤</button>
                    <p className="like-count">{post.likes ?? 0} likes</p>
                </div>
                <h2 className="post-title">{post.title || 'Untitled'}</h2>
                <p className="post-description">{post.description || ''}</p>
                <p className="post-timestamp">{post.created_at ? new Date(post.created_at).toLocaleString() : ''}</p>
            </div>
        </div>
    );
}

export default PostCard;