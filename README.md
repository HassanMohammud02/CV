# Hassan Abdirahman Mohammud — Executive Portfolio, Resume & Case Study Platform

**Economics & Business Administration Graduate (*Økonomi og Administrasjon*) | Oslo Metropolitan University (OsloMet)**  
**Focus Areas:** Business Analytics • Corporate Finance • Accounting • ESG & Sustainability • Strategy • Entrepreneurship • Digital Transformation

A production-ready React + Vite + Tailwind CSS executive portfolio designed after leading management consulting and Big Four firms (McKinsey, Deloitte, PwC, EY, Accenture). It combines a recruiter fast-track brief, an ATS-printable resume, a 6-part consulting case study library, a 4-pillar skills matrix, an executive insights blog, live engagement analytics, an AI recruiter assistant, and a no-code `localStorage` Admin CMS Studio.

---

## Project Structure

```text
portfolio/
├── public/
│   ├── favicon.ico
│   ├── resume.pdf
│   └── assets/
│       ├── consulting-og.png
│       └── profile-portrait.svg
├── src/
│   ├── assets/
│   │   └── executive-seal.svg
│   ├── components/
│   │   ├── AIAssistant.jsx
│   │   ├── CaseStudyModal.jsx
│   │   ├── CommandPalette.jsx
│   │   ├── ExecutivePortrait.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── ProjectVisual.jsx
│   ├── data/
│   │   └── portfolioData.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── pages/
│   │   ├── AboutPage.jsx
│   │   ├── AdminCmsPage.jsx
│   │   ├── AnalyticsPage.jsx
│   │   ├── BlogPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── ProjectsPage.jsx
│   │   ├── RecruiterDashboardPage.jsx
│   │   ├── ResumePage.jsx
│   │   └── SkillsPage.jsx
│   ├── utils/
│   │   ├── aiResponder.js
│   │   ├── analytics.js
│   │   └── readingTime.js
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── PortfolioApp.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

---

## 1. Installation

Ensure you have **Node.js 18+** and **npm** installed, then install dependencies:

```bash
npm install
```

---

## 2. Development

Start the local Vite development server with hot module replacement:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 3. Production Build

Create an optimized production bundle inside `dist/`:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 4. GitHub Upload Instructions

1. Create a new repository on GitHub (e.g., `hassanmohammud/portfolio`).
2. Initialize Git inside the `portfolio/` directory and push your code:

```bash
git init
git add .
git commit -m "Initial commit: Executive Economics & Business Analytics Portfolio"
git branch -M main
git remote add origin https://github.com/hassanmohammud/portfolio.git
git push -u origin main
```

---

## 5. Vercel Deployment (Step-by-Step)

1. Log in to [Vercel](https://vercel.com) with your GitHub account.
2. Click **Add New → Project** and import your `portfolio` GitHub repository.
3. Vercel automatically detects **Vite** via `vercel.json`:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. *(Optional)* Add environment variables from `.env.example` (`VITE_CMS_PASSCODE`, `VITE_CONTACT_EMAIL`, etc.).
5. Click **Deploy**. Your portfolio will be live at `https://hassanmohammud.vercel.app` (or your custom domain) within ~30 seconds.

---

## Using the No-Code Admin CMS Studio

Click **CMS** in the top navigation bar to open the **Admin Publishing Studio** (default passcode if locked: `OSLOMET2026`):
- **Case Studies:** Add new projects, upload dashboard/cover images, edit existing case studies, or delete entries.
- **Articles:** Publish new analytical blog posts with automatic reading-time calculation.
- **Skills Matrix:** Add new competencies or adjust proficiency percentages across *Finance*, *Business*, *Analytics*, and *Sustainability*.
- **Resume & Bio:** Update your headline, career objective, email, or availability status in real time.
