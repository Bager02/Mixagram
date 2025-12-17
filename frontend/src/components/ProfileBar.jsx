import '../css/ProfileBar.css'
import { useAuth } from "../contexts/AuthContext.jsx";

function ProfileBar() {
    const { handleLogout, user } = useAuth();

    return (
        <>
            <div className="profile-bar">
                <div className="profile-left">
                    <img
                        className="profile-avatar"
                        src={user?.profileImage || 'https://i.imgur.com/OjqOzDB.png'}
                    />
                    <div className="profile-text">
                        <h2 className="profile-name">{user?.username}</h2>
                        <div className="profile-stats">
                            <span>{user?.postCount ?? 0}</span> posts
                        </div>
                    </div>
                </div>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="profile-divider"></div>
        </>
    );
}

export default ProfileBar