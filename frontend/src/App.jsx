import { Routes, Route, Outlet } from 'react-router-dom';
import { PostProvider } from './contexts/PostContext.jsx';
import { LikeProvider } from './contexts/LikeContext.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import UploadPage from './pages/UploadPage.jsx';
import LikedPostsPage from './pages/LikedPostsPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import './css/App.css';
import ProtectedLayout from './layouts/ProtectedLayout.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';
import PublicAccessLayout from './layouts/PublicAccessLayout.jsx';

function App() {
    return (
        <main>
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                <Route element={<PublicAccessLayout />}>
                    <Route path="/contact" element={<ContactPage />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route
                        element={
                            <LikeProvider>
                                <PostProvider>
                                    <Outlet />
                                </PostProvider>
                            </LikeProvider>
                        }
                    >
                        <Route path="/" element={<HomePage />} />
                        <Route path="/user-profile" element={<ProfilePage />} />
                        <Route path="/upload" element={<UploadPage />} />
                        <Route path="/liked-posts" element={<LikedPostsPage />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </main>
    );
}

export default App;