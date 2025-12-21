import ProfileBar from '../components/ProfileBar.jsx'
import ProfilePostCard from "../components/ProfilePostCard.jsx";
import { usePosts } from "../contexts/PostContext";
import { useEffect } from "react";
import '../css/ProfilePage.css'
import '../css/MainLayout.css';

function ProfilePage() {
    const { posts, fetchUserPosts } = usePosts();
    useEffect(() => {
        fetchUserPosts();
    }, []);

    return (
        <div className="main-content">
            <ProfileBar />
            {posts.length > 0 ? (
                <div className="profile-posts-grid">
                    {posts.map(post => (
                        <ProfilePostCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <p className="no-posts-message">No posts yet</p>
            )}
        </div>
    );
}

export default ProfilePage;