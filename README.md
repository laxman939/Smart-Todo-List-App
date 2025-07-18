# 📋 Smart Todo List App

A sleek, modern Smart Todo List app built with React and Tailwind CSS. This task manager provides a clean UI, real-time updates, automatic deadline bucketing, and a polished UX — all powered by a custom frontend architecture using the React Context API.

Live Demo: https://smart-todo-list-app-lyart.vercel.app/

---

## 🔥 Features

✅ Create, update, delete, complete/uncomplete tasks  
⏰ Real-time deadline countdown & urgency status  
⚡ Automatically move tasks between "Ongoing", "Completed", and "Overdue" based on time and completion  
📱 Responsive UI (mobile-friendly)  
🚀 Smooth animations for transitions and actions  
📦 Local mocked REST API with full CRUD support  
🔁 Updates every 60 seconds in UI — no refresh needed  
💬 Toast notifications for feedback  
♿ Accessible interface (keyboard + screen reader friendly)

---

## ⚙️ Tech Stack

- ✅ React (Vite)
- 🎨 Tailwind CSS
- 🌐 React Context API + useReducer
- 🍞 React Hot Toast
- 🧠 date-fns (for time difference utility)
- 🪄 Lucide React Icons
- 🧪 Mock API (in-memory array with delay simulation)

---

## 📁 Project Structure

src/
├── App.jsx                # Main container  
├── main.jsx               # ReactDOM entry  
├── index.css              # TailwindCSS base file  
│
├── components/            # Reusable UI pieces  
│   ├── TaskForm.jsx       # Form for creating/updating tasks  
│   ├── TaskCard.jsx       # Each task card item  
│   ├── TaskBucket.jsx     # Buckets like Ongoing / Completed  
│   ├── LoadingSpinner.jsx  
│   └── ErrorMessage.jsx  
│
├── contexts/              # Global task state logic  
│   └── TaskContext.jsx  
│
├── utils/  
│   └── dateUtils.js       # Time & status helpers  
│
├── services/  
│   └── mockApi.js         # Simulated API endpoints  

---

## 🚀 Installation & Usage

1. Clone the repository:

   git clone https://github.com/yourusername/smart-todo-list  
   cd smart-todo-list

2. Install dependencies:

   npm install

3. Start development server:

   npm run dev

4. Open in browser:

   http://localhost:5173

---

## 🧠 Smart Task Bucketing (Frontend Only)

🚧 Ongoing  
→ `isCompleted: false` AND `deadline > now`  

✅ Completed  
→ `isCompleted: true` (set manually by user)  

⚠️ Overdue  
→ `isCompleted: false` AND `deadline < now`  

These are **derived** properties (not stored in DB) and recalculated every 60 seconds. No page refresh needed.

---

## 🎯 API Contract (Mocked)

Base URL: `/api` (mock provided in `mockApi.js`)

Task Object:
{
"id": "uuid",
"title": "string",
"description": "string",
"deadline": "ISO timestamp",
"isCompleted": "boolean",
"createdAt": "timestamp",
"updatedAt": "timestamp"
}


Endpoints:

- GET `/tasks` → Fetch all tasks  
- POST `/tasks` → Create new task  
- PUT `/tasks/:id` → Update task  
- DELETE `/tasks/:id` → Delete task

---

## 💡 Innovative UX Feature

💥 **Hover Overlay + Action Reveal**  
When users hover a task card:

- A semi-transparent dark overlay appears
- Mark/Update/Delete buttons appear with smooth transitions
- Task content remains visible (not blurred)
- Helps users focus attention on action without clutter

🟢 Combined with urgency badges:  
→ `"Due in 2h"`  
→ `"Overdue by 1d"`  

All managed with Tailwind utilities and frontend timers.

---

## 🧑‍💻 Contributing

Contributions are welcome!
- Fork this repo
- Make changes in feature branch
- Create a Pull Request ✅



---

## 📃 License

MIT © 2025 Laxman

---

