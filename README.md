# MapleStory N API Project

Dự án khai thác API của game MapleStory N từ MSU (MapleStory Universe).

## Công nghệ sử dụng

### Backend
- **Node.js** + **TypeScript**
- **PostgreSQL** (Database)
- **Prisma** (ORM)
- **Express.js** (Web framework)
- **Railway** (Deployment)

### Frontend
- **React.js** + **TypeScript**
- **TailwindCSS** (Styling)
- **Vercel** (Deployment)

## Cấu trúc dự án

```
MapleStoryN/
├── backend/          # Backend API server
├── frontend/         # React frontend app
├── package.json      # Root package.json
└── README.md
```

## API Key

API Key từ nhà cung cấp MSU:
```
gw_afd6376e3134996c4bdcb48ec7561228b749f3c59225f631253f1b88f43d8bfef3d5071abb1649fc6632f37ce620d2b898f64c165dd43fc7d721275ae8ef887a
```

## Tài liệu API

Tham khảo: https://msu.io/builder/docs

## Giới hạn API

- Tối đa 10 requests/giây
- Tối đa 30,000 requests/ngày

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd MapleStoryN
```

2. Cài đặt dependencies:
```bash
npm run install:all
```

3. Cấu hình environment variables:
```bash
# Backend
cd backend
cp .env.example .env
# Chỉnh sửa .env với thông tin database và API key

# Frontend
cd ../frontend
cp .env.example .env
# Chỉnh sửa .env với API endpoint
```

4. Chạy development:
```bash
npm run dev
```

## Deployment

### Backend (Railway)
1. Tạo project trên Railway
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Frontend (Vercel)
1. Tạo project trên Vercel
2. Connect GitHub repository
3. Set environment variables
4. Deploy

## License

MIT
