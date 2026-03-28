# SecureNote Application 📝🔒

A lightweight, secure full-stack web application that allows authorized users to create, view, and delete text notes. Built with Vanilla JavaScript on the frontend and Node.js/Express on the backend.

## 🚀 Features
- **Frontend:** Vanilla JavaScript with dynamic DOM manipulation and Fetch API.
- **Backend:** RESTful API built with Node.js and Express.js.
- **Security:** Simple Token Authorization for creating and deleting notes.
- **CORS Enabled:** Seamless communication between client and server.

## 📁 Project Structure
```text
/secure-note-app
│
├── /backend            # Node.js server environment
│   ├── .env            # Environment variables (Ignored by Git)
│   ├── .gitignore      # Git ignore file
│   ├── package.json    # Backend dependencies
│   └── server.js       # Main server and API endpoints
│
├── /frontend           # Client-side environment
│   ├── index.html      # Main UI
│   ├── style.css       # Styling (including Dark/Light theme)
│   └── app.js          # Client-side logic and API calls
│
└── REPORT.md           # Conceptual report for JS Engine, DOM, HTTP, and Env