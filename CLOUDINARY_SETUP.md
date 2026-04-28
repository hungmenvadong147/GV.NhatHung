# Hướng Dẫn Cấu Hình Cloudinary

## Tại sao sử dụng Cloudinary?

Cloudinary là dịch vụ lưu trữ và quản lý media (ảnh, video) trên cloud với nhiều ưu điểm:

- ✅ Lưu trữ không giới hạn (theo gói)
- ✅ Tự động tối ưu hóa ảnh/video
- ✅ CDN toàn cầu - tải nhanh
- ✅ Không mất dữ liệu khi restart server
- ✅ Dễ dàng scale

## Cách lấy thông tin API từ Cloudinary

1. Truy cập: https://cloudinary.com/
2. Đăng nhập vào tài khoản của bạn
3. Vào **Dashboard** hoặc **Settings > API Keys**
4. Bạn sẽ thấy:
   - **Cloud Name**: Tên cloud của bạn
   - **API Key**: Mã API key
   - **API Secret**: Mã bí mật (click "Show" để xem)

## Cấu hình cho dự án

### Bước 1: Tạo file .env

Trong thư mục `server/`, tạo file `.env` với nội dung:

```env
PORT=3000
NODE_ENV=development

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=266483242265736
CLOUDINARY_API_SECRET=your_api_secret_here
```

### Bước 2: Điền thông tin

Thay thế các giá trị:

- `your_cloud_name_here` → Cloud Name từ Cloudinary Dashboard
- `266483242265736` → API Key của bạn (đã có)
- `your_api_secret_here` → API Secret từ Cloudinary (click Show để xem)

**Ví dụ:**
```env
CLOUDINARY_CLOUD_NAME=my-learning-site
CLOUDINARY_API_KEY=266483242265736
CLOUDINARY_API_SECRET=abcXYZ123456789
```

### Bước 3: Cài đặt dependencies mới

```bash
cd server
npm install
```

### Bước 4: Khởi động lại server

```bash
npm run dev
```

## Kiểm tra cấu hình

Khi server khởi động, bạn sẽ thấy một trong hai thông báo:

✅ **Thành công:**
```
✅ Cloudinary đã được cấu hình thành công
🚀 Server đang chạy tại http://localhost:3000
```

⚠️ **Chưa cấu hình:**
```
⚠️  Cloudinary chưa được cấu hình đầy đủ. Sẽ sử dụng local storage.
🚀 Server đang chạy tại http://localhost:3000
```

## Cách hoạt động

### Với Cloudinary (đã cấu hình):
- Upload video/ảnh → Lưu trên Cloudinary
- URL trả về: `https://res.cloudinary.com/your-cloud/...`
- Files được lưu trữ vĩnh viễn trên cloud
- Tự động tối ưu hóa chất lượng

### Không có Cloudinary (fallback):
- Upload video/ảnh → Lưu local trong `server/uploads/`
- URL trả về: `/uploads/videos/...` hoặc `/uploads/images/...`
- Files bị mất khi xóa thư mục hoặc deploy lên hosting

## Cấu trúc thư mục trên Cloudinary

Khi upload, files sẽ được tổ chức:

```
learning-website/
├── videos/
│   ├── video-1234567890.mp4
│   └── video-9876543210.mp4
└── images/
    ├── image-1234567890.jpg
    └── image-9876543210.png
```

## Giới hạn Free Plan

Cloudinary Free Plan cung cấp:
- 25 GB lưu trữ
- 25 GB băng thông/tháng
- Đủ cho website học tập cá nhân

## Bảo mật

⚠️ **QUAN TRỌNG:**

1. **KHÔNG** commit file `.env` lên Git
2. File `.gitignore` đã được cấu hình để bỏ qua `.env`
3. Giữ API Secret bí mật
4. Nếu lộ API Secret, regenerate ngay trên Cloudinary Dashboard

## Troubleshooting

### Lỗi: "Cloudinary chưa được cấu hình"
- Kiểm tra file `.env` có tồn tại trong `server/`
- Kiểm tra các giá trị đã điền đúng chưa
- Restart server sau khi sửa `.env`

### Upload thất bại
- Kiểm tra API credentials
- Kiểm tra kết nối internet
- Kiểm tra file size (video < 100MB, image < 5MB)

### URL không hiển thị
- Nếu dùng Cloudinary: URL sẽ là `https://res.cloudinary.com/...`
- Nếu dùng local: URL sẽ là `/uploads/...`
- Kiểm tra console log khi upload

## Liên hệ

Nếu cần hỗ trợ:
- Email: huynhnhathunghhcl@gmail.com
- Số điện thoại: 0786985687
