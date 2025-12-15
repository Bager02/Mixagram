import session from 'express-session';
import env from 'dotenv';

dotenv.config();

export const sessionMiddleware = session({
  secret: process.dotenv.SESSION_KEY,   
  resave: false,                
  saveUninitialized: false,     
  cookie: {
    httpOnly: true,             
    maxAge: 1000 * 60 * 60 * 24 
  }
});