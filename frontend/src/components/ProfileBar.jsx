import '../css/ProfileBar.css'
import { useAuth } from "../contexts/AuthContext.jsx";
import { useState, useRef, useEffect } from 'react';

function ProfileBar() {
    const { handleLogout, user } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <div className="profile-bar">
                <div className="profile-left">
                    <img
                        className="profile-avatar"
                        src={user?.profileImage || 'https://i.imgur.com/OjqOzDB.png'}
                        alt="Profile"
                    />
                    <div className="profile-text">
                        <h2 className="profile-name">{user?.username}</h2>
                        <div className="profile-stats">
                            <span>{user?.postCount ?? 0}</span> posts
                        </div>
                        <p className="profile-bio">{user.bio}</p>
                    </div>
                </div>
                <div className="profile-menu" ref={dropdownRef}>
                    <button 
                        className="menu-button" 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        ⋮
                    </button>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <button className="dropdown-item" onClick={() => console.log('Edit profile')}>
                                <span className="dropdown-icon">✏️</span>
                                Edit Profile
                            </button>
                            <button className="dropdown-item logout" onClick={handleLogout}>
                                <span className="dropdown-icon">🚪</span>
                                Logout
                            </button>
                            <button className="dropdown-item delete" onClick={() => console.log('Delete profile')}>
                                <span className="dropdown-icon">🗑️</span>
                                Delete Profile
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="profile-divider"></div>
        </>
    );
}

export default ProfileBar