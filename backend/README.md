# TreXplore Backend (Express + MySQL)

This backend provides REST APIs for authentication, places, blogs, profile, password updates, and favorites.

## 1) Prerequisites

- Node.js 18+
- MySQL Server 8+
- MySQL Workbench

## 2) MySQL Workbench Setup

Use this connection:

- Host: `localhost`
- Port: `3306`
- Username: `root`
- Password: `12345678`

Then run SQL in this order:

1. `backend/database/schema.sql`
2. `backend/database/seed.sql`

This creates database `trexplore_db` and seeds sample users, places, blogs, and favorites.

## 3) Backend Environment

A working environment file should be in `backend/.env`.

If needed, copy from `.env.example` and keep values aligned with your MySQL setup.

## 4) Install and Run

```bash
cd backend
npm install
npm run dev
```

API base URL:

- `http://localhost:5000/api`

Health check:

- `GET /api/health`

Frontend dev servers that work out of the box:

- `http://127.0.0.1:5500`
- `http://localhost:5500`

## 5) Demo Seed User

You can test login with:

- Email: `krish@gmail.com`
- Password: `password123`

## 6) API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Places

- `GET /api/places`
- `GET /api/places/:id`
- `GET /api/places/:id/blogs`
- `POST /api/places/:id/blogs` (Bearer token required)

### Profile (Bearer token required)

- `GET /api/profile/me`
- `PUT /api/profile/me`
- `PUT /api/profile/password`
- `GET /api/profile/blogs`
- `GET /api/profile/favorites`
- `POST /api/profile/favorites/:placeId`
- `DELETE /api/profile/favorites/:placeId`

## 7) Notes

- JWT auth is required for protected routes.
- CORS origin is configurable using `CORS_ORIGIN` in `.env`.
- Frontend integration can now replace static `data.js` reads with API fetch calls.
