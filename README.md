💰 Finance Dashboard UI

A clean and interactive finance dashboard built using Next.js (App Router) and Tailwind CSS to help users track income, expenses, and spending patterns.

🚀 Objective

This project is designed to demonstrate frontend development skills including:

Component-based architecture
State management using Context API
Data handling and UI interactions
Clean and responsive UI design
✨ Features
📊 Dashboard Overview
Summary Cards (Total Balance, Income, Expenses)
Time-based chart (Balance trend)
Category-based insights (Spending breakdown)
📋 Transactions Section
View all transactions with:
Date
Amount
Category
Type (Income/Expense)
Features:
🔍 Search transactions
🎯 Filter (Income / Expense)
🔃 Sort (Amount / Date)
🗑️ Delete transaction (Admin only)
👤 Role-Based UI
Viewer
Can only view data
Admin
Can add and delete transactions

👉 Role can be switched using dropdown in navbar

📈 Insights Section
Highest spending category
Basic spending analysis
Simple financial observations
💾 Data Persistence
Transactions are stored in localStorage
Data remains even after refresh
🛠 Tech Stack
Next.js 14 (App Router)
React
Tailwind CSS
Recharts (for charts)
Context API (state management)
UUID (unique IDs)
Lucide React (icons)
📦 Installation
# Create project
npx create-next-app@latest finance-dashboard

cd finance-dashboard

# Install dependencies
npm install recharts uuid lucide-react

# Run project
npm run dev

👉 Open: http://localhost:3000

🧠 Project Structure
src/
├── app/
├── components/
├── context/
├── data/
├── ui/
🧩 How It Works
1. Dashboard

Displays summary cards and charts using transaction data.

2. Transactions
Data is stored in global state (Context API)
Filter and search applied dynamically
3. Role Switching
UI behavior changes based on selected role
Admin gets additional controls
4. Insights
Calculates highest spending category from data
📱 Responsiveness
Fully responsive design
Works on mobile, tablet, and desktop
Flexible layout using Tailwind
🎯 Evaluation Coverage

This project satisfies all assignment requirements:

✔ Clean UI and layout
✔ Functional dashboard with charts
✔ Transactions with filtering/search
✔ Role-based UI behavior
✔ Insights section
✔ Proper state management
✔ Responsive design
✔ Organized code structure