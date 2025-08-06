# 🏦 Lendsqr Frontend Engineering Assessment

### 👨🏽‍💻 Candidate: Kola-Kareem Oladipupo Tobiloba  
**Live Site:** (https://tobi-kolakareem-lendsqr-frontend-te-delta.vercel.app/) 
**GitHub Repo:**[ https://github.com/tobi35w/TobiKolakareemLendsqrFrontendTest/](https://github.com/tobi35w/TobiKolakareemLendsqrFrontendTest)]

## ✨ Overview

This project was built as part of the **Lendsqr Frontend Engineering Assessment**. The goal was to replicate a subset of the Lendsqr Admin Console, based on a detailed Figma design.

The solution includes:
- A login screen
- A fully responsive dashboard
- A user's list table (with filtering and search)
- A user details view with structured information

All features were implemented using **React**, **TypeScript**, **SCSS**, and a mock API with 500 users.



## 🛠️ Tech Stack

| Category        | Tech Used                          |
|----------------|------------------------------------|
| Language        | TypeScript                         |
| Framework       | React (via Vite)                   |
| Styling         | SCSS (modular + BEM structure)     |
| Routing         | React Router DOM                   |
| API Mocking     | JSON Generator / Local `users.json` |
| State Handling  | useState, useEffect + localStorage |
| Deployment      | Vercel (Free Tier)                 |



## 📦 Pages Implemented

### 1. 🔐 Login Page
- Pulls from a mock user API with email/password
- Shows errors if credentials are incorrect
- Stores logged-in user in `localStorage`

### 2. 📊 Dashboard
- Displays user statistics with cards
- Clean layout and sidebar navigation
- Fully responsive design

### 3. 📁 Users Page
- Lists all users from a mock 500-user API
- Implements real-time search by name
- Includes filter UI component (like in the Figma)
- Status badges styled dynamically based on user status

### 4. 👤 User Details Page
- Shows detailed information about the selected user
- Tabs for personal, education, socials, guarantor info
- Data pulled from `localStorage` (or fallback JSON)
- Responsive and clean card-based layout



## 🧠 Project Decisions & Reasoning

- I chose **Vite + React + TypeScript** for fast development and type safety.
- All styles were written using **SCSS** to maintain modularity and follow best practices (BEM naming).
- Folder structure was created with scalability in mind — separating `components`, `pages`, `styles`, and `assets`.
- The filter dropdowns and icons were implemented to match the **pixel-perfect design** in Figma.
- I manually wrote the logic for search and filtering to avoid third-party libraries, as requested.



## 🔍 Pixel-Perfect Match with Figma

Every screen and component was matched against the provided [Figma design](https://www.figma.com/design/ZKILoCoIoy1IESdBpq3GNC/Lendsqr-Frontend-Engineering-Assessment?node-id=5530-0), paying close attention to:
- Typography
- Colors
- Layout spacing
- Icon usage
- Hover/focus states

Where minor inconsistencies occurred due to missing font files or non-exportable assets, I matched them as closely as possible using available web-safe fonts and styling approximations.



## 🧪 Testing & Error Handling

- Login includes error handling for invalid credentials and network errors.
- All mock data is typed correctly using TypeScript.
- Empty search results are handled gracefully.
- LocalStorage is validated before rendering sensitive views.



## 💡 Improvements & Extensions (If Given More Time)

- Add unit tests using `Jest` and `React Testing Library`
- Create reusable `Input`, `Button`, and `Modal` components
- Use a global state manager like `Zustand` or `Redux`
- Add animations using `Framer Motion`
- Integrate real API endpoints and secure auth (e.g., JWT)




## 📨 Final Submission Notes

I’ve followed all the instructions provided for the assessment, including:
- Deployment to Vercel using the proper naming convention
- A public GitHub repository named `lendsqr-fe-test`
- Pixel-perfect UI based on Figma
- Clean commit history and structured codebase
- A clear documentation + Loom video

> Thank you for the opportunity to take this assessment. It was a great experience building a real-world admin interface and applying best frontend practices. I look forward to the next stage!



