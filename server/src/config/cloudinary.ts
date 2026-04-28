import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Kiểm tra cấu hình
export const checkCloudinaryConfig = (): boolean => {
  const { cloud_name, api_key, api_secret } = cloudinary.config();
  
  if (!cloud_name || !api_key || !api_secret) {
    console.warn('⚠️  Cloudinary chưa được cấu hình đầy đủ. Sẽ sử dụng local storage.');
    return false;
  }
  
  console.log('✅ Cloudinary đã được cấu hình thành công');
  return true;
};

export default cloudinary;
