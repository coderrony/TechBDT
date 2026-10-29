# 🛒 TechBDT - Modern E-Commerce & Dropshipping Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.0.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?style=for-the-badge&logo=mongodb)](https://mongoosejs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Auth.js](https://img.shields.io/badge/NextAuth.js-v5_Beta-purple?style=for-the-badge&logo=next.js)](https://authjs.dev/)

**TechBDT** (https://techbdt.com) is a high-performance, full-stack e-commerce and dropshipping web application tailored for the Bangladeshi market. Built with **Next.js 14 (App Router)**, **TypeScript**, **MongoDB/Mongoose**, and **Tailwind CSS**, it features localized payment processing, SMS OTP-based authentication, an intuitive multi-tab admin panel, bilingual (English & Bengali) content support, and Facebook Conversions API integration.

---

## 🌟 Key Features

### 🛍️ Customer Experience & Shopping
- **Dynamic Product Browsing**: Featured collections, trending carousels, category/sub-category navigation, and price/color/size filters.
- **Cursor-based Search & Filtering**: Fast querying across categories, sub-categories, sizes, color variants, and price ranges.
- **Bilingual Content**: Support for both English (`EN_content`) and Bengali (`BN_content`) product specifications.
- **Rich Product Detail Pages**: Image zoom & gallery slider (Glide.js & Swiper), interactive variant selectors, reviews, stock status, and related products.
- **Cart & Order Flow**: Real-time cart calculations, localized shipping charge calculation (Dhaka City Corporation vs Outside Dhaka via Pathao Courier), and discount code application.
- **Dark & Light Mode**: Built-in responsive theme switching.

### 🔐 Authentication & Security
- **Multi-Provider Authentication**: Powered by **NextAuth.js (Auth.js v5)**.
  - **Phone + Password Login** with `bcrypt` password hashing.
  - **SMS OTP Verification**: Automated OTP sending via **BulkSMSBD API** for new user registration and forgot password recovery.
  - **OAuth 2.0**: One-click social sign-in with **Google** and **Facebook**.
- **Role-Based Access Control (RBAC)**: Next.js middleware guards protected customer routes and restricts `/dashboard/*` access strictly to admin users.

### 💳 Payment & Checkout Localization
- **UddoktaPay Gateway Integration**: Seamless checkout supporting Bangladeshi payment methods (bKash, Nagad, Rocket, Upay, Visa, Mastercard).
- **Flexible Payment Modes**:
  - Full online payment.
  - **Cash on Delivery (COD)** with customizable partial advance payment (e.g., ৳200 or ৳500 for orders > ৳3000) to minimize order cancellation risk.
- **Automated Verification**: Real-time payment verification and instant invoice generation.

### 📊 Marketing, Tracking & Cloud Services
- **Facebook Conversions API (CAPI)**: Server-side event tracking (`Purchase`, `AddToCart`, `ViewContent`) with SHA-256 hashed customer parameters for reliable attribution.
- **Facebook Pixel**: Client-side tracking integration.
- **Cloudinary Asset Management**: Automatic optimization and CDN hosting for product thumbnails, image galleries, and user profile avatars.

### 🛠️ Admin Dashboard (`/dashboard`)
- **Product Management**: Create, edit, and preview products with multi-image Cloudinary upload, variants, dropshop attribution, stock, and SEO slug generation.
- **Category & Sub-category Management**: Create parent categories and link dynamic sub-categories.
- **Order Management**: Real-time order monitoring with search (by Phone, Order ID, or Status: `PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED`), status updates, customer shipping details editing, and invoice printing.
- **Dropshop Management**: Connect products to dropship suppliers with automated product counts.

---

## 🏗️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Server Actions, Route Handlers) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Database** | [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), SCSS, PostCSS |
| **UI Components** | Headless UI, Heroicons, Line Awesome |
| **Animation & Sliders** | Framer Motion, Glide.js, Swiper |
| **Authentication** | NextAuth.js (Auth.js v5 beta), bcryptjs |
| **State & Data Fetching** | TanStack React Query v5, React Hook Form |
| **Cloud Storage** | [Cloudinary](https://cloudinary.com/) (v2) |
| **Payment Gateway** | [UddoktaPay](https://uddoktapay.com/) API |
| **SMS Gateway** | [BulkSMSBD](https://bulksmsbd.net/) API |
| **Tracking** | Facebook Pixel & Facebook Conversions API (CAPI) |

---

## 📁 Project Structure

```text
├── public/                 # Static assets and icons
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (main)/         # Public & customer store routes
│   │   │   ├── (accounts)/ # User profile, orders, password management
│   │   │   ├── cart/       # Cart, shipping selection, and checkout
│   │   │   ├── product-detail/ # Dynamic product pages ([slug])
│   │   │   ├── search/     # Search and filter catalog
│   │   │   ├── login/      # Sign-in page
│   │   │   ├── signup/     # Registration with OTP verification
│   │   │   └── forgot-pass/# Password recovery
│   │   ├── api/            # Backend API Route Handlers
│   │   │   ├── add-to-cart/       # Cart operations
│   │   │   ├── auth/              # NextAuth route handlers
│   │   │   ├── category-api/      # Category management
│   │   │   ├── drop-shop-api/     # Dropshipping sources
│   │   │   ├── fb-capi/           # Facebook Conversions API
│   │   │   ├── get-payment-url/   # UddoktaPay checkout creation
│   │   │   ├── order-api/         # Order queries & payment verification
│   │   │   ├── otp-send/          # BulkSMSBD OTP trigger
│   │   │   ├── product/           # Product CRUD & search
│   │   │   └── subCategory-api/   # Subcategory endpoints
│   │   └── dashboard/      # Admin Panel
│   │       ├── category/   # Category & subcategory administration
│   │       ├── orders/     # Order tracking & fulfillment
│   │       ├── products/   # Product creation & catalog preview
│   │       └── users/      # Customer management
│   ├── components/         # Reusable UI components
│   ├── data/               # Constants, navigation data, and demo settings
│   ├── hooks/              # Custom React hooks (useCart, useAuthData, useOrder, etc.)
│   ├── lib/                # Database serializers and route definitions
│   ├── model/              # Mongoose Data Schemas (User, Product, Order, Category, etc.)
│   ├── provider/           # Context providers (NextAuth, React Query, AuthProvider)
│   ├── queries/            # Server-side DB queries (Mongoose aggregations)
│   ├── services/           # External service clients (MongoDB, Cloudinary, BulkSMSBD)
│   ├── shared/             # Atomic UI elements (Buttons, Inputs, Badges, Modals)
│   ├── styles/             # Global styles and SCSS theme files
│   ├── types/              # TypeScript interfaces and type definitions
│   ├── utils/              # Helper utilities (formatting, price calculation, events)
│   ├── auth.ts             # NextAuth configuration and providers
│   └── middleware.ts       # Route protection and role verification
├── .env.example            # Sample environment variables
├── next.config.js          # Next.js configuration (images, domains)
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies & scripts
```

---

## ⚙️ Environment Variables Setup

Create a `.env.local` file in the root directory and add the following variables:

```env
# ----------------------------------------
# Application Settings
# ----------------------------------------
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ----------------------------------------
# Database (MongoDB)
# ----------------------------------------
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority

# ----------------------------------------
# NextAuth / Auth.js
# ----------------------------------------
AUTH_SECRET=your_nextauth_secret_key_here
AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
AUTH_FACEBOOK_ID=your_facebook_app_id
AUTH_FACEBOOK_SECRET=your_facebook_app_secret

# ----------------------------------------
# SMS Gateway (BulkSMSBD)
# ----------------------------------------
BULKSMSBD_API_KEY=your_bulksmsbd_api_key
BULKSMSBD_SENDER_ID=your_bulksmsbd_sender_id

# ----------------------------------------
# Payment Gateway (UddoktaPay)
# ----------------------------------------
UDDOKTAPAY_BASE_URL=https://sandbox.uddoktapay.com/api # Use live URL in production
UDDOKTAPAY_API_KEY=your_uddoktapay_api_key

# ----------------------------------------
# Cloud Storage (Cloudinary)
# ----------------------------------------
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# ----------------------------------------
# Facebook Marketing & Analytics
# ----------------------------------------
FB_PIXEL_ID=your_facebook_pixel_id
FB_ACCESS_TOKEN=your_facebook_conversions_api_access_token
```

> [!IMPORTANT]
> **BulkSMSBD IP Whitelisting**: Ensure your server's outbound public IP address is whitelisted in your **BulkSMSBD account settings**. If not whitelisted, SMS OTP messages will not be delivered to users.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm** / **yarn** / **pnpm**
- **MongoDB**: A running MongoDB instance (or MongoDB Atlas cluster URI)
- Cloudinary, BulkSMSBD, and UddoktaPay developer accounts

### 2. Clone the Repository
```bash
git clone https://github.com/coderrony/TechBDT.git
cd TechBDT
```

### 3. Install Dependencies
```bash
npm install
# or
yarn install
```

### 4. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

### 5. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

### 6. Build for Production
```bash
npm run build
npm run start
```

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/otp-send` | Generates and sends a 4-digit SMS OTP for registration or password reset |
| `POST` | `/api/user-auth` | User account registration and profile updates |
| `GET`, `PATCH`, `DELETE` | `/api/user-auth` | Fetch user info, update shipping address, or remove saved address |
| `GET`, `POST` | `/api/add-to-cart` | Fetch user cart items or synchronize cart updates |
| `GET` | `/api/product/search-product` | Query products with cursor pagination, categories, price range, and attributes |
| `GET` | `/api/product/trending-product` | Fetch random trending products via aggregation pipeline |
| `POST` | `/api/product/create-product` | Admin: Upload images to Cloudinary and create a new product |
| `GET`, `POST` | `/api/category-api` | Fetch populated categories or create a new category (Admin) |
| `GET` | `/api/drop-shop-api` | Retrieve list of registered dropship sources |
| `POST` | `/api/get-payment-url` | Generate an UddoktaPay hosted checkout session |
| `GET`, `POST` | `/api/order-api/user-order` | Fetch customer orders or verify payment status on return from gateway |
| `GET`, `PATCH` | `/api/order-api/admin-access-order` | Admin: Paginated order inspection, search by phone/id, status updates |
| `POST` | `/api/fb-capi` | Transmit server-side conversion events to Facebook Graph API |

---

## 🛡️ Role-Based Access & Admin Roles

The platform supports 3 user roles:
- **`customer`**: Standard shoppers who can browse, purchase, manage addresses, and view order history.
- **`seller`**: Prepared for multi-vendor dropshipping extension.
- **`admin`**: Full access to the `/dashboard` route to manage products, categories, orders, and fulfillment.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Developed with ❤️ by [Coder Rony](https://github.com/coderrony)
