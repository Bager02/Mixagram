import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const postStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './uploads/posts';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

export const uploadPost = multer({ storage: postStorage });

export const profilePfpStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './uploads/profile-pictures';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

export const uploadProfilePfp = multer({ storage: profilePfpStorage });