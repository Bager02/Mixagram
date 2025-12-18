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
                        Profile
                    </Link>
                </div>

                <div className="nav-item">
                    <Link to="/upload">
                        <span className="nav-icon">📤</span>
                        Upload
                    </Link>
                </div>

                <div className="nav-item">
                    <button>
                        <span className="nav-icon">💬</span>
                        Chat
                    </button>
                </div>

                <div className="nav-item">
                    <button>
                        <span className="nav-icon">❤️</span>
                        Liked
                    </button>
                </div>
            </nav>

            <div className="sidebar-footer">
                <button>
                    <span className="nav-icon">📧</span>
                    Contact
                </button>
            </div>
        </div>
    );
}

export default NavBar;