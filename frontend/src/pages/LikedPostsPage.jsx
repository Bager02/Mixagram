import { useEffect, useState } from 'react';
import { useLike } from '../contexts/LikeContext.jsx';
import PostCard from '../components/PostCard.jsx';
import { fetchLikedPosts } from '../services/LikeService.js';
import '../css/LikedPostsPage.css';
import '../css/MainLayout.css';

function LikedPostsPage() {
    const { likedPosts, handleToggleLike } = useLike();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadLikedPosts = async () => {
            try {
                const data = await fetchLikedPosts();
                setPosts(data); 
            } catch (err) {
                console.error('Failed to load liked posts:', err);
                setPosts([]);
            }
        };

        loadLikedPosts();
    }, []);

    return (
        <div className="main-content">
            <div className="liked-posts-header">
                <h1>❤️ Liked Posts</h1>
                <p>Posts you've shown some love</p>
            </div>

            {!posts.length ? (
                <div className="no-liked-posts">
                    <span className="empty-icon">💔</span>
                    <p>You haven't liked any posts yet.</p>
                    <span className="empty-subtext">
                        Start exploring and like posts to see them here!
                    </span>
                </div>
            ) : (
                <div className="liked-posts-grid">
                    {posts.map(post => (
                        <PostCard
                            key={post.id}
                            post={post}
                            isLiked={likedPosts.includes(post.id)}
                            onToggleLike={async () => {
                                const result = await handleToggleLike(post.id);
                                setPosts(prevPosts =>
                                    prevPosts.map(p =>
                                        p.id === post.id
                                            ? { ...p, likesCount: p.likesCount + (result ? 1 : -1) }
                                            : p
                                    )
                                );
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default LikedPostsPage;