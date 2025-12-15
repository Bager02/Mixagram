import { Link } from 'react-router-dom';
import '../css/NavBar.css';

function NavBar() {
    return (
        <div className="navbar-links">
            <div className="upload-post">
                <Link to="/upload">+</Link>
            </div>
            <div className="home-link">
                <Link to="/" className="nav-link">Mixagram</Link>
            </div>
            <div className="user-profile-link">
                <Link to="/user-profile" className="nav-link">Profile</Link>
            </div>
        </div>
    );
}

export default NavBar;