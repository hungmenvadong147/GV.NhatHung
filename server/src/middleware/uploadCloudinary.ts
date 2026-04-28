import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary, { checkCloudinaryConfig } from '../config/cloudinary';
import path from 'path';
import fs from 'fs';

const isCloudinaryConfigured = checkCloudinaryConfig();

// Nếu Cloudinary được cấu hình, sử dụng Cloudinary Storage
// Nếu không, sử dụng local storage như cũ
let videoStorage: multer.StorageEngine;
let imageStorage: multer.StorageEngine;

if (isCloudinaryConfigured) {
  // Cloudinary Storage cho video
  videoStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'learning-website/videos',
      resource_type: 'video',
      allowed_formats: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'],
      transformation: [{ quality: 'auto' }]
    } as any
  });

  // Cloudinary Storage cho image
  imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'learning-website/images',
      resource_type: 'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      transformation: [{ quality: 'auto', fetch_format: 'auto' }]
    } as any
  });
} else {
  // Fallback to local storage
  const uploadDir = path.join(__dirname, '../../uploads');
  const videoDir = path.join(uploadDir, 'videos');
  const imageDir = path.join(uploadDir, 'images');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, videoDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'video-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

  imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, imageDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'image-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
}

// File filter cho video
const videoFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /mp4|avi|mov|wmv|flv|mkv/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype.startsWith('video/');

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận file video!'));
  }
};

// File filter cho image
const imageFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype.startsWith('image/');

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận file ảnh!'));
  }
};

export const uploadVideo = multer({
  storage: videoStorage,
  fileFilter: videoFilter,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});

export const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export { isCloudinaryConfigured };
