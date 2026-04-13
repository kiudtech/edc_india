# EDC India Platform

Full-stack platform for EDC India, built for startup ecosystem operations: public website, startup/fellowship/validation application flows, Razorpay payments, Google sign-in, admin management, college ranking, anonymous student rating, and FAQ system.

## What Has Been Built

### Public Website
- Premium multi-section homepage (hero, about, programs, plans, courses, partners, institutional presence, startup showcase, ranking, impact, testimonials, contact, FAQ preview).
- Dedicated pages: About, Fellowship, Ranking, Membership Validation, Startup Membership, Terms, FAQ, Not Found.
- Strong responsive UI using Tailwind + Framer Motion + Swiper.
- Active-route navbar highlighting with persistent blue underline.

### Application Flows
- Startup membership application flow.
- Fellowship application flow.
- Idea validation application flow.
- Dynamic plan resolution from backend with frontend-safe fallbacks.

### Authentication & Access
- JWT-based authentication.
- Google sign-in integration on frontend and backend verification.
- Protected user dashboard route.
- Admin route and admin login UI.
- Auto admin bootstrap on backend startup.

### Payments (Razorpay)
- Razorpay order creation and signature verification for:
	- Startup membership
	- Fellowship
	- Idea validation
- Transaction logging in database.
- Membership activation after successful verification.
- Payment success screen with transaction details.

### User Dashboard
- Profile view.
- Events, grants, funding, investor updates, notifications.
- Course listing and course-interest requests.
- Support ticket creation and tracking.
- Payment history.

### Admin Dashboard
- Analytics and revenue snapshot.
- User/member management.
- Payment and ticket management.
- Contact/form queries management.
- CRUD for events, grants, plans, courses, notifications.
- College ranking applications and fellowship applications management.
- College rating moderation + settings for live ranking snapshot visibility.

### Ranking & Rating System
- Public ranking information page.
- College ranking application API.
- Searchable college list API for autocomplete.
- Anonymous college rating submission (1-5).
- Public rating leaderboard endpoint.
- Admin rating summary and moderation endpoints.

### FAQ System
- Homepage FAQ preview (4 random FAQs from full pool).
- Dedicated FAQ page with categorized accordion UI.
- Shared FAQ data source for consistency.

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Swiper
- Lucide React
- Google OAuth React SDK

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Google Auth Library
- Razorpay SDK
- bcryptjs
- CORS + dotenv

## Project Structure

```text
.
|-- src/
|   |-- App.jsx
|   |-- context/AuthContext.jsx
|   |-- components/
|   |-- pages/
|   |   |-- LoginPage.jsx
|   |   |-- AdminLoginPage.jsx
|   |   |-- DashboardPage.jsx
|   |   |-- AdminDashboardPage.jsx
|   |   |-- StartupApplicationPage.jsx
|   |   |-- FellowshipApplicationPage.jsx
|   |   |-- MembershipValidationPage.jsx
|   |   |-- RankingPage.jsx
|   |   |-- FAQPage.jsx
|   |-- data/faqs.js
|
|-- server/
|   |-- index.js
|   |-- config/
|   |   |-- db.js
|   |   |-- ensureAdmin.js
|   |   |-- ensureDefaultPlans.js
|   |-- middleware/auth.js
|   |-- models/
|   |-- routes/
|   |   |-- auth.js
|   |   |-- payment.js
|   |   |-- validation.js
|   |   |-- user.js
|   |   |-- admin.js
|   |   |-- college.js
|   |   |-- plan.js
```

## Environment Variables

### Backend (.env inside server/)

Required:
- MONGO_URI
- JWT_SECRET

Recommended/Feature-specific:
- PORT (default: 5000)
- NODE_ENV
- FRONTEND_URL (comma-separated origins for production CORS)
- GOOGLE_CLIENT_IDS or GOOGLE_CLIENT_ID
- RAZORPAY_KEY_ID
- RAZORPAY_KEY_SECRET
- ADMIN_EMAIL
- ADMIN_PASSWORD
- ADMIN_PHONE

### Frontend (.env in project root)

- VITE_API_URL (optional in local dev; leave empty to use Vite proxy /api -> localhost:5000)
- VITE_GOOGLE_CLIENT_ID (required for Google sign-in button)

## Local Development

### 1) Install dependencies

From project root:

```bash
npm install
```

From server folder:

```bash
cd server
npm install
```

### 2) Start backend

```bash
cd server
npm run dev
```

### 3) Start frontend

In another terminal, from project root:

```bash
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

## Available Scripts

### Root
- npm run dev -> Run Vite dev server
- npm run build -> Build frontend
- npm run preview -> Preview frontend build
- npm run lint -> Run ESLint

### Server
- npm run dev -> Run backend with watch mode
- npm start -> Run backend
- npm run seed -> Run seed script

## API Overview

Base URL: /api

- /auth -> join, login, google-login, google-profile
- /payment -> Razorpay create-order, verify (membership/fellowship)
- /validation -> idea validation submit, create-order, verify-payment
- /user -> profile, dashboard resources, tickets, course-interest, payments
- /admin -> analytics, users, payments, tickets, events, grants, plans, validations, colleges, ratings, ranking apps, fellowship apps, queries, courses, notifications
- /college -> searchable list, ranking apply, ratings submit, public rating ranking, rankings
- /plans -> active plan listing

## Razorpay Integration Notes

- Membership/Fellowship payment flow:
	- POST /api/payment/create-order
	- POST /api/payment/verify

- Idea Validation payment flow:
	- POST /api/validation/create-order
	- POST /api/validation/verify-payment

- Signature verification is performed server-side using HMAC with RAZORPAY_KEY_SECRET.

## Google Sign-In Notes

- Frontend uses @react-oauth/google.
- Backend verifies tokens with google-auth-library against configured audience(s).
- VITE_GOOGLE_CLIENT_ID must be present for Google button rendering.

## Deployment Notes

- Frontend uses SPA rewrites via vercel.json.
- In production, set VITE_API_URL to backend URL.
- Set FRONTEND_URL on backend to allow production origin(s).
- Ensure all payment and auth env variables are configured in deployment environment.

## Current Status

This repository contains both product website and operational platform modules in one codebase, including:
- Public marketing + information site
- Membership/application/payment onboarding flows
- User portal
- Admin operations portal
- Ranking and rating system
- FAQ experience (homepage preview + full FAQ page)
