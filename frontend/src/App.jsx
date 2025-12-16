import { useState } from 'react'
import NavBar from './components/NavBar.jsx'
import HomePage from './pages/HomePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import UploadPage from './pages/UploadPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from "./contexts/AuthContext";
import './css/App.css'


function App() {
    const { user, loading } = useAuth();
    const location = useLocation();
    const hideNavBarRoutes = ["/register", "/login"];
    const shouldShowNavBar = !hideNavBarRoutes.includes(location.pathname);

    //if (loadingAuth) return <div>Loading...</div>;

    return (
        <>
            {shouldShowNavBar && <NavBar />}

            <main className="main-content">
                <Routes>
                    <Route path='/register' element={<RegisterPage />} />
                    <Route
                        path="/"
                        element={user ? <HomePage /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/login"
                        element={user ? <Navigate to="/" /> : <LoginPage />}
                    />
                    <Route path='/user-profile' element={<ProfilePage />} />
                    <Route path='/upload' element={<UploadPage />} />
                </Routes>
            </main>
        </>
    )

}

export default App