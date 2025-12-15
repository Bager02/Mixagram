import { useState } from 'react'
import NavBar from './components/NavBar.jsx'
import HomePage from './pages/HomePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import UploadPage from './pages/UploadPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { Routes, Route, useLocation } from 'react-router-dom'
import './css/App.css'


function App() {
    const location = useLocation();

    const hideNavBarRoutes = ["/register", "/login"];

    const shouldShowNavBar = !hideNavBarRoutes.includes(location.pathname);

    return (
        <>
            {shouldShowNavBar && <NavBar />}

            <main className="main-content">
                <Routes>
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/' element={<HomePage />} />
                    <Route path='/user-profile' element={<ProfilePage />} />
                    <Route path='/upload' element={<UploadPage />} />
                </Routes>
            </main>
        </>
    )

}

export default App
