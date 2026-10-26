# 🛟 RescueLink — Full-Stack Disaster Relief Coordination Platform

**RescueLink** is a comprehensive disaster relief coordination platform designed to bridge the gap between volunteers, organizations, and emergency response missions in real-time.

This monorepo-style workspace contains both the client frontend and server backend:
- 📱 [**rescuelink-client**](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-client) — Next.js 15 (App Router), TypeScript, Tailwind CSS, Better Auth.
- ⚡ [**rescuelink-server**](file:///home/nilanjana/Web%20Development/RescueLink/rescuelink-server) — Node.js, Express.js, TypeScript, MongoDB & Mongoose, JWT Auth.

---

## 📚 Complete Project Documentation

For a detailed breakdown of system architecture, database models, API specs, and an **in-depth operational guide for all 17 pages**, see:

👉 [**Full System & Page Documentation (`DOCUMENTATION.md`)**](file:///home/nilanjana/Web%20Development/RescueLink/DOCUMENTATION.md)

---

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js**: v20.6.0 or higher
- **MongoDB**: Local instance or MongoDB Atlas cluster connection URI

### 2. Set Up the Server Backend
```bash
cd rescuelink-server
npm install
```
Create a `.env` file inside `rescuelink-server/`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/rescuelink
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:3000

# Optional: Groq AI & Adzuna API Keys for AI Mission Recommendations
GROQ_API_KEY=your_groq_api_key
ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_APP_KEY=your_adzuna_app_key
ADZUNA_COUNTRY=us
```
Seed initial data & start backend:
```bash
npm run seed
npm run dev
```
Backend API will run at `http://localhost:5000`.

### 3. Set Up the Client Frontend
```bash
cd ../rescuelink-client
npm install
```
Create a `.env.local` file inside `rescuelink-client/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
MONGO_URI=mongodb://localhost:27017/rescuelink
BETTER_AUTH_SECRET=your_super_secret_jwt_key
NEXT_PUBLIC_DEMO_USER_EMAIL=demo.user@rescuelink.org
NEXT_PUBLIC_DEMO_USER_PASSWORD=demo_password_123
NEXT_PUBLIC_DEMO_ADMIN_EMAIL=demo.admin@rescuelink.org
NEXT_PUBLIC_DEMO_ADMIN_PASSWORD=demo_password_123
```
Seed auth accounts & start dev server:
```bash
npm run seed:auth
npm run dev
```
Client app will run at `http://localhost:3000`.

---

## 📂 Repository Layout

```
RescueLink/
├── DOCUMENTATION.md           # Exhaustive System Architecture & Every Page Guide
├── README.md                  # Main Workspace Root README (this file)
├── rescuelink-client/         # Next.js 15 Frontend Application
│   ├── src/app/
│   │   ├── (public)/          # Public routes (Landing, Explore, Detail, Static, Resources)
│   │   ├── (protected)/       # Authenticated routes (Dashboard, Add, Manage, Profile)
│   │   └── api/               # API route handlers
│   ├── src/components/        # UI components, layout, missions, sections
│   ├── src/lib/               # API client, auth client, helper functions
│   └── src/types/             # Shared TypeScript declarations
└── rescuelink-server/         # Express.js Backend API
    ├── src/config/            # Database initialization
    ├── src/controllers/       # Controllers for missions, volunteers, stats, etc.
    ├── src/middleware/         # JWT verification, role-based auth, error handler
    ├── src/models/            # Mongoose data schemas
    └── src/routes/            # Express route declarations
```

---

## 📄 License
Built for educational and demonstration purposes as a full-stack TypeScript disaster relief coordination system.
