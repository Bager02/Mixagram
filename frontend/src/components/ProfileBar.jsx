import '../css/ProfileBar.css'

function ProfileBar() {
    return (
        <>
            <div className="profile-bar">
                <img
                    className="profile-avatar"
                    src="https://i.imgur.com/6vmfl1j.jpeg" 
                    alt="Profile"
                />
{/*Change the src image above when implemented*/}
                <div className="profile-info">
                    <h2 className="profile-name">{/*{user.name}*/}{/*Delete "Mixa" after implementation*/}Mixa</h2>
                    <p className="profile-stats">
                        <span>{/*{user.posts}*/}12 posts</span>
                    </p>
                </div>
            </div>

            <div className="profile-divider"></div>
        </>
    );
}

export default ProfileBar