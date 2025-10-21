# Hướng dẫn Setup Dự án

## Yêu cầu hệ thống
- Node.js >= 18.0.0
- npm >= 8.0.0
- PostgreSQL >= 13.0.0

## Cài đặt

### 1. Clone repository
```bash
git clone <repository-url>
cd MapleStoryN
```

### 2. Cài đặt dependencies
```bash
npm run install:all
```

### 3. Cấu hình Backend

#### Tạo file environment
```bash
cd backend
cp env.example .env
```

#### Chỉnh sửa file `.env`:
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/maplestory_n_db"

# MSU API Configuration
MSU_API_KEY=gw_afd6376e3134996c4bdcb48ec7561228b749f3c59225f631253f1b88f43d8bfef3d5071abb1649fc6632f37ce620d2b898f64c165dd43fc7d721275ae8ef887a
MSU_API_BASE_URL=https://api.msu.io

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

#### Setup Database
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Open Prisma Studio
npm run db:studio
```

### 4. Cấu hình Frontend

#### Tạo file environment
```bash
cd frontend
cp env.example .env
```

#### Chỉnh sửa file `.env`:
```env
VITE_API_URL=http://localhost:3001/api
VITE_NODE_ENV=development
```

## Chạy dự án

### Development mode
```bash
# Từ thư mục gốc
npm run dev
```

Hoặc chạy riêng lẻ:
```bash
# Backend
cd backend
npm run dev

# Frontend (terminal mới)
cd frontend
npm run dev
```

### Production mode
```bash
# Build tất cả
npm run build

# Chạy backend
cd backend
npm start

# Chạy frontend (cần serve static files)
cd frontend
npm run preview
```

## Truy cập ứng dụng

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Backend Health: http://localhost:3001/health
- Prisma Studio: http://localhost:5555 (khi chạy `npm run db:studio`)

## API Endpoints

### Health Check
- `GET /health` - Kiểm tra trạng thái server

### MSU API
- `GET /api/msu/health` - Kiểm tra MSU API
- `GET /api/msu/servers` - Lấy danh sách server

### Characters
- `GET /api/msu/characters` - Lấy danh sách nhân vật
- `GET /api/msu/characters/search?q=query` - Tìm kiếm nhân vật
- `GET /api/msu/characters/:id` - Lấy thông tin nhân vật

### Guilds
- `GET /api/msu/guilds` - Lấy danh sách guild
- `GET /api/msu/guilds/search?q=query` - Tìm kiếm guild
- `GET /api/msu/guilds/:id` - Lấy thông tin guild

### Items
- `GET /api/msu/items` - Lấy danh sách vật phẩm
- `GET /api/msu/items/search?q=query` - Tìm kiếm vật phẩm
- `GET /api/msu/items/:id` - Lấy thông tin vật phẩm

## Scripts hữu ích

### Backend
```bash
npm run dev          # Chạy development server
npm run build        # Build production
npm run start        # Chạy production server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Mở Prisma Studio
```

### Frontend
```bash
npm run dev          # Chạy development server
npm run build        # Build production
npm run preview      # Preview production build
npm run lint         # Chạy ESLint
```

## Troubleshooting

### Backend Issues
1. **Database connection error**: Kiểm tra DATABASE_URL trong .env
2. **MSU API error**: Kiểm tra MSU_API_KEY và MSU_API_BASE_URL
3. **Port already in use**: Thay đổi PORT trong .env

### Frontend Issues
1. **API connection error**: Kiểm tra VITE_API_URL trong .env
2. **Build error**: Chạy `npm install` lại
3. **TypeScript error**: Kiểm tra tsconfig.json

### Common Solutions
```bash
# Clear node_modules và reinstall
rm -rf node_modules package-lock.json
npm install

# Reset database
npx prisma db push --force-reset

# Clear cache
npm run build -- --force
```

## Cấu trúc dự án

```
MapleStoryN/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Utility functions
│   ├── prisma/              # Database schema
│   └── package.json
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── main.tsx         # App entry point
│   └── package.json
├── package.json             # Root package.json
└── README.md
```
