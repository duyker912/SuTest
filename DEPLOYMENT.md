# Hướng dẫn Deploy

## Backend (Railway)

### 1. Chuẩn bị
- Tạo tài khoản Railway tại [railway.app](https://railway.app)
- Kết nối GitHub repository

### 2. Deploy Backend
1. Tạo project mới trên Railway
2. Chọn "Deploy from GitHub repo"
3. Chọn repository và folder `backend`
4. Cấu hình environment variables:
   ```
   PORT=3001
   NODE_ENV=production
   DATABASE_URL=postgresql://username:password@host:port/database
   MSU_API_KEY=gw_afd6376e3134996c4bdcb48ec7561228b749f3c59225f631253f1b88f43d8bfef3d5071abb1649fc6632f37ce620d2b898f64c165dd43fc7d721275ae8ef887a
   MSU_API_BASE_URL=https://api.msu.io
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   RATE_LIMIT_WINDOW_MS=60000
   RATE_LIMIT_MAX_REQUESTS=100
   LOG_LEVEL=info
   ```
5. Railway sẽ tự động build và deploy

### 3. Cấu hình Database
1. Thêm PostgreSQL service trên Railway
2. Copy connection string vào `DATABASE_URL`
3. Database sẽ được tự động setup khi deploy (Prisma generate sẽ chạy tự động)

### 4. Troubleshooting Build Issues
Nếu gặp lỗi build:
- Kiểm tra `package-lock.json` có tồn tại
- Đảm bảo tất cả dependencies được cài đặt đúng
- Prisma client sẽ được generate tự động trong quá trình build

## Frontend (Netlify)

### 1. Chuẩn bị
- Tạo tài khoản Netlify tại [netlify.com](https://netlify.com)
- Kết nối GitHub repository

### 2. Deploy Frontend
1. Đăng nhập Netlify và chọn "New site from Git"
2. Chọn GitHub và repository của bạn
3. Cấu hình build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
4. Cấu hình environment variables trong Site settings > Environment variables:
   ```
   VITE_API_URL=https://your-backend-domain.railway.app/api
   VITE_NODE_ENV=production
   ```
5. Deploy

### 3. Cấu hình Custom Domain (tùy chọn)
- Vào Site settings > Domain management
- Thêm custom domain nếu có

## Cấu hình Domain

### 1. Backend (Railway)
- Railway cung cấp domain tự động: `your-app.railway.app`
- Có thể custom domain trong Railway dashboard

### 2. Frontend (Netlify)
- Netlify cung cấp domain tự động: `your-app.netlify.app`
- Có thể custom domain trong Netlify dashboard

## Kiểm tra Deploy

### 1. Backend Health Check
```bash
curl https://your-backend-domain.railway.app/health
```

### 2. Frontend
Truy cập: `https://your-frontend-domain.netlify.app`

## Troubleshooting

### Backend Issues
- Kiểm tra logs trên Railway dashboard
- Đảm bảo environment variables đã được set
- Kiểm tra database connection

### Frontend Issues
- Kiểm tra build logs trên Netlify
- Đảm bảo API URL đã được cấu hình đúng
- Kiểm tra network requests trong browser DevTools

## SSL/HTTPS
- Railway và Netlify đều tự động cung cấp SSL certificate
- Không cần cấu hình thêm

## Monitoring
- Railway: Built-in monitoring và logs
- Netlify: Built-in analytics và performance monitoring
