# CivicSense AI - Simplifying Governance for Everyone


✅ **Project Status: Finished**

### 🏆 Submission for HackXIndia Hackathon 2026

**Team Name:** UrbanIQ  
**Team Members:**
- [Lakshya Bapna](https://github.com/lakshyabapna)
- [Vansh Sharma](https://github.com/VanshSharma88)
- [Sachin Jaiswal](https://github.com/jaiswalsachin49)
- [Kushal Sarkar](https://github.com/Kushal425)

---

### 🎥 Project Video
[Watch the Demo](https://drive.google.com/drive/folders/10bqEaoI1tpIS9rhtN8vkdIFbe9K6SJll?usp=drive_link)

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

**Frontend**
- **Next.js 16** (React 19)
- **Tailwind CSS 4**
- **Framer Motion** for animations
- **Lucide React** for icons

**Backend**
- **FastAPI** (Python 3.10+)
- **Uvicorn** (ASGI Server)
- **Tesseract OCR** (for image text extraction)
- **LangChain & Groq API** (LLM integration)
- **MongoDB** (Motor asyncio driver)

**AI/ML**
- **Groq API** (Llama 3 models) for fast inference
- **Tesseract** for optical character recognition

---

### ⚙️ Environment Configuration

You must configure environment variables for both the backend and frontend.

#### Backend (`backend/.env`)
Create a `.env` file in the `backend/` directory:

```env
# Server
API_HOST=0.0.0.0
API_PORT=8000

# Database
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority

# LLM Provider (Choose one: groq, openai, gemini)
LLM_PROVIDER=groq

# API Keys (Fill based on your chosen provider)
GROQ_API_KEY=your_groq_api_key_here
OPENAI_API_KEY=
GOOGLE_API_KEY=
```

#### Frontend (`frontend/.env.local`)
Create a `.env.local` file in the `frontend/` directory if required by your frontend logic (e.g., API base URL).

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

### 🏃‍♂️ How to Run Locally

You can run the project manually or using Docker for the backend.

#### Method 1: Manual Setup (Recommended for Development)

**Prerequisites:**
- Node.js (v18+) & npm
- Python 3.10+
- **Tesseract OCR** installed on your system.
  - *macOS*: `brew install tesseract`
  - *Windows*: Download installer from UB-Mannheim
  - *Linux*: `sudo apt-get install tesseract-ocr`

**1. Clone the Repository**
```bash
git clone https://github.com/jaiswalsachin49/HackXIndia-Hackathon-2026.git
cd HackXIndia-Hackathon-2026
```

**2. Backend Setup**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Run the server
python3 main.py
```
*Server will be running at [http://localhost:8000](http://localhost:8000). Documentation available at [http://localhost:8000/docs](http://localhost:8000/docs).*

**3. Frontend Setup**
```bash
cd ../frontend  # From backend dir
npm install
npm run dev
```
*Frontend will be running at [http://localhost:3000](http://localhost:3000).*

---

#### Method 2: Docker Setup (Backend Only)

If you have Docker installed, you can containerize the backend to avoid installing system dependencies like Tesseract manually.

**1. Build the Docker Image**
```bash
cd backend
docker build -t civicsense-backend .
```

**2. Run the Container**
Make sure you have your `.env` file ready in the `backend/` directory.

```bash
docker run -d -p 8000:8000 --env-file .env civicsense-backend
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
