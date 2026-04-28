# Hướng Dẫn Deploy Lên Vercel

## Chuẩn bị

### 1. Cấu hình Cloudinary (BẮT BUỘC)

Vercel không hỗ trợ lưu file local, bạn **PHẢI** dùng Cloudinary:

1. Đăng nhập Vercel: https://vercel.com
2. Vào project của bạn
3. Settings → Environment Variables
4. Thêm các biến:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=266483242265736
CLOUDINARY_API_SECRET=your_api_secret
```

## Cách Deploy

### Cách 1: Deploy từ GitHub (Khuyến nghị)

1. **Push code lên GitHub:**
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push
```

2. **Import vào Vercel:**
   - Vào: https://vercel.com/new
   - Chọn repository: `hungmenvadong147/hung`
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build Command: `npm run vercel-build`
   - Output Directory: `client/dist`
   - Install Command: `npm install`

3. **Thêm Environment Variables:**
   - Settings → Environment Variables
   - Thêm Cloudinary credentials

4. **Deploy:**
   - Click "Deploy"
   - Đợi vài phút

### Cách 2: Deploy từ CLI

1. **Cài Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Thêm Environment Variables:**
```bash
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
```

5. **Deploy lại:**
```bash
vercel --prod
```

## Cấu trúc Deploy

```
├── api/                    # Serverless Functions
│   ├── index.js           # API backend
│   └── package.json       # API dependencies
├── client/                # Frontend
│   └── dist/             # Build output (sau khi build)
├── vercel.json           # Vercel configuration
└── package.json          # Root package.json
```

## Vercel Configuration

File `vercel.json` đã được cấu hình:

```json
{
  "version": 2,
  "buildCommand": "npm run vercel-build",
  "outputDirectory": "client/dist",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index.js"
    }
  ]
}
```

## Environment Variables Cần Thiết

| Biến | Mô tả | Bắt buộc |
|------|-------|----------|
| `CLOUDINARY_CLOUD_NAME` | Cloud name từ Cloudinary | ✅ Có |
| `CLOUDINARY_API_KEY` | API Key từ Cloudinary | ✅ Có |
| `CLOUDINARY_API_SECRET` | API Secret từ Cloudinary | ✅ Có |

## Lưu ý quan trọng

### 1. Dữ liệu không lưu trữ lâu dài

⚠️ **Serverless Functions trên Vercel không lưu trữ dữ liệu giữa các request.**

Mỗi lần restart, dữ liệu sẽ reset về mặc định. Để lưu trữ lâu dài, cần:
- MongoDB Atlas (miễn phí)
- PostgreSQL (Vercel Postgres)
- Firebase Firestore

### 2. Upload files

✅ **Phải dùng Cloudinary** - Vercel không hỗ trợ lưu file local

### 3. Cold Start

Lần đầu truy cập sau một thời gian không hoạt động có thể chậm (5-10s)

## Troubleshooting

### Lỗi: "Command exited with 127"

**Nguyên nhân:** Dependencies không được cài đặt

**Giải pháp:**
- Kiểm tra `vercel.json` có đúng config
- Build Command: `npm run vercel-build`
- Install Command: `npm install`

### Lỗi: "Module not found"

**Nguyên nhân:** Thiếu dependencies trong `api/package.json`

**Giải pháp:**
```bash
cd api
npm install express cors multer cloudinary
```

### Lỗi: Upload không hoạt động

**Nguyên nhân:** Chưa cấu hình Cloudinary

**Giải pháp:**
- Thêm Environment Variables trong Vercel
- Redeploy project

### Lỗi: API không hoạt động

**Kiểm tra:**
1. Vào: `https://your-domain.vercel.app/api/health`
2. Nếu lỗi 404: Kiểm tra `vercel.json` routing
3. Nếu lỗi 500: Kiểm tra logs trong Vercel Dashboard

## Xem Logs

1. Vào Vercel Dashboard
2. Chọn project
3. Deployments → Click vào deployment mới nhất
4. Xem logs để debug

## Custom Domain

1. Vào Settings → Domains
2. Thêm domain của bạn
3. Cấu hình DNS theo hướng dẫn

## Auto Deploy

Mỗi khi push code lên GitHub branch `main`, Vercel sẽ tự động deploy.

## Testing Local

Trước khi deploy, test local:

```bash
# Install dependencies
npm run install:all

# Build
npm run vercel-build

# Test API
cd api
node index.js

# Test Frontend
cd client
npm run preview
```

## Liên hệ

- Email: huynhnhathunghhcl@gmail.com
- Số điện thoại: 0786985687
- GitHub: https://github.com/hungmenvadong147/hung
