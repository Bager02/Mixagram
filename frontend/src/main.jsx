import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { PostProvider } from './contexts/PostContext.jsx';
import { LikeProvider } from './contexts/LikeContext.jsx';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <LikeProvider>
            <App />
          </LikeProvider>
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
