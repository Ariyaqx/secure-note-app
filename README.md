# SecureNote Application 📝🔒

A lightweight, secure full-stack web application that allows authorized users to create, view, update, and delete text notes (Full CRUD). Built with Vanilla JavaScript on the frontend and Node.js/Express on the backend, with PocketHost as the database and Vercel for deployment.

## 🚀 Features
- **Frontend:** Vanilla JavaScript with dynamic DOM manipulation and Fetch API.
- **Backend:** RESTful API built with Node.js and Express.js.
- **Database & Persistence (+Bonus):** Integrated with PocketHost (BaaS) and local `notes.json` auto-backup.
- **Security:** Token Authorization for secure API access.
- **Cloud Deployment (+Bonus):** Backend deployed on Vercel.

## 🌐 Live Demo
- **Frontend (Web App):** `https://secure-note-app-frontend.vercel.app/`
- **Backend API:** `https://secure-note-app-rust.vercel.app/api/notes`

## 📁 Project Structure
```text
/secure-note-app
│
├── /backend            # Node.js server environment
│   ├── .env            # Environment variables (MUST BE IGNORED BY GIT)
│   ├── .gitignore      # Git ignore file (must include .env)
│   ├── package.json    # Backend dependencies
│   ├── server.js       # Main server and API endpoints
│   ├── notes.json      # Auto-generated local backup data
│   └── vercel.json     # Vercel deployment configuration
│
├── /frontend           # Client-side environment
│   ├── index.html      # Main UI
│   ├── style.css       # Styling (including Dark/Light theme)
│   └── app.js          # Client-side logic and API calls
│
└── REPORT.md           # Conceptual report