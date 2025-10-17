# Human-in-the-Loop AI Supervisor System

## Overview
This project simulates a human-in-the-loop AI receptionist for a salon.  
- AI receives customer queries.
- If AI doesn't know the answer, it escalates to a human supervisor.
- Supervisor responds → AI learns and updates knowledge base.
- Fully simulated locally using Flask backend and React frontend.

---

## Features
- AI Agent simulation
- Pending request handling
- Supervisor panel (React)
- Knowledge base updates
- Console/webhook alerts for AI follow-ups

---

## Tech Stack
- **Frontend:** React.js
- **Backend:** Python Flask
- **Database:** JSON files (simulating DB)
- **Other:** Axios for API calls, Flask-CORS

---

## Project Structure
human-in-the-loop-ai/
├── backend/
│ ├── app.py
│ ├── db.py
│ ├── knowledge_base.json
│ └── requirements.txt
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Navbar.js
│ │ │ └── KnowledgeBase.js
│ │ ├── pages/
│ │ │ ├── Dashboard.js
│ │ │ └── PendingRequests.js
│ │ ├── App.js
│ │ └── api.js
└── README.md

yaml
Copy code

## Demo Video : https://drive.google.com/file/d/1Wp4H6gS16rENi58QBmKF6P4v7EJTYPBD/view?usp=sharing

---

## Setup Instructions

### Backend
```bash
cd backend
python -m venv venv
pip install -r requirements.txt
python app.py
Runs on http://127.0.0.1:5000

Frontend
bash
Copy code
cd frontend
npm install
npm start
Runs on http://localhost:3000

Usage Flow
Ask AI a question in Dashboard.

If unknown, request appears in Supervisor panel.

Supervisor submits answer.

AI follows up automatically and updates Knowledge Base.

Re-ask same question → AI answers instantly.

Design Notes
Modular structure: separate AI, DB, Supervisor UI.

Requests lifecycle: Pending → Resolved / Unresolved.

Knowledge base updates dynamically.

Easy to scale and extend to real database or live calls.
