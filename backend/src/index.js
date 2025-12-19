import express from 'express';
import cors from 'cors';
import postRoutes from './routes/PostRoutes.js';
import authRoutes from './routes/AuthRoutes.js';
import profileRoutes from './routes/ProfileRoutes.js'
import { sessionMiddleware } from './middleware/session.js';

const app = express();
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
}));
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use(sessionMiddleware);

app.use('/posts', postRoutes);  
app.use('/auth', authRoutes);
app.use('/user', profileRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});