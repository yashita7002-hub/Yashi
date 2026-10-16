"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   PRE-COMPUTED DETERMINISTIC PARTICLES (Next.js 16 hydration safe)
   ═══════════════════════════════════════════════════════════════════════════ */
const STATIC_PARTICLES = [
  { size: 3.5, left: 6, duration: 20, delay: 1.0 },
  { size: 4.8, left: 14, duration: 24, delay: 3.5 },
  { size: 2.6, left: 22, duration: 16, delay: 0.8 },
  { size: 5.2, left: 29, duration: 22, delay: 5.2 },
  { size: 3.8, left: 37, duration: 14, delay: 2.1 },
  { size: 2.4, left: 44, duration: 26, delay: 7.3 },
  { size: 4.9, left: 51, duration: 18, delay: 4.6 },
  { size: 3.1, left: 58, duration: 21, delay: 0.3 },
  { size: 5.6, left: 65, duration: 15, delay: 6.8 },
  { size: 2.8, left: 72, duration: 23, delay: 2.9 },
  { size: 4.4, left: 79, duration: 19, delay: 8.1 },
  { size: 3.6, left: 86, duration: 15, delay: 5.7 },
  { size: 5.9, left: 92, duration: 25, delay: 1.5 },
  { size: 2.2, left: 96, duration: 12, delay: 9.2 },
  { size: 4.1, left: 10, duration: 27, delay: 4.0 },
  { size: 3.3, left: 19, duration: 13, delay: 6.3 },
  { size: 5.4, left: 33, duration: 19, delay: 3.8 },
  { size: 3.0, left: 47, duration: 23, delay: 7.8 },
  { size: 4.7, left: 61, duration: 16, delay: 1.1 },
  { size: 3.9, left: 75, duration: 21, delay: 8.6 },
  { size: 5.1, left: 83, duration: 17, delay: 2.5 },
  { size: 2.7, left: 91, duration: 14, delay: 5.2 },
  { size: 4.5, left: 27, duration: 20, delay: 9.7 },
  { size: 3.2, left: 53, duration: 17, delay: 3.4 },
];

/* ═══════════════════════════════════════════════════════════════════════════
   CINEMATIC INTRO HERO SECTION (PERMANENT 100VH SECTION IN DOCUMENT FLOW)
   ═══════════════════════════════════════════════════════════════════════════ */
function IntroHero({
  theme,
}: {
  theme: "red" | "blue";
}) {
  const scrollToAbout = () => {
    document.getElementById("chapter-about")?.scrollIntoView({ behavior: "smooth" });
  };

  const isRed = theme === "red";
  const gifSrc = isRed ? "/redST.gif" : "/blueST.gif";

  return (
    <section
      className="opening-screen"
      id="intro-hero"
      role="banner"
      aria-label="Cinematic Title Sequence"
    >
      {/* Background Animated GIF (runs continuously) */}
      <img
        src={gifSrc}
        alt={isRed ? "The Red World Title Animation" : "The Upside Down Title Animation"}
        className="opening-gif-bg"
      />

      {/* Atmospheric Contrast & Vignette Overlay */}
      <div className="opening-gradient-overlay" />

      {/* Top Corner Skip Button */}

      <div className="opening-content">
        <h1 className="opening-name" id="opening-hero-name">
          Yashita
        </h1>
        <p className="opening-subtitle" id="opening-hero-subtitle">
          "Curious to explore, fearless to experiment, driven to build what I envision",
        </p>


        {/* Scroll To Enter Indicator */}
        <button
          onClick={scrollToAbout}
          className="enter-story-indicator"
          id="btn-enter-story"
          aria-label="Scroll to enter About Me section"
        >
          <span>Scroll to Enter My Story</span>
          <span className="indicator-chevron">↓</span>
        </button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STICKY CINEMATIC NAVIGATION BAR
   ═══════════════════════════════════════════════════════════════════════════ */
function NavigationBar({
  theme,
  onToggleTheme,
}: {
  theme: "red" | "blue";
  onToggleTheme: () => void;
}) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isRed = theme === "red";

  return (
    <nav className="site-navbar" role="navigation" aria-label="Main Navigation">


      {/* Five Chapter Navigation Links */}
      <div className="navbar-links">
        <button
          className="nav-item-btn"
          onClick={() => scrollToSection("intro-hero")}
        >
          Intro
        </button>
        <button
          className="nav-item-btn"
          onClick={() => scrollToSection("chapter-about")}
        >
          About
        </button>
        <button
          className="nav-item-btn"
          onClick={() => scrollToSection("chapter-stack")}
        >
          Tech Stack
        </button>
        <button
          className="nav-item-btn"
          onClick={() => scrollToSection("chapter-achievements")}
        >
          Achievements
        </button>
        <button
          className="nav-item-btn"
          onClick={() => scrollToSection("chapter-projects")}
        >
          Projects
        </button>
        <button
          className="nav-item-btn"
          onClick={() => scrollToSection("chapter-contact")}
        >
          Contact
        </button>
      </div>

      {/* Theme Portal Switcher */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <button
          className="dimension-portal-btn"
          onClick={onToggleTheme}
          id="btn-toggle-dimension"
          aria-label={
            isRed
              ? "Enter the Upside Down dimension"
              : "Return to the real world"
          }
        >
          <span>{isRed ? "⚡ Enter The Upside Down" : "⚡ Return To Real World"}</span>
        </button>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN CINEMATIC RESUME PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [theme, setTheme] = useState<"red" | "blue">("red");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up timeouts
  useEffect(() => {
    return () => {
      if (transitionRef.current) clearTimeout(transitionRef.current);
    };
  }, []);

  /* ── Switch Dimensions (Red World <-> Upside Down) ── */
  const toggleTheme = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    transitionRef.current = setTimeout(() => {
      setTheme((prev) => (prev === "red" ? "blue" : "red"));
      setIsTransitioning(false);
    }, 750);
  }, [isTransitioning]);

  const isRed = theme === "red";

  return (
    <div
      className={`portfolio-root ${isRed ? "theme-red" : "theme-blue"} ${isTransitioning ? "transitioning-distortion" : ""
        }`}
    >
      {/* ── TRANSITION FLICKER / WARP OVERLAY ── */}
      <div
        className={`transition-flicker-layer ${isTransitioning ? "active" : ""}`}
        aria-hidden="true"
      />

      {/* ── ATMOSPHERIC SCANLINES & VIGNETTE ── */}
      <div className="scanlines-overlay" aria-hidden="true" />
      <div className="vignette-overlay" aria-hidden="true" />

      {/* ── FLOATING ATMOSPHERIC PARTICLES ── */}
      <div className="particles-layer" aria-hidden="true">
        {STATIC_PARTICLES.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ── FIXED TOP NAVIGATION BAR (VISIBLE ON LOAD & SCROLL) ── */}
      <NavigationBar
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* ── 1. FULL-SCREEN CONTINUOUS CINEMATIC INTRO ── */}
      <IntroHero theme={theme} />


      {/* ═══════════════════════════════════════════════════════════════════
          THE PORTFOLIO: A STORY IN FIVE CHAPTERS
          ═══════════════════════════════════════════════════════════════════ */}
      <main className="portfolio-container" id="main-content">

        {/* ─────────────────────────────────────────────────────────────────
            CHAPTER 01 — ABOUT ME
            ───────────────────────────────────────────────────────────────── */}
        <section
          id="chapter-about"
          className="chapter-section"
          aria-labelledby="heading-chapter-01"
        >
          <header className="chapter-header">
            <span className="chapter-number-badge">Chapter 01</span>
            <h2 className="chapter-title" id="heading-chapter-01">
              About Me
            </h2>
            <p className="chapter-subtitle">
              Curiosity, Algorithms &amp; The Search for Answers
            </p>
          </header>

          <div className="cinematic-card">
            <div className="about-editorial-grid">
              {/* Left Column: Authentic Storytelling Narrative */}
              <div>
                <p className="about-lead-text">
                  I am a passionate <strong>Computer Science student</strong>{" "}
                  and aspiring software engineer driven by an insatiable curiosity
                  to understand how complex technological systems work beneath the surface.
                </p>

                <p className="about-paragraph">
                  My technical journey began with a fascination for logic puzzles
                  and algorithmic thinking. Over time, that curiosity evolved into
                  designing and building full-stack web applications, exploring
                  distributed backends, and examining how thoughtful software
                  engineering can create measurable, positive real-world impact.
                </p>

                <p className="about-paragraph">
                  Whether diving deep into data structures, architecting RESTful
                  APIs, or crafting responsive user interfaces with cinematic
                  attention to detail, I thrive in environments that challenge me
                  to learn rapidly, write clean and maintainable code, and solve
                  ambiguous problems.
                </p>

                <p className="about-paragraph" style={{ marginBottom: 0 }}>
                  <strong>My Ambition:</strong> To collaborate with forward-thinking
                  engineering teams on scalable platforms, contribute meaningfully
                  to open-source technology, and build software that feels as intuitive
                  as it is robust.
                </p>
              </div>

              {/* Right Column: Key Highlights & Learning Focus */}
              <div className="about-highlights-col">
                <div className="highlight-box">
                  <h3 className="highlight-box-title">
                    <span>💻</span> Engineering Mindset
                  </h3>
                  <p className="highlight-box-desc">
                    Emphasizing code modularity, rigorous algorithmic problem solving,
                    and clean architectural design patterns.
                  </p>
                </div>

                <div className="highlight-box">
                  <h3 className="highlight-box-title">
                    <span>⚡</span> Continuous Exploration
                  </h3>
                  <p className="highlight-box-desc">
                    Constantly experimenting with modern frameworks, cloud primitives,
                    and AI integration to expand technical breadth.
                  </p>
                </div>

                <div className="highlight-box">
                  <h3 className="highlight-box-title">
                    <span>🤝</span> Collaborative Growth
                  </h3>
                  <p className="highlight-box-desc">
                    Active participant in hackathons, university developer circles,
                    and peer code reviews.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            CHAPTER 02 — TECH STACK
            ───────────────────────────────────────────────────────────────── */}
        <section
          id="chapter-stack"
          className="chapter-section"
          aria-labelledby="heading-chapter-02"
        >
          <header className="chapter-header">
            <span className="chapter-number-badge">Chapter 02</span>
            <h2 className="chapter-title" id="heading-chapter-02">
              Tech Stack
            </h2>
            <p className="chapter-subtitle">
              Tools, Languages &amp; Weapons of Choice
            </p>
          </header>

          <div className="stack-categories-grid">
            {/* 1. Programming Languages */}
            <div className="cinematic-card stack-category-card">
              <div className="stack-category-header">
                <span className="stack-category-icon">⌨️</span>
                <h3 className="stack-category-title">Programming Languages</h3>
              </div>
              <div className="stack-chips-wrap">
                {[
                  "Python",
                  "TypeScript",
                  "JavaScript",
                  "Java",
                  "C++",
                  "C",
                  "SQL",
                  "HTML5 / CSS3",
                ].map((skill) => (
                  <span key={skill} className="stack-chip">
                    <span className="chip-dot" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Frontend */}
            <div className="cinematic-card stack-category-card">
              <div className="stack-category-header">
                <span className="stack-category-icon">🎨</span>
                <h3 className="stack-category-title">Frontend Engineering</h3>
              </div>
              <div className="stack-chips-wrap">
                {[
                  "React",
                  "Next.js",
                  "Tailwind CSS",
                  "Responsive UI",
                  "Web APIs",
                  "State Management",
                  "CSS Modules",
                ].map((skill) => (
                  <span key={skill} className="stack-chip">
                    <span className="chip-dot" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Backend */}
            <div className="cinematic-card stack-category-card">
              <div className="stack-category-header">
                <span className="stack-category-icon">⚙️</span>
                <h3 className="stack-category-title">Backend Architecture</h3>
              </div>
              <div className="stack-chips-wrap">
                {[
                  "Node.js",
                  "Express.js",
                  "Python (Flask / FastAPI)",
                  "RESTful APIs",
                  "Authentication (JWT)",
                  "Middleware",
                ].map((skill) => (
                  <span key={skill} className="stack-chip">
                    <span className="chip-dot" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. Databases */}
            <div className="cinematic-card stack-category-card">
              <div className="stack-category-header">
                <span className="stack-category-icon">🗄️</span>
                <h3 className="stack-category-title">Databases &amp; Storage</h3>
              </div>
              <div className="stack-chips-wrap">
                {[
                  "PostgreSQL",
                  "MongoDB",
                  "MySQL",
                  "Firebase Firestore",
                  "SQLite",
                  "Database Schema Design",
                ].map((skill) => (
                  <span key={skill} className="stack-chip">
                    <span className="chip-dot" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Tools & Technologies */}
            <div className="cinematic-card stack-category-card" style={{ gridColumn: "1 / -1" }}>
              <div className="stack-category-header">
                <span className="stack-category-icon">🛠️</span>
                <h3 className="stack-category-title">Tools, Platforms &amp; Workflows</h3>
              </div>
              <div className="stack-chips-wrap">
                {[
                  "Git & GitHub",
                  "Docker (Basics)",
                  "Linux / Bash",
                  "Postman",
                  "VS Code",
                  "Vercel",
                  "CI/CD Workflows",
                  "Agile Methodology",
                  "Object-Oriented Programming",
                  "Data Structures & Algorithms",
                ].map((skill) => (
                  <span key={skill} className="stack-chip">
                    <span className="chip-dot" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            CHAPTER 03 — ACHIEVEMENTS
            ───────────────────────────────────────────────────────────────── */}
        <section
          id="chapter-achievements"
          className="chapter-section"
          aria-labelledby="heading-chapter-03"
        >
          <header className="chapter-header">
            <span className="chapter-number-badge">Chapter 03</span>
            <h2 className="chapter-title" id="heading-chapter-03">
              Achievements
            </h2>
            <p className="chapter-subtitle">
              Milestones &amp; Accomplishments Along The Journey
            </p>
          </header>

          <div className="achievements-timeline">
            {/* Milestone 1: Academic Excellence */}
            <div className="cinematic-card achievement-card">
              <div className="achievement-marker-col">
                <div className="achievement-icon-circle">🎓</div>
              </div>
              <div className="achievement-content">
                <div className="achievement-header-row">
                  <h3 className="achievement-title">
                    Academic Excellence in Computer Science
                  </h3>
                  <span className="achievement-date-tag">Academic Milestone</span>
                </div>
                <p className="achievement-desc">
                  Consistently maintained high academic standing in core Computer
                  Science coursework including Data Structures &amp; Algorithms,
                  Computer Systems, Database Design, and Software Engineering Principles.
                </p>
                <span className="achievement-tag">
                  ✦ Academic Distinction Candidate
                </span>
              </div>
            </div>

            {/* Milestone 2: Algorithmic Problem Solving */}
            <div className="cinematic-card achievement-card">
              <div className="achievement-marker-col">
                <div className="achievement-icon-circle">🧩</div>
              </div>
              <div className="achievement-content">
                <div className="achievement-header-row">
                  <h3 className="achievement-title">
                    Algorithmic &amp; Problem Solving Milestones
                  </h3>
                  <span className="achievement-date-tag">Technical Milestone</span>
                </div>
                <p className="achievement-desc">
                  Solved 200+ competitive programming challenges across dynamic
                  programming, graph traversal, and optimization problems on LeetCode
                  and HackerRank, sharpening time and space complexity analysis.
                </p>
                <span className="achievement-tag">
                  ✦ 200+ Problems Solved &middot; Continuous Practice
                </span>
              </div>
            </div>

            {/* Milestone 3: Hackathon Participation */}
            <div className="cinematic-card achievement-card">
              <div className="achievement-marker-col">
                <div className="achievement-icon-circle">🏆</div>
              </div>
              <div className="achievement-content">
                <div className="achievement-header-row">
                  <h3 className="achievement-title">
                    Hackathon Prototype Sprint Competitions
                  </h3>
                  <span className="achievement-date-tag">Collegiate Hackathons</span>
                </div>
                <p className="achievement-desc">
                  Collaborated in multidisciplinary developer teams under strict
                  36-hour sprint constraints to conceptualize, design, and deploy
                  functional full-stack web prototypes addressing real-world civic
                  and educational challenges.
                </p>
                <span className="achievement-tag">
                  ✦ Team Builder &middot; Rapid Prototyping
                </span>
              </div>
            </div>

            {/* Milestone 4: Community & Leadership */}
            <div className="cinematic-card achievement-card">
              <div className="achievement-marker-col">
                <div className="achievement-icon-circle">👥</div>
              </div>
              <div className="achievement-content">
                <div className="achievement-header-row">
                  <h3 className="achievement-title">
                    Student Developer Community Mentorship
                  </h3>
                  <span className="achievement-date-tag">Leadership &amp; Peer Learning</span>
                </div>
                <p className="achievement-desc">
                  Actively participated in campus technology clubs, leading introductory
                  walkthroughs on Git/GitHub version control, modern JavaScript, and
                  open-source contribution workflows for early-year computer science peers.
                </p>
                <span className="achievement-tag">
                  ✦ Peer Mentorship &middot; Knowledge Sharing
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            CHAPTER 04 — PROJECTS
            ───────────────────────────────────────────────────────────────── */}
        <section
          id="chapter-projects"
          className="chapter-section"
          aria-labelledby="heading-chapter-04"
        >
          <header className="chapter-header">
            <span className="chapter-number-badge">Chapter 04</span>
            <h2 className="chapter-title" id="heading-chapter-04">
              Projects
            </h2>
            <p className="chapter-subtitle">
              Major Experiments, Architectures &amp; Discoveries
            </p>
          </header>

          <div className="projects-grid">
            {/* Project 1: AI Study Companion */}
            <article className="cinematic-card project-item-card">
              <div className="project-top-row">
                <div>
                  <span className="project-problem-badge">
                    Problem Solved: Information Overload &amp; Active Recall Retention
                  </span>
                  <h3 className="project-name">AI Study Companion</h3>
                </div>
                <span className="achievement-date-tag">Full-Stack AI Project</span>
              </div>

              <p className="project-description">
                An intelligent study assistant that transforms lengthy academic lecture notes
                and course materials into interactive, adaptive quizzes, dynamic flashcards,
                and structured concept summaries. Designed to streamline exam preparation through
                active recall.
              </p>

              <div>
                <strong style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>
                  Key Features &amp; Contributions:
                </strong>
                <ul className="project-features-list">
                  <li>Engineered streaming AI completions using OpenAI API with context-aware system prompts.</li>
                  <li>Built responsive client interface with real-time quiz scoring and progress evaluation.</li>
                  <li>Implemented local persistence for generated study decks and custom flashcard sets.</li>
                </ul>
              </div>

              <div className="project-tech-row">
                {["Next.js", "TypeScript", "OpenAI API", "Node.js", "Tailwind CSS", "Vercel"].map(
                  (tech) => (
                    <span key={tech} className="project-tech-badge">
                      {tech}
                    </span>
                  )
                )}
              </div>

              <div className="project-links-row">
                <a
                  href="https://github.com/yashi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn project-link-primary"
                  id="link-project-ai-github"
                >
                  <span>💻</span> Source Code
                </a>
                <a
                  href="#contact"
                  className="project-link-btn project-link-secondary"
                  id="link-project-ai-demo"
                >
                  <span>🔗</span> Request Demo / Preview
                </a>
              </div>
            </article>

            {/* Project 2: EcoTrack */}
            <article className="cinematic-card project-item-card">
              <div className="project-top-row">
                <div>
                  <span className="project-problem-badge">
                    Problem Solved: Lack of Actionable Personal Carbon Tracking
                  </span>
                  <h3 className="project-name">EcoTrack — Carbon Footprint Tracker</h3>
                </div>
                <span className="achievement-date-tag">Web Application</span>
              </div>

              <p className="project-description">
                A gamified sustainability web application that empowers individuals to calculate,
                monitor, and diminish their daily carbon footprint across transportation, dietary
                choices, and home energy consumption through actionable, personalized milestones.
              </p>

              <div>
                <strong style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>
                  Key Features &amp; Contributions:
                </strong>
                <ul className="project-features-list">
                  <li>Designed normalized relational database schema in PostgreSQL for logging daily activity metrics.</li>
                  <li>Built dynamic visual analytics dashboards using Chart.js to visualize emission trends over time.</li>
                  <li>Constructed secure RESTful endpoints in Node.js/Express for authenticated user profile management.</li>
                </ul>
              </div>

              <div className="project-tech-row">
                {["React", "Node.js", "Express", "PostgreSQL", "Chart.js", "JWT Auth"].map(
                  (tech) => (
                    <span key={tech} className="project-tech-badge">
                      {tech}
                    </span>
                  )
                )}
              </div>

              <div className="project-links-row">
                <a
                  href="https://github.com/yashi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn project-link-primary"
                  id="link-project-ecotrack-github"
                >
                  <span>💻</span> Source Code
                </a>
                <a
                  href="#contact"
                  className="project-link-btn project-link-secondary"
                  id="link-project-ecotrack-demo"
                >
                  <span>🔗</span> Architecture Specs
                </a>
              </div>
            </article>

            {/* Project 3: CryptoVault */}
            <article className="cinematic-card project-item-card">
              <div className="project-top-row">
                <div>
                  <span className="project-problem-badge">
                    Problem Solved: Insecure Local Storage &amp; Credential Vulnerability
                  </span>
                  <h3 className="project-name">CryptoVault — Secure Password Manager</h3>
                </div>
                <span className="achievement-date-tag">Security &amp; Systems</span>
              </div>

              <p className="project-description">
                A desktop-first encrypted credential vault engineered with a strict zero-knowledge
                architecture. Employs military-grade AES-256 GCM encryption and PBKDF2 key derivation
                to ensure credentials are fully encrypted prior to local database storage.
              </p>

              <div>
                <strong style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>
                  Key Features &amp; Contributions:
                </strong>
                <ul className="project-features-list">
                  <li>Utilized AES-256 GCM with unique nonces per vault record to prevent replay and ciphertext manipulation.</li>
                  <li>Integrated cryptographically secure pseudo-random number generation for high-entropy password creation.</li>
                  <li>Structured resilient local database layer in SQLite with master key verification hashing.</li>
                </ul>
              </div>

              <div className="project-tech-row">
                {["Java", "JavaFX", "AES-256", "PBKDF2", "SQLite", "Cryptography"].map(
                  (tech) => (
                    <span key={tech} className="project-tech-badge">
                      {tech}
                    </span>
                  )
                )}
              </div>

              <div className="project-links-row">
                <a
                  href="https://github.com/yashi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn project-link-primary"
                  id="link-project-cryptovault-github"
                >
                  <span>💻</span> Source Code
                </a>
                <a
                  href="#contact"
                  className="project-link-btn project-link-secondary"
                  id="link-project-cryptovault-demo"
                >
                  <span>📖</span> Security Documentation
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            CHAPTER 05 — GET IN TOUCH (THE NEXT CHAPTER STARTS HERE)
            ───────────────────────────────────────────────────────────────── */}
        <section
          id="chapter-contact"
          className="chapter-section"
          aria-labelledby="heading-chapter-05"
        >
          <header className="chapter-header">
            <span className="chapter-number-badge">Chapter 05</span>
            <h2 className="chapter-title" id="heading-chapter-05">
              The Next Chapter Starts Here
            </h2>
            <p className="chapter-subtitle">
              Connecting Parallel Realities &middot; Open to Opportunities
            </p>
          </header>

          <div className="cinematic-card contact-chapter-card">
            <p className="contact-invitation-text">
              I am actively seeking <strong>software engineering internships</strong>,{" "}
              research collaborations, and full-stack development opportunities.
              Whether you have an ambitious idea, an engineering challenge, or
              simply want to discuss technology and Stranger Things — I would love to connect.
            </p>

            {/* Contact Action Cards */}
            <div className="contact-cards-grid">
              {/* Email */}
              <a
                href="mailto:yashi.cs@example.com"
                className="contact-action-card"
                id="contact-email"
              >
                <span className="contact-icon-large">📧</span>
                <div>
                  <div className="contact-type-label">Email Direct</div>
                  <div className="contact-value-text">yashi.cs@example.com</div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/yashi"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-action-card"
                id="contact-github"
              >
                <span className="contact-icon-large">🐙</span>
                <div>
                  <div className="contact-type-label">GitHub Profile</div>
                  <div className="contact-value-text">github.com/yashi</div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/yashi"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-action-card"
                id="contact-linkedin"
              >
                <span className="contact-icon-large">💼</span>
                <div>
                  <div className="contact-type-label">LinkedIn</div>
                  <div className="contact-value-text">linkedin.com/in/yashi</div>
                </div>
              </a>

              {/* Resume Download / View */}
              <a
                href="#chapter-about"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Resume PDF Download: Connect via email to receive the latest academic and technical resume.");
                }}
                className="contact-action-card"
                id="contact-resume"
              >
                <span className="contact-icon-large">📄</span>
                <div>
                  <div className="contact-type-label">Curriculum Vitae</div>
                  <div className="contact-value-text">Request Resume PDF</div>
                </div>
              </a>
            </div>

            {/* Upside Down Switcher Button in Closing Section */}
            <div style={{ marginBottom: "2.5rem" }}>
              <button
                className="dimension-portal-btn"
                onClick={toggleTheme}
                style={{ padding: "0.85rem 2rem", fontSize: "0.95rem" }}
                id="btn-footer-toggle-dimension"
              >
                {isRed ? "⚡ Enter The Upside Down" : "⚡ Return To The Real World"}
              </button>
            </div>

            {/* Memorable Closing Line Required by Prompt */}
            <div className="closing-quote-box">
              <p className="closing-quote-text">
                “The next chapter hasn&apos;t been written yet.”
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="cinematic-footer">
        <p>
          Designed &amp; Developed by <strong>Yashi</strong> &middot; Inspired by Stranger Things &middot; Two Parallel Dimensions
        </p>
      </footer>
    </div>
  );
}
