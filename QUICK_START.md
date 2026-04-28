# 🚀 Quick Start Guide

## Bước 1: Cài đặt Git (nếu chưa có)

Tải và cài đặt Git:
- **Windows**: https://git-scm.com/download/win
- Sau khi cài đặt, restart terminal

## Bước 2: Push code lần đầu lên GitHub

### Cách 1: Dùng file .bat (Đơn giản nhất - Windows)

Double-click vào file:
```
push-to-github.bat
```

File này sẽ tự động:
- Khởi tạo Git
- Add tất cả files
- Commit
- Push lên GitHub

### Cách 2: Dùng lệnh thủ công

Mở **Git Bash** hoặc **Command Prompt** tại thư mục dự án:

```bash
# 1. Khởi tạo Git
git init

# 2. Cấu hình user
git config user.name "hungmenvadong147"
git config user.email "huynhnhathunghhcl@gmail.com"

# 3. Add files
git add .

# 4. Commit
git commit -m "first commit: Personal Learning Website"

# 5. Đổi branch thành main
git branch -M main

# 6. Thêm remote
git remote add origin https://github.com/hungmenvadong147/hung.git

# 7. Push
git push -u origin main
```

## Bước 3: Cài đặt dependencies

```bash
npm run install:all
```

## Bước 4: Cấu hình Cloudinary (tùy chọn)

1. Copy file template:
```bash
cd server
cp .env.template .env
```

2. Mở file `server/.env` và điền thông tin Cloudinary

3. Xem hướng dẫn chi tiết: `CLOUDINARY_SETUP.md`

## Bước 5: Chạy ứng dụng

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Các lần cập nhật sau này

### Cách 1: Dùng file .bat (Đơn giản)

Double-click vào file:
```
update-github.bat
```

### Cách 2: Dùng lệnh

```bash
git add .
git commit -m "Mô tả thay đổi"
git push
```

## Xác thực GitHub

Khi push lần đầu, GitHub sẽ yêu cầu đăng nhập:

### Personal Access Token (Khuyến nghị)

1. Vào: https://github.com/settings/tokens
2. Generate new token (classic)
3. Chọn quyền: `repo`
4. Copy token
5. Khi push:
   - Username: `hungmenvadong147`
   - Password: `<paste_token_here>`

## Files quan trọng

- `GIT_SETUP.md` - Hướng dẫn Git chi tiết
- `CLOUDINARY_SETUP.md` - Hướng dẫn cấu hình Cloudinary
- `SETUP.md` - Hướng dẫn cài đặt dự án
- `README.md` - Tài liệu dự án
- `push-to-github.bat` - Script push lần đầu
- `update-github.bat` - Script cập nhật

## Liên hệ

- Email: huynhnhathunghhcl@gmail.com
- Số điện thoại: 0786985687
- GitHub: https://github.com/hungmenvadong147/hung
