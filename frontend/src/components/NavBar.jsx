import { Link } from 'react-router-dom';
import '../css/NavBar.css';

function NavBar() {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <Link to="/" className="app-name">Mixagram</Link>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-item">
                    <Link to="/user-profile">
                        <span className="nav-icon">👤</span>
                        <span className="nav-text">Profile</span>
                    </Link>
                </div>

                <div className="nav-item">
                    <Link to="/upload">
                        <span className="nav-icon">📤</span>
                        <span className="nav-text">Upload</span>
                    </Link>
                </div>

                <div className="nav-item">
                    <button>
                        <span className="nav-icon">💬</span>
                        <span className="nav-text">Chat</span>
                    </button>
                </div>

                <div className="nav-item">
                    <Link to="/liked-posts">
                        <span className="nav-icon">❤️</span>
                        <span className="nav-text">Liked</span>
                    </Link>
                </div>
            </nav>

            <div className="sidebar-footer">
                <Link to="/contact">
                    <span className="nav-icon">📧</span>
                    <span className="nav-text">Contact</span>
                </Link>
            </div>
        </div>
    );
}

export default NavBar;