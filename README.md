# Project Kisan — Phase 1 Skeleton

This repository contains the structural skeleton for the Project Kisan application. No business logic, AI, APIs, or database code is included in this phase.

## Frontend (React + Vite)

- Location: `project-kisan/frontend`
- Pages: Home, Live Chat, Disease Diagnosis, Market Prices, Government Schemes, Smart Utilities
- Components: VoiceInput, ChatUI, ImageUpload, Loading
- Service stubs: `src/services/api.js` (empty functions)

Run locally:

```bash
cd project-kisan/frontend
npm install
npm run dev
```

## Backend (FastAPI)

- Location: `project-kisan/backend`
- App entry: `app/main.py`
- Routers: chat, disease, market, schemes, utilities, users (dummy responses only)
- Folders: `app/models`, `app/db`, `app/utils`

Run locally:

```bash
cd project-kisan/backend
python -m venv .venv
# Activate venv (Windows PowerShell)
. .venv/Scripts/Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

This is a pure scaffold to be extended in later phases.
