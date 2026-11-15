# Abishek Seenivasan — Portfolio

A full-stack portfolio website built with a React/TypeScript frontend and a Python FastAPI backend with PostgreSQL and Gmail SMTP mail services.

## Project Structure

```text
portfolioabishek/
├── backend/                  # FastAPI backend server
│   ├── main.py               # API endpoints, database models, and mail service
│   ├── requirements.txt      # Python dependencies (FastAPI, SQLAlchemy, psycopg, etc.)
│   └── .env                  # Backend environment secrets (Database URI, SMTP keys)
├── frontend/                 # Vite + React + TypeScript frontend
│   ├── public/               # Static assets (profile image, favicon, etc.)
│   ├── src/                  # React source code & styles
│   │   ├── App.tsx           # Main application component & animations
│   │   ├── styles.css        # Responsive styling & keyframe animations
│   │   └── main.tsx          # React DOM entrypoint
│   ├── .env                  # Frontend environment variables (VITE_API_BASE_URL, etc.)
│   ├── .env.example          # Template for frontend environment variables
│   ├── package.json          # Node dependencies and scripts
│   └── vite.config.ts        # Vite configuration & API proxy setup
├── docker-compose.yml        # PostgreSQL service container definition
├── .gitignore                # Global git ignore configuration
└── README.md
```

## Running the Application

### 1. Backend (FastAPI)

```powershell
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
- API Server: `http://127.0.0.1:8000`
- Interactive Swagger Docs: `http://127.0.0.1:8000/docs`
- Health check: `http://127.0.0.1:8000/api/health`

### 2. Frontend (React / Vite)

```powershell
cd frontend
npm install
npm run dev
```
*(On Windows PowerShell, use `npm.cmd run dev` if script execution is restricted)*
- Frontend Website: `http://localhost:5173`
- The dev server automatically proxies `/api/*` to `http://localhost:8000`.
