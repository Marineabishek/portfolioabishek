import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Cloud,
  Code2,
  Layers3,
  Menu,
  Server,
  Terminal,
  X,
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
  { number: "04", label: "Reliable delivery" },
];

const projects = [
  {
    number: "01",
    category: "FULL-STACK · PRODUCT",
    title: "Full-stack web apps",
    description:
      "React experiences backed by Python APIs and PostgreSQL data models.",
    stack: ["React", "Python", "PostgreSQL"],
    tone: "project-card--lime",
    icon: Layers3,
  },
  {
    number: "02",
    category: "DEVOPS · DELIVERY",
    title: "Reliable deployments",
    description:
      "Containerized services and delivery workflows built to make shipping repeatable.",
    stack: ["Docker", "GitHub Actions", "AWS"],
    tone: "project-card--plum",
    icon: Terminal,
  },
  {
    number: "03",
    category: "BACKEND · DATA",
    title: "Thoughtful API services",
    description:
      "Clear service boundaries and dependable data storage for products that can grow.",
    stack: ["FastAPI", "PostgreSQL", "REST"],
    tone: "project-card--blue",
    icon: Server,
  },
];

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

    try {
      const response = await fetch("/api/contact", {
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
            {projects.map((project) => {
              const ProjectIcon = project.icon;
              return (
                <article className={`project-card ${project.tone}`} key={project.number} data-reveal>
                  <div className="project-topline">
                    <span>{project.category}</span>
                    <span>{project.number}</span>
                  </div>
                  <div className="project-art" aria-hidden="true">
                    <div className="art-window">
                      <div className="art-dots"><i /><i /><i /></div>
                      <ProjectIcon size={34} strokeWidth={1.4} />
                      <div className="art-bars"><i /><i /><i /></div>
                    </div>
                    <span className="art-spark">✳</span>
                  </div>
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tag-row">
                      {project.stack.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </div>
                </article>
              );
            })}
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
              <a className="contact-email" href="#contact-form">
                Use the contact form <ArrowUpRight size={16} />
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
              {status === "error" && <p className="form-feedback form-feedback--error" role="alert">Couldn&apos;t send your message. Please try again or email me directly.</p>}
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
