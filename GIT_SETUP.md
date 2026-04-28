# Hướng Dẫn Push Code Lên GitHub

## Yêu cầu

Cài đặt Git nếu chưa có:
- Tải Git tại: https://git-scm.com/download/win
- Sau khi cài đặt, restart terminal/command prompt

## Các bước thực hiện

### 1. Mở Git Bash hoặc Command Prompt tại thư mục dự án

```bash
cd D:\Code wed
```

### 2. Khởi tạo Git repository

```bash
git init
```

### 3. Thêm tất cả files vào staging

```bash
git add .
```

### 4. Tạo commit đầu tiên

```bash
git commit -m "first commit: Personal Learning Website with TypeScript"
```

### 5. Đổi tên branch thành main

```bash
git branch -M main
```

### 6. Thêm remote repository

```bash
git remote add origin https://github.com/hungmenvadong147/hung.git
```

### 7. Push code lên GitHub

```bash
git push -u origin main
```

**Lưu ý:** Nếu repository trên GitHub đã có nội dung, bạn có thể cần force push:

```bash
git push -u origin main --force
```

## Các lần cập nhật sau này

Khi có thay đổi mới, chỉ cần chạy:

```bash
# 1. Thêm các file đã thay đổi
git add .

# 2. Tạo commit với message mô tả thay đổi
git commit -m "Mô tả thay đổi của bạn"

# 3. Push lên GitHub
git push
```

## Các lệnh Git hữu ích

### Kiểm tra trạng thái

```bash
git status
```

### Xem lịch sử commit

```bash
git log --oneline
```

### Xem các file đã thay đổi

```bash
git diff
```

### Hủy thay đổi chưa commit

```bash
git checkout -- <file>
```

### Pull code mới nhất từ GitHub

```bash
git pull origin main
```

## Xác thực GitHub

Nếu GitHub yêu cầu đăng nhập:

### Cách 1: Personal Access Token (Khuyến nghị)

1. Vào GitHub: Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Generate new token (classic)
3. Chọn quyền: `repo` (full control)
4. Copy token
5. Khi push, dùng token thay cho password:
   - Username: `hungmenvadong147`
   - Password: `<paste_token_here>`

### Cách 2: SSH Key

1. Tạo SSH key:
```bash
ssh-keygen -t ed25519 -C "huynhnhathunghhcl@gmail.com"
```

2. Copy public key:
```bash
cat ~/.ssh/id_ed25519.pub
```

3. Thêm vào GitHub: Settings > SSH and GPG keys > New SSH key

4. Đổi remote URL:
```bash
git remote set-url origin git@github.com:hungmenvadong147/hung.git
```

## Cấu hình Git (lần đầu)

```bash
git config --global user.name "hungmenvadong147"
git config --global user.email "huynhnhathunghhcl@gmail.com"
```

## Troubleshooting

### Lỗi: "fatal: remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/hungmenvadong147/hung.git
```

### Lỗi: "Updates were rejected"

```bash
git pull origin main --rebase
git push origin main
```

### Lỗi: "Permission denied"

- Kiểm tra xác thực (Personal Access Token hoặc SSH)
- Đảm bảo bạn có quyền push vào repository

## .gitignore

File `.gitignore` đã được tạo sẵn để bỏ qua:
- `node_modules/`
- `dist/`
- `build/`
- `uploads/`
- `.env`
- `*.log`

## Repository Information

- **Repository**: https://github.com/hungmenvadong147/hung.git
- **Owner**: hungmenvadong147
- **Email**: huynhnhathunghhcl@gmail.com
- **Branch**: main

## Workflow đề xuất

1. **Trước khi code**: `git pull` để lấy code mới nhất
2. **Sau khi code**: 
   ```bash
   git add .
   git commit -m "Mô tả thay đổi"
   git push
   ```
3. **Thường xuyên commit**: Commit nhỏ, thường xuyên tốt hơn commit lớn

## Liên hệ

Nếu cần hỗ trợ:
- Email: huynhnhathunghhcl@gmail.com
- Số điện thoại: 0786985687
