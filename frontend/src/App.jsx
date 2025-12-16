import { Routes, Route, Outlet } from 'react-router-dom'
import { useAuth } from "./contexts/AuthContext";
import { PostProvider } from './contexts/PostContext.jsx';
import HomePage from './pages/HomePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import UploadPage from './pages/UploadPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import './css/App.css'
import ProtectedLayout from './layouts/ProtectedLayout.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';

function App() {
    const { loading } = useAuth();

    return (
        <>
            <main className="main-content">
                <Routes>
                    <Route element={<PublicLayout />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Route>

                    <Route element={<ProtectedLayout />}>
                        <Route
                            element={
                                <PostProvider>
                                    <Outlet />
                                </PostProvider>
                            }
                        >
                            <Route path="/" element={<HomePage />} />
                            <Route path="/user-profile" element={<ProfilePage />} />
                            <Route path="/upload" element={<UploadPage />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
        </>
    )

}

export default App