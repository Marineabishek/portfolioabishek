import { useEffect, useState, type FormEvent } from "react";
import {
  Activity,
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers3,
  Menu,
  Server,
  ShieldCheck,
  Terminal,
  X,
  Zap,
} from "lucide-react";

const skills = [
  { icon: Code2, title: "Frontend", items: "React · TypeScript · UI systems" },
  { icon: Server, title: "Backend", items: "Python · FastAPI · PostgreSQL" },
  { icon: Cloud, title: "Cloud & DevOps", items: "Docker · CI/CD · AWS" },
];

const heroFocus = [
  { number: "01", label: "Full-stack apps" },
  { number: "02", label: "Python APIs" },
  { number: "03", label: "Cloud & DevOps" },
  { number: "04", label: "SEO & Performance" },
];

function FullStackFlowArt() {
  return (
    <div className="flow-art fullstack-flow">
      <div className="flow-badge">
        <span className="flow-pulse-dot" /> CLIENT · API · DATABASE SYNCHRONIZATION
      </div>
      <div className="flow-diagram">
        <div className="tier-box tier-box--client">
          <div className="tier-header">
            <span className="mac-dots"><i /><i /><i /></span>
            <span className="tier-label">React Client</span>
          </div>
          <div className="tier-body">
            <div className="micro-input">
              <span>contact.submit()</span>
            </div>
            <div className="tier-pill tier-pill--react">State: Synced</div>
          </div>
        </div>

        <div className="conduit-channel">
          <div className="conduit-wire" />
          <div className="packet packet--req">POST</div>
          <div className="packet packet--res">201 OK</div>
        </div>

        <div className="tier-box tier-box--api">
          <div className="tier-header">
            <Server size={10} />
            <span className="tier-label">FastAPI API</span>
          </div>
          <div className="tier-body">
            <div className="micro-code">
              <code>Pydantic · Async</code>
            </div>
            <div className="tier-pill tier-pill--api">Engine: Active</div>
          </div>
        </div>

        <div className="conduit-channel">
          <div className="conduit-wire" />
          <div className="packet packet--db-write">INSERT</div>
          <div className="packet packet--db-ack">COMMIT</div>
        </div>

        <div className="tier-box tier-box--db">
          <div className="tier-header">
            <Database size={10} />
            <span className="tier-label">PostgreSQL</span>
          </div>
          <div className="tier-body">
            <div className="db-stack">
              <span className="db-disc" />
              <span className="db-disc" />
              <span className="db-disc" />
            </div>
            <div className="tier-pill tier-pill--db">ACID Safe</div>
          </div>
        </div>
      </div>

      <div className="flow-footer-stats">
        <span><Zap size={10} /> 8ms round-trip</span>
        <span className="dot-sep">·</span>
        <span>Bi-directional Data Stream</span>
        <span className="dot-sep">·</span>
        <span className="badge-live">CONNECTED</span>
      </div>
    </div>
  );
}

function DeploymentFlowArt() {
  return (
    <div className="flow-art deployment-flow">
      <div className="flow-badge">
        <span className="flow-pulse-dot" /> CONTINUOUS INTEGRATION & ZERO-DOWNTIME ROLLOUT
      </div>
      <div className="pipeline-track">
        <div className="pipeline-node pipeline-node--1">
          <div className="node-icon-box">
            <GitBranch size={13} />
          </div>
          <strong>Git Push</strong>
          <small>main @ 9a4f</small>
          <span className="pipeline-connector" />
        </div>

        <div className="pipeline-node pipeline-node--2">
          <div className="node-icon-box">
            <Cpu size={13} />
          </div>
          <strong>Container</strong>
          <small>Docker 16-alpine</small>
          <span className="pipeline-connector" />
        </div>

        <div className="pipeline-node pipeline-node--3">
          <div className="node-icon-box">
            <CheckCircle2 size={13} />
          </div>
          <strong>Test Suite</strong>
          <small>100% Passed</small>
          <span className="pipeline-connector" />
        </div>

        <div className="pipeline-node pipeline-node--4">
          <div className="node-icon-box">
            <Cloud size={13} />
          </div>
          <strong>AWS Cloud</strong>
          <small>Live Production</small>
        </div>
      </div>

      <div className="telemetry-bar">
        <div className="telemetry-item">
          <Activity size={11} className="heartbeat-pulse-icon" />
          <span>CLUSTER STATUS</span>
        </div>
        <div className="telemetry-wave">
          <svg viewBox="0 0 100 18" className="heartbeat-svg" preserveAspectRatio="none">
            <path
              d="M0,9 L25,9 L30,2 L37,16 L43,5 L48,12 L53,9 L100,9"
              fill="none"
              stroke="#d8b8e4"
              strokeWidth="1.8"
            />
          </svg>
        </div>
        <div className="telemetry-uptime">UPTIME: 99.99%</div>
      </div>
    </div>
  );
}

function ApiServicesArt() {
  return (
    <div className="flow-art api-flow">
      <div className="flow-badge">
        <span className="flow-pulse-dot" /> MICROSERVICES & ASYNC REQUEST ROUTING
      </div>
      <div className="api-console">
        <div className="api-shield-row">
          <div className="shield-tag">
            <ShieldCheck size={11} />
            <span>CORS & Rate Guard</span>
          </div>
          <div className="shield-tag">
            <Zap size={11} />
            <span>Pydantic Schema Validation</span>
          </div>
          <div className="shield-tag shield-tag--latency">
            <span>⚡ 12ms Response</span>
          </div>
        </div>

        <div className="api-request-card">
          <div className="request-meta">
            <span className="req-method">POST</span>
            <span className="req-endpoint">/api/contact</span>
            <span className="req-status">201 CREATED</span>
          </div>
          <div className="request-body-preview">
            <span className="json-brace">&#123;</span>
            <span className="json-key">&quot;status&quot;:</span> <span className="json-val">&quot;received&quot;</span>,
            <span className="json-key"> &quot;db_committed&quot;:</span> <span className="json-bool">true</span>,
            <span className="json-key"> &quot;mail_dispatched&quot;:</span> <span className="json-bool">true</span>
            <span className="json-brace">&#125;</span>
          </div>
        </div>
      </div>

      <div className="flow-footer-stats">
        <span>Async Pool</span>
        <span className="dot-sep">·</span>
        <span>SQLAlchemy 2.0</span>
        <span className="dot-sep">·</span>
        <span className="badge-live badge-live--cyan">HIGH THROUGHPUT</span>
      </div>
    </div>
  );
}

function SeoOptimizationArt() {
  return (
    <div className="flow-art seo-flow">
      <div className="flow-badge">
        <span className="flow-pulse-dot" /> SEARCH ENGINE CRAWLER & WEB VITALS
      </div>

      <div className="seo-preview-grid">
        <div className="serp-preview">
          <div className="serp-radar-beam" />
          <div className="serp-meta">
            <div className="serp-site-icon">AS</div>
            <div className="serp-domain">abishek.dev <span className="slash">›</span> portfolio</div>
            <span className="serp-index-tag">Indexed</span>
          </div>
          <div className="serp-headline">Abishek Seenivasan — Full-Stack & DevOps Developer</div>
          <div className="serp-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-val">5.0</span>
            <span className="rating-desc">· Verified Portfolio</span>
          </div>
          <div className="serp-description">
            Building reliable full-stack applications with React interfaces, dependable Python APIs, and cloud infrastructure.
          </div>
        </div>

        <div className="vitals-panel">
          <div className="lighthouse-circle">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle-score"
                strokeDasharray="100, 100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.5" className="circle-text">100</text>
            </svg>
            <span className="score-title">PERFORMANCE</span>
          </div>

          <div className="vitals-pills">
            <div className="v-pill">
              <span className="v-pill-name">LCP</span>
              <strong className="v-pill-val">0.6s</strong>
            </div>
            <div className="v-pill">
              <span className="v-pill-name">FID</span>
              <strong className="v-pill-val">10ms</strong>
            </div>
            <div className="v-pill">
              <span className="v-pill-name">CLS</span>
              <strong className="v-pill-val">0.00</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="flow-footer-stats">
        <span>Semantic HTML</span>
        <span className="dot-sep">·</span>
        <span>Schema.org JSON-LD</span>
        <span className="dot-sep">·</span>
        <span className="badge-live badge-live--amber">RANK #1 READY</span>
      </div>
    </div>
  );
}

const projects = [
  {
    number: "01",
    category: "FULL-STACK · PRODUCT",
    title: "Full-stack web apps",
    description:
      "React user interfaces connected to asynchronous Python FastAPI backends and persistent PostgreSQL databases.",
    stack: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
    tone: "project-card--lime",
    art: <FullStackFlowArt />,
  },
  {
    number: "02",
    category: "DEVOPS · DELIVERY",
    title: "Reliable deployments",
    description:
      "Automated CI/CD pipelines, containerized Docker microservices, and zero-downtime rolling cloud deployments.",
    stack: ["Docker", "GitHub Actions", "AWS", "CI/CD"],
    tone: "project-card--plum",
    art: <DeploymentFlowArt />,
  },
  {
    number: "03",
    category: "BACKEND · DATA",
    title: "Thoughtful API services",
    description:
      "Microservice boundaries, strict Pydantic type validation, database connection pooling, and sub-15ms response times.",
    stack: ["FastAPI", "SQLAlchemy", "PostgreSQL", "REST"],
    tone: "project-card--blue",
    art: <ApiServicesArt />,
  },
  {
    number: "04",
    category: "DISCOVERY · PERFORMANCE",
    title: "SEO & Web Performance",
    description:
      "Semantic architecture, Schema.org rich snippets, OpenGraph discovery, and perfect 100/100 Core Web Vitals.",
    stack: ["Semantic HTML", "Schema.org", "OpenGraph", "Core Web Vitals", "Lighthouse 100"],
    tone: "project-card--amber",
    art: <SeoOptimizationArt />,
  },
];

const RAW_API_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = RAW_API_URL ? RAW_API_URL.replace(/\/+$/, "") : "";
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "abishek.s2606@gmail.com";

type ContactStatus = "idle" | "sending" | "sent" | "error";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<ContactStatus>("idle");

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const supportsObserver = "IntersectionObserver" in window;

    if (!supportsObserver) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -35px 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    function updateProgress() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollableHeight = root.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
        root.style.setProperty("--scroll-progress", `${progress}%`);
      });
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener("scroll", updateProgress);
      cancelAnimationFrame(frame);
    };
  }, []);

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    const formData = new FormData(form);
    const message = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/contact` : "/api/contact";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        throw new Error("The message could not be sent.");
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Abishek, home">
          AS<span>.</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? "main-nav main-nav--open" : "main-nav"}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#stack" onClick={closeMenu}>Stack</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>
            Let&apos;s talk <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div
            className="hero-visual"
            role="img"
            aria-label="Portrait of Abishek Seenivasan"
          >
            <div className="portrait-backdrop" aria-hidden="true" />
            <div className="portrait-frame">
              <div className="portrait-placeholder">
                <span>AS</span>
                <small>YOUR PHOTO<br />GOES HERE</small>
              </div>
              <img
                className="portrait-image"
                src="/profile.png"
                alt=""
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> FULL-STACK · DEVOPS</p>
            <h1>
              Full-stack
              <br />
              <span className="headline-accent">DevOps</span>
              <br />
              Developer<span className="yellow-period">.</span>
            </h1>
          </div>
          <div className="hero-aside">
            <h2>From the first idea<br />to <span>production.</span></h2>
            <p className="hero-description">
              I&apos;m Abishek. I build clear React interfaces, dependable Python
              APIs, and the cloud workflows that bring them to life.
            </p>
            <div className="hero-actions">
              <a className="button button--yellow" href="#work">
                Explore my work <ArrowDownRight size={17} />
              </a>
              <a className="text-link" href="#contact">
                Get in touch <ArrowRight size={15} />
              </a>
            </div>
          </div>
          <div className="hero-focus-row">
            {heroFocus.map((item, index) => (
              <div className={`hero-focus-item hero-focus-item--${index + 1}`} key={item.number}>
                <span>{item.number}</span>
                <strong>{item.label}</strong>
              </div>
            ))}
          </div>
          <a className="scroll-cue" href="#about" aria-label="Scroll to about">
            <span>SCROLL TO EXPLORE</span><ArrowDown size={14} />
          </a>
        </section>

        <section className="intro-section section-wrap" id="about">
          <div className="section-kicker" data-reveal><span>01</span> A LITTLE ABOUT ME</div>
          <div className="intro-content" data-reveal>
            <h2>
              I like making the complex feel <span>simple.</span>
            </h2>
            <p>
              From a crisp interface to a resilient deployment, I enjoy working
              across the stack. I bring product thinking, solid engineering, and
              a healthy respect for the details that make software dependable.
            </p>
            <a className="text-link" href="#contact">A bit more about me <ArrowRight size={15} /></a>
          </div>
          <div className="intro-aside" data-reveal>
            <span className="aside-mark">✳</span>
            <p>One developer.<br />End-to-end thinking.</p>
          </div>
        </section>

        <section className="work-section section-wrap" id="work">
          <div className="section-heading" data-reveal>
            <div>
              <div className="section-kicker"><span>02</span> WHAT I CAN BUILD</div>
              <h2>From idea to <span>production.</span></h2>
            </div>
            <p>Product engineering across interfaces, APIs, data, and delivery.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card ${project.tone}`} key={project.number} data-reveal>
                <div className="project-topline">
                  <span>{project.category}</span>
                  <span>{project.number}</span>
                </div>
                <div className="project-art" aria-hidden="true">
                  {project.art}
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">
                    {project.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="stack-section section-wrap" id="stack">
          <div className="stack-heading" data-reveal>
            <div className="section-kicker"><span>03</span> MY TOOLKIT</div>
            <h2>The right tools<br />for <span>the job.</span></h2>
            <p>Practical, proven tools to take an idea from first commit to production.</p>
          </div>
          <div className="skill-list">
            <div className="tech-orbit" aria-label="Animated showcase of my technologies" data-reveal>
              <div className="tech-orbit-ring tech-orbit-ring--outer" aria-hidden="true" />
              <div className="tech-orbit-ring tech-orbit-ring--inner" aria-hidden="true" />
              <div className="tech-orbit-core" aria-hidden="true">
                <Code2 size={25} strokeWidth={1.5} />
                <span>MY STACK</span>
              </div>
              <span className="tech-chip tech-chip--react">React</span>
              <span className="tech-chip tech-chip--typescript">TypeScript</span>
              <span className="tech-chip tech-chip--python">Python</span>
              <span className="tech-chip tech-chip--fastapi">FastAPI</span>
              <span className="tech-chip tech-chip--postgres">PostgreSQL</span>
              <span className="tech-chip tech-chip--docker">Docker</span>
              <span className="tech-chip tech-chip--aws">AWS</span>
              <span className="tech-chip tech-chip--cicd">CI / CD</span>
            </div>
            {skills.map((skill, index) => {
              const SkillIcon = skill.icon;
              return (
                <div className="skill-row" key={skill.title} data-reveal>
                  <span className="skill-number">0{index + 1}</span>
                  <span className="skill-icon"><SkillIcon size={19} strokeWidth={1.6} /></span>
                  <div className="skill-copy">
                    <h3>{skill.title}</h3>
                    <p>{skill.items}</p>
                  </div>
                  <ArrowUpRight className="skill-arrow" size={18} />
                </div>
              );
            })}
            <div className="stack-footnote"><span>+</span> Always learning. Always shipping.</div>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-orb" aria-hidden="true" />
          <div className="section-kicker" data-reveal><span>04</span> YOUR MOVE</div>
          <div className="contact-layout" data-reveal>
            <div className="contact-copy">
              <h2>Have a good<br />one in <span>mind?</span></h2>
              <p>Have a project, an opportunity, or just want to say hi? I&apos;d love to hear from you.</p>
              <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL} <ArrowUpRight size={16} />
              </a>
            </div>
            <form className="contact-form" id="contact-form" onSubmit={handleContactSubmit}>
              <label>
                <span>YOUR NAME</span>
                <input name="name" type="text" placeholder="How should I call you?" required maxLength={120} />
              </label>
              <label>
                <span>EMAIL ADDRESS</span>
                <input name="email" type="email" placeholder="you@example.com" required maxLength={254} />
              </label>
              <label>
                <span>A LITTLE ABOUT IT</span>
                <textarea name="message" rows={3} placeholder="Tell me what's on your mind..." required maxLength={5000} />
              </label>
              <button className="button button--yellow submit-button" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : status === "sent" ? "Message sent" : "Send a message"}
                {status === "sent" ? <Check size={16} /> : <ArrowUpRight size={16} />}
              </button>
              {status === "sent" && <p className="form-feedback form-feedback--success" role="status">Thanks for reaching out. I&apos;ll be in touch soon.</p>}
              {status === "error" && (
                <p className="form-feedback form-feedback--error" role="alert">
                  Couldn&apos;t send your message. Please try again or email me directly at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--yellow)", textDecoration: "underline" }}>
                    {CONTACT_EMAIL}
                  </a>.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="wordmark" href="#home">AS<span>.</span></a>
        <p>DESIGNED &amp; BUILT WITH INTENTION.</p>
        <a className="footer-contact-link" href="#contact">LET&apos;S CONNECT <ArrowUpRight size={12} /></a>
        <span className="copyright">© 2026 ABISHEK SEENIVASAN</span>
      </footer>
    </>
  );
}

export default App;
