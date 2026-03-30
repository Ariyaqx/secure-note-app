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

```
## 🛠️ How to Run Locally

To run this project on your local machine for testing or evaluation, please follow the steps below:

### Prerequisites
- **Node.js** installed on your computer.
- A code editor like **VS Code** with the **Live Server** extension installed.

### 1. Backend Setup (Node.js/Express)
1. Open your terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies: Run the following command to install required packages:
   ```bash
   npm install
   ```
3. Environment Configuration: Create a new .env file inside the backend folder and add your secret token:
   ```bash
   SECRET_TOKEN=my_super_secret_token_12345
   ```
4. Run the backend: Start the server using Node.js:
   ```bash
   node server.js
   ```
   *(The backend server will start running on http://localhost:3000)*

### 2. Frontend Setup (Vanilla JS)
1. **Install dependencies:** *No installation required* (This frontend is built with pure Vanilla JavaScript, HTML, and CSS).
2. **Run the frontend:** - Open the `frontend` folder in VS Code.
   - Right-click on the `index.html` file and select **"Open with Live Server"**.
   - The application will open automatically in your browser and connect to the API.