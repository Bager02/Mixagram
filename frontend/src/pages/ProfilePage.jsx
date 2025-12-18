import ProfileBar from '../components/ProfileBar.jsx'
import ProfilePostCard from "../components/ProfilePostCard.jsx";
import { useAuth } from "../contexts/AuthContext";
import '../css/ProfilePage.css'
import '../css/MainLayout.css';

function ProfilePage() {
    const { userPosts } = useAuth();

    return (
        <div className="main-content">
            <ProfileBar />
            {userPosts.length > 0 ? (
                <div className="profile-posts-grid">
                    {userPosts.map(post => (
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