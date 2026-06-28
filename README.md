# HireSmart AI 🚀

> An intelligent AI-powered recruitment platform that streamlines hiring through automated resume screening, semantic candidate matching, and LLM-driven evaluation.

![GitHub repo size](https://img.shields.io/github/repo-size/abhigithubgaur/HireSmart-AI)
![GitHub last commit](https://img.shields.io/github/last-commit/abhigithubgaur/HireSmart-AI)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Java](https://img.shields.io/badge/Java-Spring%20Boot-green)
![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react)

---

## 📌 Overview

HireSmart AI is a modern recruitment platform designed to eliminate the inefficiencies of traditional Applicant Tracking Systems (ATS). Instead of relying on surface-level keyword matching, HireSmart leverages **Large Language Models (LLMs)** and **semantic search** to understand the actual context, relevance, and depth of each candidate's experience.

The platform analyzes resumes against job descriptions, ranks candidates intelligently, and empowers recruiters to identify the best talent — faster and more accurately than ever before.

---

## ✨ Features

### 🤖 Automated Resume Ranking
- AI-powered analysis of candidate resumes
- Intelligent ranking based on skill relevance, experience match, contextual understanding, and semantic similarity

### 🔍 Semantic Search & Matching
- Vector embeddings for contextual candidate matching
- Detects relevant skills even when terminology differs across resumes and job descriptions
- Goes beyond keyword filtering to improve hiring accuracy

### 🧠 Local AI Inference with Ollama
- Integrated with Ollama for local LLM execution
- Enhanced privacy, faster inference, and reduced dependency on external APIs

### ⚡ Full-Stack Architecture
- Modern, responsive React frontend
- Scalable Spring Boot backend
- Clean RESTful API design

### 🗄️ Efficient Data Management
- Optimized relational database schema
- Manages candidate profiles, job postings, resume scores, and match analytics

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Java, Spring Boot, Spring Data JPA |
| **AI / ML** | Gemini API, Ollama (Local LLM), Semantic Embeddings, Vector Databases |
| **Database** | PostgreSQL, Neon DB, MySQL |
| **Build & API** | Maven, REST APIs |

---

## 📂 Project Structure

```
HireSmart-AI/
│
├── hiresmart-frontend/       # React.js frontend application
├── hiresmart/                # Spring Boot backend application
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v18+) and npm
- Java 17+
- Maven
- PostgreSQL or MySQL
- [Ollama](https://ollama.com/) installed locally

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/abhigithubgaur/HireSmart-AI.git
cd HireSmart-AI
```

---

### 2️⃣ Database Configuration

Open `hiresmart/src/main/resources/application.properties` and configure your database:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/hiresmart
spring.datasource.username=your_username
spring.datasource.password=your_password
```

---

### 3️⃣ Local AI Setup (Ollama)

Install [Ollama](https://ollama.com/) and pull the Llama 3 model:

```bash
ollama pull llama3
```

Then start the Ollama server:

```bash
ollama serve
```

---

### 4️⃣ Backend Setup

```bash
cd hiresmart
./mvnw clean install
./mvnw spring-boot:run
```

The backend will start at: **http://localhost:8080**

---

### 5️⃣ Frontend Setup

```bash
cd hiresmart-frontend
npm install
npm start
```

The frontend will start at: **http://localhost:3000**

---

## 🧠 AI Capabilities

HireSmart leverages a combination of cutting-edge AI techniques:

| Capability | Description |
|---|---|
| LLM-powered reasoning | Deep understanding of candidate profiles and job requirements |
| Semantic embeddings | Context-aware vector representations of resumes and job descriptions |
| Intelligent scoring | Multi-factor ranking algorithms beyond simple keyword counts |
| Local inference | Privacy-preserving on-device AI via Ollama |

This enables the platform to:
- Understand candidate expertise at a deeper level
- Reduce false negatives that cause qualified candidates to be overlooked
- Dramatically improve recruitment efficiency and quality

---

## 🚀 Future Enhancements

- [ ] Interview scheduling system
- [ ] AI-generated interview question sets
- [ ] Resume feedback assistant for candidates
- [ ] Recruiter analytics dashboard
- [ ] Multi-language resume support
- [ ] Real-time collaboration tools for hiring teams

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes
   ```bash
   git commit -m "Add: your feature description"
   ```
4. **Push** to your branch
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** and describe what you've added

---

## 👨‍💻 Author

**Abhishek Gaur**

- GitHub: [@abhigithubgaur](https://github.com/abhigithubgaur)

---

## ⭐ Support

If you found this project helpful:

- Give it a ⭐ on [GitHub](https://github.com/abhigithubgaur/HireSmart-AI)
- Share it with others in the developer community
- Contribute to help improve the platform

---

<p align="center">Made with ❤️ by Abhishek Gaur</p>
