import { usePosts } from "../contexts/PostContext";
import { useState } from "react";
import ConfirmPopup from "./ConfirmPopup";

function ProfilePostCard({ post }) {
    const { deletePostFromUser } = usePosts();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deletePostFromUser(post.id);
            setIsConfirmOpen(false);
        } catch (err) {
            alert(err.message || "Failed to delete post");
            setIsConfirmOpen(false);
        }
    };

    const handleCancelDelete = () => {
        setIsConfirmOpen(false);
    };

    return (
        <>
            <div className="profile-post-card">
                <div className="post-image">
                    <img src={post.post_image_url} alt={post.title} />
                    <button className="delete-button" onClick={handleDeleteClick}>
                        🗑️
                    </button>
                </div>
                <div className="post-info">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-description">{post.description}</p>
                    <p className="post-likes">❤ {post.likes}</p>
                </div>
            </div>
            <ConfirmPopup
                isOpen={isConfirmOpen}
                message="Are you sure you want to delete this post? This action cannot be undone."
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </>
    );
}

export default ProfilePostCard;