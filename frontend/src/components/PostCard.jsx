
import '../css/PostCard.css'

function PostCard({ post }) {

    return <div className="post">
        <div className="post-user-info">
            <img className="user-avatar" src={post.user.profile_image} alt="User Avatar" />
            <span className="user-name">{post.user.username}</span>
        </div>
        <div className="post-image">
            <img src={post.post_image_url} alt="Post Image" />
        </div>
        <div className="post-content">
            <div className="post-actions">
                <button className="like-button">❤</button>
                <p className="like-count">{post.likes} likes</p>
            </div>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-description">{post.description}</p>
            <p className="post-timestamp">{new Date(post.created_at).toLocaleString()}</p>
        </div>
    </div>
}

export default PostCard;