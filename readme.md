# 🛒 EasyShopping

[Visit EasyShopping 🚀](https://shopping-site-by-rwt.vercel.app/)


A responsive shopping website built with **React.js (Vite)** using the **Fake Store API**. This project is created as part of a frontend internship assignment.

## 🔧 Tech Stack

- React.js (Vite)
- React Router v6+
- React Hooks
- Context API (for cart state management)
- Plain CSS (Mobile-first responsive design)
- Fake Store API

## ✨ Features

### 🔐 Login Page
- Form with username & password
- Authenticated using Fake Store API’s `/auth/login` endpoint
- JWT token stored in `localStorage`
- Redirects to product listing on success

### 🛍️ Product Listing Page (Home)
- Fetches and displays all products using `/products`
- Filter by category using `/products/category/:category`
- (Optional) Includes a search bar
- Responsive grid layout

### 📦 Product Detail Page
- Full product information: image, title, description, price
- “Add to Cart” button functionality

### 🛒 Cart Page
- View added products
- Update quantity or remove items
- Total price displayed
- Checkout button with:
  - Cart clearing
  - Success message popup that disappears after 4 seconds

### 📌 Header / Navigation
- Navigation links: Home | Cart | Logout
- Display cart item count in header
- Logout clears JWT and redirects to login

## 🔗 API Used

- [Fake Store API](https://fakestoreapi.com/docs)

## 📁 Project Setup

```bash
# Clone the repo
git clone https://github.com/Amandeep-rawat/Shopping-website-Task-Assignment.git

# Navigate into the project directory
cd Shopping-website-Task-Assignment

# Install dependencies
npm install

#if any dependency error occcurs then use this command
npm install --lagacy-peer-deps

# Run the development server
npm run dev
