# WorkSense 🧠
### AI-Powered Workplace Intelligence Platform

> Built for the employee. Not the company.

WorkSense is a full-stack AI application that gives working professionals the intelligence they need to navigate their careers — understanding contracts, decoding performance reviews, knowing their worth, and detecting burnout before it hits.

---

## 🔴 The Problem

Every tool in the HR space is built for companies. Nothing exists for the person sitting across the table.

- You sign a contract without understanding what you're agreeing to
- You get a performance review written in corporate jargon you can't decode
- You have no idea if you're being underpaid
- You feel something is wrong at work but can't name it
- You're burning out and nobody warned you

**WorkSense fixes all of that.**

---

## ✨ Features

### 📄 Contract Analyser
Upload any employment contract or offer letter (PDF). WorkSense flags unfair clauses, identifies violations of Indian labour law, highlights missing terms, gives a Risk Score out of 10, and tells you exactly what to negotiate before signing.

### 💬 Workplace Situation Advisor
Describe any situation you're facing at work — manager taking credit for your work, HR pressuring you to resign, salary not credited. WorkSense tells you what's happening, your rights under Indian law, an action plan, and exact words to say.

### 🔍 Performance Review Decoder
Paste your performance review. WorkSense strips the corporate language, tells you what your manager actually means, identifies hidden messages (PIP warnings, promotion signals), gives your honest standing, and provides a script for your next 1:1.

### 💰 Salary Intelligence Engine
Enter your role, experience, location, skills, and current salary. WorkSense tells you the market rate, whether you're underpaid and by how much, a negotiation script with exact words, and the skills that would push you to the next salary bracket.

### 🧠 Burnout Tracker
Weekly check-in across 5 dimensions — workload, sleep, mood, control, recognition. WorkSense gives a Burnout Risk Score, identifies your burnout stage, pinpoints what's draining you most, and gives one specific action to take this week.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, React Router, Axios |
| Backend | FastAPI, Python |
| AI / LLM | Groq API (LLaMA 3.3 70B) |
| Document Parsing | LangChain, PyPDF |
| Styling | Custom CSS (dark theme) |

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- Groq API Key (free at [console.groq.com](https://console.groq.com))

### 1. Clone the repository
```bash
git clone https://github.com/siyanulhaq/worksense.git
cd worksense
```

### 2. Setup the Backend
```bash
cd backend
pip install fastapi uvicorn langchain langchain-groq langchain-community pypdf sqlalchemy python-dotenv
```

Create a `.env` file inside the `backend` folder:
```
GROQ_API_KEY=your_groq_api_key_here
```

Run the backend:
```bash
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`

### 3. Setup the Frontend
```bash
cd frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000`

---

## 📁 Project Structure

```
worksense/
├── backend/
│   ├── routes/
│   │   ├── contract.py       # Contract Analyser API
│   │   ├── situation.py      # Situation Advisor API
│   │   ├── review.py         # Review Decoder API
│   │   ├── salary.py         # Salary Intelligence API
│   │   └── burnout.py        # Burnout Tracker API
│   ├── services/
│   │   ├── llm.py            # Groq LLM setup
│   │   └── rag.py            # PDF processing
│   ├── main.py               # FastAPI app entry point
│   └── .env                  # API keys (not committed)
│
└── frontend/
    └── src/
        ├── pages/
        │   ├── ContractAnalyser.jsx
        │   ├── SituationAdvisor.jsx
        │   ├── ReviewDecoder.jsx
        │   ├── SalaryIntelligence.jsx
        │   └── BurnoutTracker.jsx
        ├── components/
        │   └── Navbar.jsx
        └── App.js
```

---

## 🖼️ Screenshots

> Contract Analyser — flags unfair clauses and gives Risk Score

> Situation Advisor — gives rights, action plan, and exact words to say

> Performance Review Decoder — decodes corporate jargon honestly

> Salary Intelligence — tells you if you're underpaid and by how much

> Burnout Tracker — weekly check-in with burnout risk assessment

---

## 💡 Why I Built This

As a fresher entering the workforce, I realised that every tool in the HR and career space is built for companies — not employees. Job seekers sign contracts they don't understand, get performance reviews they can't decode, and burn out without any warning system.

WorkSense is the tool I wish existed when I started. It gives the average working professional the same intelligence that companies already have — but on their side.

---

## 🔮 Roadmap

- [ ] User authentication and history tracking
- [ ] Weekly burnout trend charts over time
- [ ] Resume Reviewer with ATS Score
- [ ] Interview Simulator
- [ ] Mobile app (React Native)

---

## 👨‍💻 Author

**Siyan Ul Haq**
BTech CSE — Srinivas University
[GitHub](https://github.com/siyanulhaq) · [LinkedIn](https://linkedin.com/in/siyanulhaq)

---

## 📄 License

MIT License — free to use, modify, and distribute.
