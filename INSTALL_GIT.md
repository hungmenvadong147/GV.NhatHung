# Hướng Dẫn Cài Đặt Git Cho Windows

## Bước 1: Tải Git

1. Mở trình duyệt và truy cập: **https://git-scm.com/download/win**
2. Tải sẽ tự động bắt đầu (file khoảng 50MB)
3. Hoặc click vào link: **"Click here to download manually"**

## Bước 2: Cài đặt Git

1. **Chạy file vừa tải** (Git-2.xx.x-64-bit.exe)

2. **Các bước cài đặt** (chọn mặc định là được):
   - Click **"Next"** liên tục
   - Tại màn hình **"Adjusting your PATH environment"**: 
     - Chọn **"Git from the command line and also from 3rd-party software"** (mặc định)
   - Tại màn hình **"Choosing the default editor"**:
     - Có thể chọn editor bất kỳ (mặc định là Vim)
   - Click **"Next"** cho đến khi **"Install"**
   - Đợi cài đặt hoàn tất
   - Click **"Finish"**

## Bước 3: Kiểm tra cài đặt

1. **Đóng tất cả cửa sổ PowerShell/Command Prompt đang mở**
2. **Mở lại PowerShell mới**
3. Chạy lệnh:

```powershell
git --version
```

Nếu thấy kết quả như: `git version 2.43.0.windows.1` → **Thành công!**

## Bước 4: Cấu hình Git lần đầu

Chạy các lệnh sau trong PowerShell:

```powershell
git config --global user.name "hungmenvadong147"
git config --global user.email "huynhnhathunghhcl@gmail.com"
```

Kiểm tra cấu hình:

```powershell
git config --list
```

## Bước 5: Push code lên GitHub

### Cách 1: Dùng file .bat (Đơn giản)

Double-click vào file: **`push-to-github.bat`**

### Cách 2: Dùng lệnh thủ công

Trong PowerShell, tại thư mục dự án:

```powershell
# Di chuyển đến thư mục dự án
cd "D:\Code wed"

# Khởi tạo Git
git init

# Add files
git add .

# Commit
git commit -m "first commit: Personal Learning Website"

# Đổi branch thành main
git branch -M main

# Thêm remote
git remote add origin https://github.com/hungmenvadong147/hung.git

# Push
git push -u origin main
```

## Xác thực GitHub

Khi push lần đầu, GitHub sẽ yêu cầu đăng nhập:

### Tạo Personal Access Token

1. Đăng nhập GitHub
2. Vào: https://github.com/settings/tokens
3. Click **"Generate new token"** → **"Generate new token (classic)"**
4. Điền:
   - **Note**: "Personal Learning Website"
   - **Expiration**: 90 days (hoặc No expiration)
   - **Select scopes**: Chọn **`repo`** (tất cả các ô trong repo)
5. Click **"Generate token"**
6. **Copy token ngay** (chỉ hiển thị 1 lần!)

### Sử dụng Token khi Push

Khi Git yêu cầu đăng nhập:
- **Username**: `hungmenvadong147`
- **Password**: `<paste_token_vừa_copy>`

## Troubleshooting

### Lỗi: "git is not recognized" sau khi cài

**Giải pháp:**
1. Đóng tất cả cửa sổ PowerShell
2. Mở PowerShell mới
3. Thử lại

Nếu vẫn lỗi:
1. Mở **System Properties** → **Environment Variables**
2. Kiểm tra **Path** có chứa: `C:\Program Files\Git\cmd`
3. Nếu không có, thêm vào
4. Restart máy

### Lỗi: "Permission denied" khi push

**Giải pháp:**
- Kiểm tra lại Personal Access Token
- Đảm bảo token có quyền `repo`
- Tạo token mới nếu cần

### Lỗi: "Updates were rejected"

**Giải pháp:**
```powershell
git pull origin main --rebase
git push origin main
```

Hoặc force push (nếu chắc chắn):
```powershell
git push -u origin main --force
```

## Video hướng dẫn

Nếu cần xem video:
- YouTube: Tìm "How to install Git on Windows"
- Hoặc: https://www.youtube.com/results?search_query=install+git+windows

## Liên hệ hỗ trợ

- Email: huynhnhathunghhcl@gmail.com
- Số điện thoại: 0786985687

## Sau khi cài đặt xong

1. ✅ Chạy `git --version` để kiểm tra
2. ✅ Cấu hình user name và email
3. ✅ Double-click `push-to-github.bat` để push code
4. ✅ Các lần sau dùng `update-github.bat`

---

**Lưu ý quan trọng:**
- Phải **đóng và mở lại PowerShell** sau khi cài Git
- Personal Access Token chỉ hiển thị 1 lần, hãy lưu lại
- Token dùng thay cho password khi push
