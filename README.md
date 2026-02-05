# TaMa Frontend (Task Manager UI)

TaMa Frontend is a modern task management user interface built using **Next.js**, designed to work with the TaMa Backend API. It provides authentication, task management, filtering, searching, and pagination features.

---

## 🚀 Features

- User Authentication (Register / Login / Logout)
- Task Creation, Update, Delete
- Toggle Task Status (Pending / Completed)
- Pagination Support
- Task Filtering by Status
- Task Search by Title
- Secure Cookie-Based Authentication
- Responsive UI

---

## 🛠 Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios / Fetch API
- JWT Authentication via Cookies

---

## 📦 Prerequisites

Make sure you have installed:

- Node.js (v18 or higher)
- npm / yarn / pnpm / bun
- TaMa Backend running locally or deployed

---

## 📥 Clone Repository

```bash
git clone <YOUR_FRONTEND_REPO_URL>
cd <YOUR_FRONTEND_FOLDER_NAME>
```

---

## 📦 Install Dependencies

```bash
npm install
```

---

## ⚙️ Environment Variables Setup

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

### 🔑 Variable Explanation

| Variable            | Description                  |
| ------------------- | ---------------------------- |
| NEXT_PUBLIC_API_URL | Base URL of TaMa Backend API |

⚠️ Make sure this URL matches the backend server URL.

---

## ▶️ Running Project Locally

Start the development server:

```bash
npm run dev
```

Or using other package managers:

```bash
yarn dev
pnpm dev
bun dev
```

---

## 🌐 Access Application

Open your browser and visit:

```
http://localhost:3000
```

---

## 🔐 Authentication Flow

1. User registers or logs in
2. Backend sends authentication cookies
3. Cookies are automatically sent with API requests
4. Protected routes require authentication

---

## ✅ Connected Backend Endpoints

### Authentication

- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/refresh`
- POST `/auth/logout`

---

### Task Management

- GET `/tasks`
- POST `/tasks`
- GET `/tasks/:id`
- PATCH `/tasks/:id`
- DELETE `/tasks/:id`
- PATCH `/tasks/:id/toggle`

---

## 🔎 Task List Capabilities

The task listing supports:

- Pagination (loading tasks in batches)
- Filtering by status (pending/completed)
- Searching by task title

---

## 🧪 Testing The Application

1. Start Backend Server
2. Start Frontend Server
3. Register a user
4. Login and manage tasks

---

## ❗ Troubleshooting

### Backend Not Connecting

- Verify backend is running
- Check `NEXT_PUBLIC_API_URL` value
- Ensure CORS is configured in backend

---

### Authentication Not Working

- Enable cookies in browser
- Check backend token configuration

---

### Port Conflict

- Change frontend port:

```bash
npm run dev -- -p 3001
```

---

## 👨‍💻 Author

Nikhil
