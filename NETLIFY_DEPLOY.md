# Hướng dẫn Deploy Frontend lên Netlify

## 🚀 Cách 1: Deploy từ GitHub (Khuyến nghị)

### Bước 1: Chuẩn bị
1. Đăng nhập [Netlify](https://netlify.com)
2. Đảm bảo code đã được push lên GitHub

### Bước 2: Tạo Site mới
1. Trên Netlify dashboard, click **"New site from Git"**
2. Chọn **GitHub** làm provider
3. Chọn repository `SuTest` của bạn
4. Cấu hình build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

### Bước 3: Cấu hình Environment Variables
1. Vào **Site settings** > **Environment variables**
2. Thêm các biến:
   ```
   VITE_API_URL=https://maplestory-n-backend-production.up.railway.app/api
   VITE_NODE_ENV=production
   ```

### Bước 4: Deploy
1. Click **"Deploy site"**
2. Netlify sẽ tự động build và deploy
3. Bạn sẽ nhận được URL như: `https://spectacular-vibrancy-123456.netlify.app`

---

## 🚀 Cách 2: Deploy thủ công (Nhanh)

### Bước 1: Build local
```bash
cd frontend
npm install
npm run build
```

### Bước 2: Deploy
1. Vào [Netlify](https://netlify.com)
2. Kéo thả folder `frontend/dist` vào vùng **"Want to deploy a new site without connecting to Git?"**
3. Site sẽ được deploy ngay lập tức

---

## 🔧 Cấu hình Custom Domain (Tùy chọn)

### Bước 1: Thêm Domain
1. Vào **Site settings** > **Domain management**
2. Click **"Add custom domain"**
3. Nhập domain của bạn (ví dụ: `maplestory-api.yourdomain.com`)

### Bước 2: Cấu hình DNS
- Thêm CNAME record trỏ đến `your-site.netlify.app`

---

## ✅ Kiểm tra Deploy

### 1. Health Check
- Truy cập: `https://your-site.netlify.app`
- Kiểm tra console không có lỗi

### 2. API Connection
- Mở Developer Tools > Network
- Kiểm tra API calls đến Railway backend

### 3. Test Features
- Thử tìm kiếm nhân vật
- Thử tìm kiếm guild
- Thử tìm kiếm items

---

## 🛠️ Troubleshooting

### Lỗi Build
- Kiểm tra **Deploy logs** trên Netlify
- Đảm bảo `VITE_API_URL` đã được set đúng
- Kiểm tra Node.js version (cần >= 18)

### Lỗi API Connection
- Kiểm tra Railway backend có hoạt động không
- Kiểm tra CORS settings trong backend
- Kiểm tra `VITE_API_URL` trong Environment variables

### Lỗi 404
- Đảm bảo file `netlify.toml` có redirect rules
- Kiểm tra **Publish directory** là `frontend/dist`

---

## 📱 Mobile Testing
- Test trên mobile browser
- Kiểm tra responsive design
- Test touch interactions

---

## 🎉 Hoàn thành!

Sau khi deploy thành công:
1. **Backend**: `https://maplestory-n-backend-production.up.railway.app`
2. **Frontend**: `https://your-site.netlify.app`
3. **Database**: PostgreSQL trên Railway

Dự án MapleStory N API đã sẵn sàng sử dụng! 🚀
