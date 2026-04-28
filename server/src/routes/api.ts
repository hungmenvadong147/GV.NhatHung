import express, { Request, Response } from 'express';
import { uploadVideo, uploadImage, isCloudinaryConfigured } from '../middleware/uploadCloudinary';
import { SiteData, Course, MenuItem, GalleryImage } from '../types';
import { initialData } from '../data/initialData';

const router = express.Router();

// In-memory database (trong production nên dùng database thật)
let siteData: SiteData = { ...initialData };

// GET: Lấy tất cả dữ liệu
router.get('/data', (req: Request, res: Response) => {
  res.json(siteData);
});

// PUT: Cập nhật thông tin liên hệ
router.put('/contact', (req: Request, res: Response) => {
  const { phone, email } = req.body;
  siteData.contact = { phone, email };
  res.json({ success: true, data: siteData.contact });
});

// Menu Items Routes
router.get('/menu-items', (req: Request, res: Response) => {
  res.json(siteData.menuItems);
});

router.put('/menu-items/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, videoUrl } = req.body;
  
  const index = siteData.menuItems.findIndex(item => item.id === id);
  if (index !== -1) {
    siteData.menuItems[index] = { ...siteData.menuItems[index], title, content, videoUrl };
    res.json({ success: true, data: siteData.menuItems[index] });
  } else {
    res.status(404).json({ success: false, message: 'Menu item không tìm thấy' });
  }
});

// Courses Routes
router.get('/courses', (req: Request, res: Response) => {
  res.json(siteData.courses);
});

router.post('/courses', (req: Request, res: Response) => {
  const { title, description, videoUrl } = req.body;
  const newCourse: Course = {
    id: Date.now().toString(),
    title,
    description,
    videoUrl: videoUrl || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  siteData.courses.push(newCourse);
  res.json({ success: true, data: newCourse });
});

router.put('/courses/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, videoUrl } = req.body;
  
  const index = siteData.courses.findIndex(course => course.id === id);
  if (index !== -1) {
    siteData.courses[index] = {
      ...siteData.courses[index],
      title,
      description,
      videoUrl,
      updatedAt: new Date().toISOString()
    };
    res.json({ success: true, data: siteData.courses[index] });
  } else {
    res.status(404).json({ success: false, message: 'Khóa học không tìm thấy' });
  }
});

router.delete('/courses/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = siteData.courses.findIndex(course => course.id === id);
  
  if (index !== -1) {
    siteData.courses.splice(index, 1);
    res.json({ success: true, message: 'Đã xóa khóa học' });
  } else {
    res.status(404).json({ success: false, message: 'Khóa học không tìm thấy' });
  }
});

// Gallery Routes
router.get('/gallery', (req: Request, res: Response) => {
  res.json(siteData.gallery);
});

router.put('/gallery/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { url, alt } = req.body;
  
  const index = siteData.gallery.findIndex(img => img.id === id);
  if (index !== -1) {
    siteData.gallery[index] = { ...siteData.gallery[index], url, alt };
    res.json({ success: true, data: siteData.gallery[index] });
  } else {
    res.status(404).json({ success: false, message: 'Hình ảnh không tìm thấy' });
  }
});

// Upload Routes
router.post('/upload/video', uploadVideo.single('video'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Không có file video' });
  }
  
  // Nếu dùng Cloudinary, file.path sẽ là URL từ Cloudinary
  // Nếu dùng local, tạo URL local
  const videoUrl = isCloudinaryConfigured 
    ? (req.file as any).path 
    : `/uploads/videos/${req.file.filename}`;
  
  res.json({ success: true, url: videoUrl });
});

router.post('/upload/image', uploadImage.single('image'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Không có file ảnh' });
  }
  
  // Nếu dùng Cloudinary, file.path sẽ là URL từ Cloudinary
  // Nếu dùng local, tạo URL local
  const imageUrl = isCloudinaryConfigured 
    ? (req.file as any).path 
    : `/uploads/images/${req.file.filename}`;
  
  res.json({ success: true, url: imageUrl });
});

export default router;
