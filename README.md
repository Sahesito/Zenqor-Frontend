# ZENQOR — Sales Intelligence Platform

A modern full-stack sales platform built with Next.js 15 that allows businesses to manage products, track sales, and provide customers with a premium shopping experience.

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Key Features

### 🔐 Authentication & Security
- JWT-based authentication with role management
- Role-based access control (ADMIN / USER)
- Protected routes with auth guards
- Secure session handling via localStorage
- Form validation with Zod schemas

### 🛍️ Customer Store
- Premium product catalog with search and filters
- Category-based navigation
- Persistent shopping cart (Zustand + localStorage)
- Multi-step checkout with payment method selection
- Order history and tracking

### 📊 Admin Dashboard
- Real-time sales metrics and analytics
- Revenue overview with interactive charts
- Product management with full CRUD
- Order management with status updates
- Customer management with activity tracking

### 🎨 Design System
- Dark premium theme inspired by Stripe & Linear
- Gold accent color palette (#C89B5A)
- Framer Motion animations throughout
- Fully responsive design
- Skeleton loaders and empty states

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5 (strict mode)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui + Radix UI
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Data Fetching:** TanStack Query v5
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Charts:** Recharts
- **Icons:** Lucide React
- **Fonts:** Geist Sans + Geist Mono

## 🚀 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/zenqor.git
cd zenqor/apps/web
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 4️⃣ Run in development

```bash
npm run dev
```

Open in your browser: 👉 [http://localhost:3000](http://localhost:3000)

## 📷 Screenshots
<img width="1920" height="953" alt="4" src="https://github.com/user-attachments/assets/97b8dc0a-78df-44d2-9fc3-2dc1f4c31049" />
<img width="1920" height="953" alt="3" src="https://github.com/user-attachments/assets/4bdd6121-1e84-40b6-a6fc-4b2c4bc83945" />
<img width="1920" height="953" alt="2" src="https://github.com/user-attachments/assets/3556b8d7-80c2-463c-90f3-1fe06a089955" />
<img width="1920" height="948" alt="1" src="https://github.com/user-attachments/assets/1974f361-4d46-4140-a891-187051eda8cf" />
<img width="1920" height="952" alt="9" src="https://github.com/user-attachments/assets/fd5ecfcc-fce1-44f5-a277-7f9c7d809a06" />
<img width="1920" height="948" alt="8" src="https://github.com/user-attachments/assets/7b520dfe-ada5-4654-b772-057333dbd48c" />
<img width="1920" height="949" alt="7" src="https://github.com/user-attachments/assets/1079b3c4-c81b-477f-a407-f6433ac80111" />
<img width="1920" height="953" alt="6" src="https://github.com/user-attachments/assets/07039d29-7535-4b3e-9d1f-cb700537e3bc" />
<img width="1920" height="951" alt="5" src="https://github.com/user-attachments/assets/7cf42582-2efd-4a7c-8ef3-82468eed0682" />
