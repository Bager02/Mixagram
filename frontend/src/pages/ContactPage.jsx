import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../css/ContactPage.css';

function ContactPage() {
    const { user } = useAuth();

    return (
        <div className={`contact-page ${user ? 'with-navbar' : ''}`}>
            <div className="contact-container">
                {!user && (
                    <Link to="/login" className="back-button">
                        ← Back to Login
                    </Link>
                )}

                <h1>Contact Us</h1>

                <div className="contact-section">
                    <h2>📧 Email</h2>
                    <p><a href="mailto:mihajlo2002@hotmail.rs">mihajlo2002@hotmail.rs</a></p>
                    <p><a href="mailto:mihajlo50005345@gmail.com">mihajlo50005345@gmail.com</a></p>
                </div>

                <div className="contact-section">
                    <h2>GitHub</h2>
                    <p><a href="https://github.com/Bager02" target="_blank" rel="noopener noreferrer">https://github.com/Bager02</a></p>
                </div>

                <div className="contact-section">
                    <h2>LinkedIn</h2>
                    <p><a href="https://www.linkedin.com/in/mihajlo-stosic-697498357/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/mihajlo-stosic-697498357/</a></p>
                </div>

                <div className="contact-footer">
                    <p>Hope you like my little project, it was a lot of fun making it!</p>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;