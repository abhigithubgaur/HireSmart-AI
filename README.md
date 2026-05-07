HireSmart AI 🚀

An intelligent AI-powered recruitment platform that streamlines the hiring process through automated resume screening, semantic candidate matching, and LLM-driven evaluation.

📌 Overview

HireSmart is an intelligent recruitment platform designed to modernize and automate candidate evaluation. Unlike traditional ATS systems that rely heavily on keyword matching, HireSmart leverages Large Language Models (LLMs) and semantic search to understand the actual context, relevance, and depth of candidate experience.

The platform analyzes resumes against job descriptions, ranks candidates intelligently, and enables recruiters to identify the best talent faster and more accurately.

✨ Features
🤖 Automated Resume Ranking
AI-powered resume analysis
Intelligent ranking based on:
Skill relevance
Experience match
Contextual understanding
Semantic similarity
🔍 Semantic Search & Matching
Uses vector embeddings for contextual candidate matching
Detects relevant skills even when terminology differs
Improves hiring accuracy beyond keyword filtering
🧠 Local AI Inference
Integrated with Ollama
Supports local LLM execution for:
Better privacy
Faster inference
Reduced API dependency
⚡ Full-Stack Architecture
Modern React frontend
Scalable Spring Boot backend
RESTful API architecture
🗄️ Efficient Data Management
Optimized relational database schema
Handles:
Candidate profiles
Job postings
Resume scores
Match analytics
🛠️ Tech Stack
Frontend
React.js
Tailwind CSS
Backend
Java
Spring Boot
Spring Data JPA
AI / ML
Gemini API
Ollama (Local LLM)
Vector Databases
Semantic Embeddings
Database
PostgreSQL
Neon DB
MySQL
Tools & Infrastructure
Maven
REST APIs
📂 Project Structure
HireSmart-AI/
│
├── hiresmart-frontend/     # React frontend
├── hiresmart-backend/      # Spring Boot backend
│
├── README.md
└── ...
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/abhigithubgaur/HireSmart-AI.git
cd HireSmart-AI

Repository:
HireSmart-AI Repository

2️⃣ Database Configuration

Configure your database in application.properties:

spring.datasource.url=jdbc:postgresql://localhost:5432/hiresmart
spring.datasource.username=your_username
spring.datasource.password=your_password
3️⃣ AI Configuration (Ollama)

Install and run Ollama locally.

Pull the Llama 3 model:

ollama pull llama3

Official Website:
Ollama

4️⃣ Backend Setup
cd hiresmart-backend
./mvnw clean install
./mvnw spring-boot:run

Backend runs on:

http://localhost:8080
5️⃣ Frontend Setup
cd hiresmart-frontend
npm install
npm start

Frontend runs on:

http://localhost:3000
🔄 Workflow
Recruiter uploads resumes
System extracts candidate data
AI analyzes resumes against job descriptions
Semantic search generates contextual matches
Candidates are ranked intelligently
Recruiters review top-ranked applicants
🧠 AI Capabilities

HireSmart leverages:

LLM-powered reasoning
Semantic embeddings
Context-aware matching
Intelligent scoring algorithms

This enables the system to:

Understand candidate expertise deeply
Reduce false negatives in hiring
Improve recruitment efficiency
📸 Screenshots

Add screenshots or demo GIFs here.

Example:

![Dashboard](./screenshots/dashboard.png)
🚀 Future Enhancements
Interview scheduling system
AI-generated interview questions
Resume feedback assistant
Recruiter analytics dashboard
Multi-language resume support
Real-time collaboration tools
🤝 Contributing

Contributions are welcome!

Steps to Contribute
Fork the repository
Create a feature branch
git checkout -b feature-name
Commit your changes
git commit -m "Add feature"
Push to your branch
git push origin feature-name
Open a Pull Request
📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Developed by Abhishek Gaur

GitHub:
@abhigithubgaur

⭐ Support

If you found this project helpful:

Give it a ⭐ on GitHub
Share it with others
Contribute to improve the platform
