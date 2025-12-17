import ProfileBar from '../components/ProfileBar.jsx'
import ProfilePostCard from "../components/ProfilePostCard.jsx";
import { useAuth } from "../contexts/AuthContext";
import '../css/ProfilePage.css'

function ProfilePage() {
    const { userPosts } = useAuth();

    if (!userPosts.length) return <p>No posts yet.</p>;

    return (
        <>
            <ProfileBar />
            <div className="profile-posts-grid">
                {userPosts.map(post => (
                    <ProfilePostCard key={post.id} post={post} />
                ))}
            </div>
        </>
    );
}

export default ProfilePage;