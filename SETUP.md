# Hướng Dẫn Cài Đặt và Chạy Website

## Yêu cầu hệ thống

- Node.js (phiên bản 16 trở lên)
- npm hoặc yarn

## Các bước cài đặt

### 1. Cài đặt dependencies

Chạy lệnh sau ở thư mục gốc của dự án:

```bash
npm run install:all
```

Lệnh này sẽ cài đặt dependencies cho cả frontend và backend.

### 2. Cấu hình môi trường (tùy chọn)

Tạo file `.env` trong thư mục `server/` (copy từ `.env.example`):

```bash
cd server
cp .env.example .env
```

Mặc định server sẽ chạy ở port 3000.

### 3. Chạy ứng dụng

#### Chạy cả frontend và backend cùng lúc:

```bash
npm run dev
```

#### Hoặc chạy riêng từng phần:

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

### 4. Truy cập ứng dụng

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Cấu trúc dự án

```
├── client/                 # Frontend React + TypeScript
│   ├── src/
│   │   ├── components/    # Các React components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   ├── App.tsx        # Component chính
│   │   └── main.tsx       # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── server/                # Backend Node.js + Express + TypeScript
│   ├── src/
│   │   ├── data/         # Dữ liệu khởi tạo
│   │   ├── middleware/   # Middleware (upload files)
│   │   ├── routes/       # API routes
│   │   ├── types/        # TypeScript types
│   │   └── index.ts      # Entry point
│   ├── uploads/          # Thư mục lưu files upload
│   ├── package.json
│   └── tsconfig.json
│
├── package.json          # Root package.json
└── README.md
```

## Tính năng chính

### Chế độ xem thường (User)
- Xem thông tin liên hệ
- Điều hướng qua menu hamburger
- Xem danh sách khóa học
- Xem gallery hình ảnh học trò

### Chế độ Admin
Nhấn nút "🔒 Admin" ở góc dưới phải để bật chế độ admin.

**Có thể:**
- Chỉnh sửa thông tin liên hệ (số điện thoại, email)
- Chỉnh sửa nội dung các mục menu
- Upload video cho menu items
- Thêm/sửa/xóa khóa học
- Upload video cho khóa học
- Thay đổi hình ảnh trong gallery

## API Endpoints

### Contact
- `GET /api/data` - Lấy tất cả dữ liệu
- `PUT /api/contact` - Cập nhật thông tin liên hệ

### Menu Items
- `GET /api/menu-items` - Lấy danh sách menu
- `PUT /api/menu-items/:id` - Cập nhật menu item

### Courses
- `GET /api/courses` - Lấy danh sách khóa học
- `POST /api/courses` - Tạo khóa học mới
- `PUT /api/courses/:id` - Cập nhật khóa học
- `DELETE /api/courses/:id` - Xóa khóa học

### Gallery
- `GET /api/gallery` - Lấy danh sách hình ảnh
- `PUT /api/gallery/:id` - Cập nhật hình ảnh

### Upload
- `POST /api/upload/video` - Upload video
- `POST /api/upload/image` - Upload hình ảnh

## Build cho production

### Build cả frontend và backend:
```bash
npm run build
```

### Chạy production:
```bash
cd server
npm start
```

## Lưu ý

1. **Dữ liệu**: Hiện tại dữ liệu được lưu trong memory (RAM). Khi restart server, dữ liệu sẽ reset về mặc định. Để lưu trữ lâu dài, cần tích hợp database (MongoDB, PostgreSQL, etc.)

2. **Upload files**: 
   - **Với Cloudinary** (khuyến nghị): Files được lưu trên cloud, không mất khi restart. Xem `CLOUDINARY_SETUP.md`
   - **Không có Cloudinary**: Files được lưu trong `server/uploads/`, có thể mất khi deploy

3. **CORS**: Backend đã cấu hình CORS để cho phép frontend truy cập.

4. **Responsive**: Website đã được tối ưu cho cả desktop và mobile.

5. **Cloudinary**: Xem file `CLOUDINARY_SETUP.md` để biết cách cấu hình lưu trữ cloud.

## Troubleshooting

### Lỗi khi cài đặt
```bash
# Xóa node_modules và cài lại
rm -rf node_modules client/node_modules server/node_modules
npm run install:all
```

### Port đã được sử dụng
Thay đổi port trong:
- Backend: `server/.env` (PORT=3000)
- Frontend: `client/vite.config.ts` (port: 5173)

### Không upload được file
Kiểm tra quyền ghi của thư mục `server/uploads/`

## Liên hệ hỗ trợ

- Email: huynhnhathunghhcl@gmail.com
- Số điện thoại: 0786985687
