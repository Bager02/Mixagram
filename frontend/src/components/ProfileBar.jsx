import '../css/ProfileBar.css'
import { useAuth } from "../contexts/AuthContext.jsx";
import { useState, useRef, useEffect } from 'react';
import ConfirmPopup from "../components/ConfirmPopup.jsx";

function ProfileBar() {
    const { handleLogout, handleDeleteUser, handleProfileUpdate, handleProfilePictureUpdate, user } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [newUsername, setNewUsername] = useState(user?.username || "");
    const [newBio, setNewBio] = useState(user?.bio || "");
    const [previewImage, setPreviewImage] = useState(null);
    const dropdownRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const onDeleteClick = () => {
        setIsConfirmOpen(true);
        setIsDropdownOpen(false);
    };

    const onConfirmDelete = async () => {
        setIsConfirmOpen(false);
        await handleDeleteUser();
    };

    const onCancelDelete = () => setIsConfirmOpen(false);

    const onEditClick = () => {
        setNewUsername(user?.username || "");
        setNewBio(user?.bio || "");
        setIsEditOpen(true);
        setIsDropdownOpen(false);
    };

    const onSaveEdit = async () => {
        try {
            await handleProfileUpdate({ username: newUsername, bio: newBio });
            setIsEditOpen(false);
        } catch (err) {
            console.error(err);
            alert(err.message || "Failed to update profile");
        }
    };

    const onCancelEdit = () => setIsEditOpen(false);

    const onAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const onProfilePictureChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);

        try {
            const updatedUser = await handleProfilePictureUpdate(file);
            setPreviewImage(null);
        } catch (err) {
            console.error(err);
            alert(err.message || "Failed to update profile picture");
            setPreviewImage(null);
        }
    };

    return (
        <>
            <div className="profile-bar">
                <div className="profile-left">
                    <img
                        className="profile-avatar"
                        src={
                            previewImage ||
                            (user?.profileImage ?? 'http://localhost:8000/uploads/profile-pictures/default-pfp.png')
                        }
                        alt="Profile"
                        onClick={onAvatarClick}
                        style={{ cursor: "pointer" }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={onProfilePictureChange}
                        style={{ display: "none" }}
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
                        <div className="dropdown-menu open">
                            <button className="dropdown-item" onClick={onEditClick}>
                                <span className="dropdown-icon">✏️</span>
                                Edit Profile
                            </button>
                            <button className="dropdown-item logout" onClick={handleLogout}>
                                <span className="dropdown-icon">🚪</span>
                                Logout
                            </button>
                            <button className="dropdown-item delete" onClick={onDeleteClick}>
                                <span className="dropdown-icon">🗑️</span>
                                Delete Profile
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <ConfirmPopup
                isOpen={isConfirmOpen}
                message="Are you sure you want to delete your account? This action cannot be undone."
                onConfirm={onConfirmDelete}
                onCancel={onCancelDelete}
            />
            {isEditOpen && (
                <div className="edit-profile-overlay">
                    <div className="edit-profile-popup">
                        <h3>Edit Profile</h3>
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <textarea
                            value={newBio}
                            onChange={(e) => setNewBio(e.target.value)}
                            placeholder="Bio"
                            rows={4}
                        />
                        <div className="popup-buttons">
                            <button onClick={onSaveEdit}>Save</button>
                            <button onClick={onCancelEdit}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="profile-divider"></div>
        </>
    );
}

export default ProfileBar