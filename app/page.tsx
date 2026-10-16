"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   STRANGER THINGS RESUME — YASHI'S PERSONAL WEBSITE
   ═══════════════════════════════════════════════════════ */

// ──────── Particle Component ────────
// Pre-computed particle positions to avoid Math.random() hydration mismatch
const PARTICLE_DATA = [
  { size: 3.2, left: 5, duration: 18, delay: 1.2 },
  { size: 4.5, left: 12, duration: 22, delay: 3.5 },
  { size: 2.8, left: 20, duration: 15, delay: 0.8 },
  { size: 5.1, left: 28, duration: 20, delay: 5.2 },
  { size: 3.7, left: 35, duration: 12, delay: 2.1 },
  { size: 2.3, left: 42, duration: 24, delay: 7.3 },
  { size: 4.8, left: 48, duration: 16, delay: 4.6 },
  { size: 3.0, left: 55, duration: 19, delay: 0.3 },
  { size: 5.5, left: 62, duration: 14, delay: 6.8 },
  { size: 2.6, left: 68, duration: 21, delay: 2.9 },
  { size: 4.2, left: 75, duration: 17, delay: 8.1 },
  { size: 3.5, left: 82, duration: 13, delay: 5.7 },
  { size: 5.8, left: 88, duration: 23, delay: 1.5 },
  { size: 2.1, left: 93, duration: 11, delay: 9.2 },
  { size: 4.0, left: 8, duration: 25, delay: 3.8 },
  { size: 3.3, left: 17, duration: 10, delay: 6.1 },
  { size: 5.3, left: 30, duration: 18, delay: 4.0 },
  { size: 2.9, left: 45, duration: 22, delay: 7.6 },
  { size: 4.6, left: 58, duration: 14, delay: 0.9 },
  { size: 3.8, left: 70, duration: 20, delay: 8.5 },
  { size: 5.0, left: 80, duration: 16, delay: 2.4 },
  { size: 2.5, left: 90, duration: 12, delay: 5.0 },
  { size: 4.3, left: 25, duration: 19, delay: 9.8 },
  { size: 3.1, left: 50, duration: 15, delay: 3.2 },
  { size: 5.6, left: 95, duration: 21, delay: 6.5 },
];

function Particles({ color }: { color: "red" | "blue" }) {
  const particles = PARTICLE_DATA.map((p, i) => (
    <div
      key={i}
      className={`particle particle-${color}`}
      style={{
        width: `${p.size}px`,
        height: `${p.size}px`,
        left: `${p.left}%`,
        animationDuration: `${p.duration}s`,
        animationDelay: `${p.delay}s`,
      }}
    />
  ));
  return <div className="particles-container">{particles}</div>;
}

// ──────── Red World (Hero / Landing) ────────
function RedWorld({
  onEnterUpsideDown,
}: {
  onEnterUpsideDown: () => void;
}) {
  return (
    <div className="hero-section">
      <h1 className="hero-name" id="hero-name">
        Yashi
      </h1>
      <p className="hero-tagline" id="hero-tagline">
        Computer Science Student · Aspiring Software Engineer
      </p>

      <div className="hero-intro" id="hero-intro">
        <p>
          Welcome to my world. I&apos;m a passionate computer science student
          driven by curiosity and the desire to build impactful software. From
          crafting elegant algorithms to designing immersive user experiences, I
          thrive at the intersection of creativity and technology. Currently
          exploring full-stack development, machine learning, and everything in
          between.
        </p>
      </div>

      <div className="hero-buttons">
        <a href="#resume" className="btn-red" id="btn-view-resume">
          <span>📄</span> View Resume
        </a>
        <a href="#projects" className="btn-red" id="btn-projects">
          <span>🚀</span> Projects
        </a>
        <a href="#contact" className="btn-red" id="btn-contact">
          <span>✉️</span> Contact
        </a>
      </div>

      <button
        className="upside-down-btn"
        onClick={onEnterUpsideDown}
        id="btn-enter-upside-down"
        aria-label="Enter the Upside Down - View full resume and projects"
      >
        <span style={{ fontSize: "1.3em" }}>⚡</span>
        Enter the Upside Down
        <span style={{ fontSize: "1.3em" }}>⚡</span>
      </button>
    </div>
  );
}

// ──────── Blue World Navigation ────────
function BlueNav({ onReturn }: { onReturn: () => void }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="blue-nav" role="navigation" aria-label="Resume navigation">
      <button className="nav-link" onClick={() => scrollTo("skills")}>
        Skills
      </button>
      <button className="nav-link" onClick={() => scrollTo("experience")}>
        Experience
      </button>
      <button className="nav-link" onClick={() => scrollTo("projects")}>
        Projects
      </button>
      <button className="nav-link" onClick={() => scrollTo("education")}>
        Education
      </button>
      <button className="nav-link" onClick={() => scrollTo("contact")}>
        Contact
      </button>
      <button
        className="nav-link"
        onClick={onReturn}
        style={{ color: "#f87171" }}
      >
        ↩ Return
      </button>
    </nav>
  );
}

// ──────── Reveal on Scroll Hook ────────
function useRevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-section");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// ──────── Blue World (Full Resume) ────────
function BlueWorld({ onReturn }: { onReturn: () => void }) {
  useRevealOnScroll();

  return (
    <>
      <BlueNav onReturn={onReturn} />

      <div className="blue-content">
        {/* Header */}
        <div className="glass-card blue-header-card reveal-section">
          <h1 className="hero-name" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "0.5rem" }}>
            Yashi
          </h1>
          <p
            className="hero-tagline"
            style={{ color: "var(--blue-accent)", marginBottom: "1rem" }}
          >
            Computer Science Student · Aspiring Software Engineer
          </p>
          <p
            style={{
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.7",
              fontSize: "0.95rem",
            }}
          >
            You&apos;ve entered the Upside Down. Here lies my full journey
            — skills forged, projects built, and experiences gained in my
            quest to become a software engineer.
          </p>
        </div>

        {/* ──── Skills Section ──── */}
        <section id="skills" className="reveal-section" aria-label="Technical Skills">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-grid">
            <div className="glass-card">
              <h3 className="skill-category-title">Languages</h3>
              <div className="skill-tags">
                {["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL", "HTML/CSS"].map(
                  (s) => (
                    <span key={s} className="skill-tag">{s}</span>
                  )
                )}
              </div>
            </div>
            <div className="glass-card">
              <h3 className="skill-category-title">Frameworks & Libraries</h3>
              <div className="skill-tags">
                {["React", "Next.js", "Node.js", "Express", "TailwindCSS", "Flask", "Django"].map(
                  (s) => (
                    <span key={s} className="skill-tag">{s}</span>
                  )
                )}
              </div>
            </div>
            <div className="glass-card">
              <h3 className="skill-category-title">Tools & Platforms</h3>
              <div className="skill-tags">
                {["Git", "Docker", "AWS", "Firebase", "MongoDB", "PostgreSQL", "Linux", "VS Code"].map(
                  (s) => (
                    <span key={s} className="skill-tag">{s}</span>
                  )
                )}
              </div>
            </div>
            <div className="glass-card">
              <h3 className="skill-category-title">Concepts</h3>
              <div className="skill-tags">
                {["Data Structures", "Algorithms", "REST APIs", "Machine Learning", "Agile", "CI/CD"].map(
                  (s) => (
                    <span key={s} className="skill-tag">{s}</span>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* ──── Experience Section ──── */}
        <section id="experience" className="reveal-section" aria-label="Experience">
          <h2 className="section-title">Experience</h2>

          <div className="glass-card experience-card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Software Engineering Intern</h3>
                <p className="card-subtitle">Tech Company Inc.</p>
              </div>
              <span className="card-date">Jun 2026 — Aug 2026</span>
            </div>
            <div className="card-description">
              <ul>
                <li>
                  Developed and deployed RESTful APIs serving 10,000+ daily
                  requests using Node.js and Express
                </li>
                <li>
                  Collaborated with cross-functional teams to redesign the user
                  dashboard, improving engagement by 35%
                </li>
                <li>
                  Implemented automated testing pipelines reducing bug reports by
                  40%
                </li>
              </ul>
              <div className="tech-stack">
                {["Node.js", "React", "PostgreSQL", "Docker", "Jest"].map((t) => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card experience-card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Web Development Lead</h3>
                <p className="card-subtitle">University CS Club</p>
              </div>
              <span className="card-date">Sep 2025 — Present</span>
            </div>
            <div className="card-description">
              <ul>
                <li>
                  Led a team of 8 developers to build and maintain the club&apos;s
                  website and internal tools
                </li>
                <li>
                  Organized weekly workshops on modern web technologies, training
                  50+ students
                </li>
                <li>
                  Architected a project management dashboard using Next.js and
                  Firebase
                </li>
              </ul>
              <div className="tech-stack">
                {["Next.js", "Firebase", "TypeScript", "TailwindCSS"].map((t) => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* ──── Projects Section ──── */}
        <section id="projects" className="reveal-section" aria-label="Projects">
          <h2 className="section-title">Projects</h2>

          <div className="glass-card experience-card">
            <div className="card-header">
              <div>
                <h3 className="card-title">AI Study Companion</h3>
                <p className="card-subtitle">Full-Stack AI Application</p>
              </div>
              <span className="card-date">2026</span>
            </div>
            <div className="card-description">
              <p>
                An intelligent study assistant powered by GPT-4 that generates
                personalized quizzes, flashcards, and summaries from uploaded
                notes and textbooks. Features real-time progress tracking and
                adaptive difficulty.
              </p>
              <div className="tech-stack">
                {["Python", "Flask", "React", "OpenAI API", "MongoDB"].map((t) => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>
              <div className="project-links">
                <a href="#" className="project-link">
                  🔗 Live Demo
                </a>
                <a href="#" className="project-link">
                  💻 Source Code
                </a>
              </div>
            </div>
          </div>

          <div className="glass-card experience-card">
            <div className="card-header">
              <div>
                <h3 className="card-title">EcoTrack — Carbon Footprint Tracker</h3>
                <p className="card-subtitle">Mobile-First Web App</p>
              </div>
              <span className="card-date">2025</span>
            </div>
            <div className="card-description">
              <p>
                A gamified sustainability app that tracks daily carbon
                emissions, provides personalized reduction tips, and connects
                users with local environmental initiatives. Achieved 500+ beta
                users.
              </p>
              <div className="tech-stack">
                {["Next.js", "Node.js", "PostgreSQL", "Chart.js", "PWA"].map(
                  (t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  )
                )}
              </div>
              <div className="project-links">
                <a href="#" className="project-link">
                  🔗 Live Demo
                </a>
                <a href="#" className="project-link">
                  💻 Source Code
                </a>
              </div>
            </div>
          </div>

          <div className="glass-card experience-card">
            <div className="card-header">
              <div>
                <h3 className="card-title">CryptoVault — Secure Password Manager</h3>
                <p className="card-subtitle">Security-Focused Desktop App</p>
              </div>
              <span className="card-date">2025</span>
            </div>
            <div className="card-description">
              <p>
                An end-to-end encrypted password manager with biometric
                authentication, secure sharing, and breach detection alerts.
                Built with a zero-knowledge architecture.
              </p>
              <div className="tech-stack">
                {["Java", "JavaFX", "AES-256", "SQLite", "Bcrypt"].map((t) => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>
              <div className="project-links">
                <a href="#" className="project-link">
                  💻 Source Code
                </a>
              </div>
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* ──── Education Section ──── */}
        <section id="education" className="reveal-section" aria-label="Education">
          <h2 className="section-title">Education</h2>

          <div className="glass-card">
            <div className="education-card">
              <div className="edu-icon">🎓</div>
              <div className="edu-details">
                <h3 className="card-title">
                  Bachelor of Science in Computer Science
                </h3>
                <p className="card-subtitle">University Name</p>
                <span className="card-date">Expected Graduation: May 2027</span>
                <div className="card-description" style={{ marginTop: "0.75rem" }}>
                  <ul>
                    <li>GPA: 3.8/4.0 — Dean&apos;s List</li>
                    <li>
                      Relevant Coursework: Data Structures &amp; Algorithms,
                      Operating Systems, Database Systems, Machine Learning,
                      Software Engineering, Computer Networks
                    </li>
                    <li>
                      Activities: CS Club (Web Dev Lead), Hackathon Club,
                      Teaching Assistant for Intro to Programming
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* ──── Contact Section ──── */}
        <section id="contact" className="reveal-section" aria-label="Contact Information">
          <h2 className="section-title">Contact</h2>

          <div className="glass-card">
            <div className="contact-grid">
              <a href="mailto:yashi@example.com" className="contact-item" id="contact-email">
                <span className="contact-icon">📧</span>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">yashi@example.com</div>
                </div>
              </a>
              <a
                href="https://github.com/yashi"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
                id="contact-github"
              >
                <span className="contact-icon">🐙</span>
                <div>
                  <div className="contact-label">GitHub</div>
                  <div className="contact-value">github.com/yashi</div>
                </div>
              </a>
              <a
                href="https://linkedin.com/in/yashi"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
                id="contact-linkedin"
              >
                <span className="contact-icon">💼</span>
                <div>
                  <div className="contact-label">LinkedIn</div>
                  <div className="contact-value">linkedin.com/in/yashi</div>
                </div>
              </a>
              <a href="#" className="contact-item" id="contact-portfolio">
                <span className="contact-icon">🌐</span>
                <div>
                  <div className="contact-label">Portfolio</div>
                  <div className="contact-value">yashi.dev</div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Return Button */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <button
            className="btn-blue return-btn"
            onClick={onReturn}
            id="btn-return-to-red"
            aria-label="Return to the red world"
          >
            <span>⚡</span>
            Return to the Surface
            <span>⚡</span>
          </button>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>
            Designed &amp; Built by Yashi · Inspired by Stranger Things ·{" "}
            {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════
//   MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════

export default function Home() {
  const [world, setWorld] = useState<"red" | "blue">("red");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up timeouts
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const triggerTransition = useCallback(
    (targetWorld: "red" | "blue") => {
      if (isTransitioning) return;
      setIsTransitioning(true);

      // At the midpoint of the flicker (1.1s), swap the world
      transitionTimeoutRef.current = setTimeout(() => {
        setWorld(targetWorld);
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 1100);

      // After full transition animation (2.4s), re-enable interaction
      setTimeout(() => {
        setIsTransitioning(false);
      }, 2400);
    },
    [isTransitioning]
  );

  const enterUpsideDown = useCallback(() => {
    triggerTransition("blue");
  }, [triggerTransition]);

  const returnToSurface = useCallback(() => {
    triggerTransition("red");
  }, [triggerTransition]);

  return (
    <div className={`scene-container ${world === "blue" ? "glitch-active" : ""}`}>
      {/* ── Background Layers ── */}
      <div
        className={`bg-layer bg-red ${world === "red" ? "active" : "inactive"}`}
        aria-hidden="true"
      />
      <div
        className={`bg-layer bg-blue ${world === "blue" ? "active" : "inactive"}`}
        aria-hidden="true"
      />

      {/* ── Cinematic Overlays ── */}
      <div
        className={`overlay-gradient-red ${world === "blue" ? "inactive" : ""}`}
        style={{ opacity: world === "red" ? 1 : 0 }}
        aria-hidden="true"
      />
      <div
        className={`overlay-gradient-blue ${world === "red" ? "inactive" : ""}`}
        style={{ opacity: world === "blue" ? 1 : 0 }}
        aria-hidden="true"
      />

      {/* ── Atmospheric Effects ── */}
      <div className="fog-layer" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="glitch-overlay" aria-hidden="true" />

      {/* ── Particles ── */}
      <Particles color={world} />

      {/* ── Transition Flicker Overlay ── */}
      <div
        className={`transition-overlay ${isTransitioning ? "active" : ""}`}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="content-wrapper">
        {/* Red World */}
        <div
          className={`world-red ${world !== "red" ? "hidden-world" : ""}`}
          role="region"
          aria-label="Welcome section"
        >
          <RedWorld onEnterUpsideDown={enterUpsideDown} />
        </div>

        {/* Blue World */}
        <div
          className={`world-blue ${world !== "blue" ? "hidden-world" : ""}`}
          role="region"
          aria-label="Resume details"
        >
          {world === "blue" && <BlueWorld onReturn={returnToSurface} />}
        </div>
      </div>
    </div>
  );
}
