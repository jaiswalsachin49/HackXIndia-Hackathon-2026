# CivicSense AI - Simplifying Governance for Everyone

### 🏆 Submission for HackXIndia Hackathon 2026

**Team Name:** UrbanIQ  
**Team Members:**
- [Lakshya Bapna](https://github.com/lakshyabapna)
- [Vansh Sharma](https://github.com/VanshSharma88)
- [Sachin Jaiswal](https://github.com/jaiswalsachin49)
- [Kushal Sarkar](https://github.com/Kushal425)

---

### 🎥 Project Video
[Link to Video Demo]

---

### ❓ Problem Statement
**The Gap Between Citizens and Government**
Every day, millions of citizens struggle to understand government notices, circulars, and schemes. These documents are often written in complex bureaucratic and legal language (legalese) that is inaccessible to the average person. This lack of understanding leads to:
- Missed opportunities for welfare benefits.
- Non-compliance with regulations due to ignorance.
- A general sense of disempowerment and disconnection from civic duties.
- Language barriers for non-English speakers.

### 💡 Our Solution
**CivicSense AI** is an intelligent platform designed to bridge this gap. We empower citizens by decoding government documents into simple, actionable insights.

**Key Features:**
1.  **AI-Powered Document Analysis**: Upload any government notice (PDF/Image), and our AI extracts key dates, obligations, and summaries in plain English.
2.  **Scheme Matchmaker**: Based on user profile (age, income, occupation), we automatically recommend relevant government schemes they are eligible for.
3.  **Privacy-First Architecture**: We use a stateless architecture where documents are analyzed in real-time and never stored permanently.
4.  **Multi-Language Support**: Breaking language barriers by offering summaries in regional languages (Coming Soon).
5.  **Interactive Support**: A dedicated Help Center with FAQs and direct support channels.

---

### 🛠️ Tech Stack
- **Frontend**: Next.js , Tailwind CSS, Framer Motion, Lucide React
- **Backend**: FastAPI , Uvicorn
- **AI/ML**: Groq API (LLaMA 3) for text analysis and summarization
- **Database**: MongoDB
- **Deployment**: Vercel (Frontend), Render (Backend)

---

### 🏃‍♂️ How to Run Locally

#### Prerequisites
- Node.js & npm
- Python 3.8+
- Git

#### 1. Clone the Repository
```bash
git clone https://github.com/jaiswalsachin49/HackXIndia-Hackathon-2026.git
cd HackXIndia-Hackathon-2026
```

#### 2. Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
# Create .env file with your GROQ_API_KEY and other secrets
python3 main.py
```

#### 3. Frontend Setup
```bash
cd frontend
npm install
# Create .env.local file if needed
npm run dev
```

---

<details>
<summary>About HackXIndia Hackathon (Event Details)</summary>

## HackXIndia
### Join 1000+ developers, designers and founders from all over India for a 24-hour non-stop hackathon that turns ideas into deployable products.

### Why this hackathon?
Real problems, real mentors, real deploys. No boring PPTs – just shipping.

- Work on problem statements from industry & startups.
- Get mentored by developers, founders & domain experts.
- Win cash prizes, swags & internship opportunities.

### Who can participate?
Open for all college students & early professionals across India.

- CSE / IT / ECE / EE / ME / Any branch – all welcome.
- Beginner-friendly: no minimum experience required.
- Team size: 1–4 members

📘
### Instructions & Guidelines
#### Important rules all participants must follow before and during HackXIndia.

- HackXIndia is an online hackathon, being organized under Google Developers Groups on Campus.
- Only the Team Leader needs to register for the hackathon.
- The registration fee is non‑refundable in any circumstances.
- This is an open‑source hackathon.
- Everyone must join the WhatsApp channel to get all official updates.
- Registration Fee: ₹199 per team
- Team Size: 1–4 members
</details>
