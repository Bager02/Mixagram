

function ProfilePostCard({ post }) {
    return (
        <div className="profile-post-card">
            <div className="post-image">
                <img src={post.post_image_url} alt={post.title} />
            </div>
            <div className="post-info">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-description">{post.description}</p>
                <p className="post-likes">❤ {post.likes}</p>
            </div>
        </div>
    );
}

export default ProfilePostCard;