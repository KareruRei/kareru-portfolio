import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger) // this is where we register GSAP's ScrollTrigger plugin

function About() { // this is where the About component starts
  const [currentTime, setCurrentTime] = useState('00:00:00')  // this is where we set up state for current time display
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark') // this is where we set up state for theme (dark/light)
  // this is where we define skills data
  const skillsData = [  
    { title: "Python", img: "python.png", desc: "Projects, scripts, and algorithms" },
    { title: "Java", img: "java.png", desc: "Projects, scripts, and algorithms" },
    { title: "HTML", img: "html.png", desc: "Web pages and layouts" },
    { title: "CSS", img: "css.jpg", desc: "Styling and responsive design" },
    { title: "Javascript", img: "javascript.jpg", desc: "Web interactivity and logic" },
    { title: "React", img: "react.png", desc: "UI components and apps" },
    { title: "Tailwind CSS", img: "tailwind.png", desc: "Utility-first styling" },
    { title: "GSAP", img: "gsap.png", desc: "Animations and effects" },
    { title: "Electronics & Arduino", img: "arduino.png", desc: "Circuits and prototyping" },
  ];
  // this is where we define certifications data
  const certificationsData = [
    { title: "Electronics Foundations: Basic Circuits", img: "linkedin.png", desc: "Skills: Electronics · Circuit Design | Issued: Dec 2025" },
    { title: "Programming Foundations: Databases", img: "linkedin.png", desc: "Skills: Database Development · Databases | Issued: Dec 2025" },
    { title: "Electronics Foundations: Fundamentals", img: "linkedin.png", desc: "Skills: Electronics | Issued: Nov 2025" },
    { title: "Learning Arduino: Foundations", img: "linkedin.png", desc: "Skills: Arduino | Issued: Nov 2025" },
    { title: "Learning Arduino: Interfacing with Hardware", img: "linkedin.png", desc: "Skills: Arduino | Issued: Nov 2025" },
    { title: "Fundamentals of Dynamic Programming", img: "linkedin.png", desc: "Skills: Dynamic Programming | Issued: Oct 2025" },
    { title: "Networking Basics", img: "cisco.png", desc: "Issued: Oct 2025" },
    { title: "Advanced Algorithmic Thinking with Python", img: "linkedin.png", desc: "Skills: Python · Algorithms | Issued: Sep 2025" },
    { title: "Certificate for Notion Essentials Quiz", img: "notion.png", desc: "Issued: Sep 2025 · Expires: Sep 2027" },
    { title: "Foundations of Algorithmic Thinking with Python", img: "linkedin.png", desc: "Skills: Algorithms | Issued: Sep 2025" },
    { title: "Agentblazer Workshop Completion Certificate", img: "trailhead.png", desc: "Issued: Aug 2025" },
    { title: "Python Data Structures: Stacks, Deques, and Queues", img: "linkedin.png", desc: "Skills: Data Structures | Issued: May 2025" },
    { title: "Python: Recursion", img: "linkedin.png", desc: "Skills: Python · Programming | Issued: May 2025" },
    { title: "Transition from Java to Python", img: "linkedin.png", desc: "Skills: Python | Issued: Mar 2025" },
    { title: "Computer Science Principles: Digital Information", img: "linkedin.png", desc: "Skills: Computer Science | Issued: Jan 2025" },
    { title: "Creating a Business Plan", img: "linkedin.png", desc: "Skills: Business Planning | Issued: Jan 2025" },
    { title: "Entrepreneurship: Bootstrapping Your Business", img: "linkedin.png", desc: "Skills: Bootstrapping · Entrepreneurship | Issued: Jan 2025" },
    { title: "Launching Your Creative Business", img: "linkedin.png", desc: "Skills: Launching Start-ups | Issued: Jan 2025" },
    { title: "Running a Design Business: Creative Briefs", img: "linkedin.png", desc: "Skills: Creative Briefs | Issued: Jan 2025" },
    { title: "Running a Design Business: The Staffing Rule Book", img: "linkedin.png", desc: "Skills: Talent Management | Issued: Jan 2025" },
    { title: "Start a Design Business", img: "linkedin.png", desc: "Skills: Graphic Design · Small Business Management · Design | Issued: Jan 2025" },
    { title: "Entrepreneurship Foundations", img: "linkedin.png", desc: "Skills: Entrepreneurship | Issued: Dec 2024" },
    { title: "Explore Emerging Tech", img: "ibm.png", desc: "Issued: Sep 2024" },
    { title: "Master Microsoft Teams", img: "linkedin.png", desc: "Skills: Microsoft Teams | Issued: Sep 2024" },
    { title: "Master Microsoft Teams", img: "apc.png", desc: "Issued: Sep 2024" },
  ];
  // this is where we define hobbies data
  const hobbiesData = [
    { title: "Music Production", img: "music.jpg", desc: "Creating beats and sound design" },
    { title: "Gaming", img: "game.jpg", desc: "Strategy and competitive play" },
    { title: "Reading", img: "books.jpg", desc: "Mangas, Manhwas and a bit of literature" },
    { title: "Photography", img: "photo.jpg", desc: "Visual storytelling" },
  ];
  // this is where we toggle between dark and light themes
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }
  // this is where we set up a timer to update current time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])
  // this is where we apply theme to document root whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
   // this is where we set body scroll behavior for About page
  useEffect(() => {
    document.body.style.overflow = 'auto'
    document.body.style.overflowX = 'hidden'
    return () => {
      document.body.style.overflow = 'hidden'
      document.body.style.overflowX = ''
    }
  }, [])
  // this is where we animate hero, skills, certifications, and hobbies sections using GSAP
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out', duration: 1.2 },
    })
    // this is where we animate hero text and hero visual
    tl.to('.hero-text > *', {
      y: 0,
      opacity: 1,
      stagger: 0.15,
    }).to(
      '.hero-visual',
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
      },
      '-=1'
    )
    // this is where we animate capabilities header
    gsap.to('.skills-header > *', {
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top 80%',
      },
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 0.2,
    })
    // this is where we animate individual skills in infinite scroll
    gsap.to('.infinite-skills .skill', {
      scrollTrigger: {
        trigger: '.infinite-skills',
        start: 'top 75%',
      },
      y: 0,
      opacity: 1,
      stagger: 0.02,
      duration: 0.02,
      ease: 'back.out(0.9)',
    }) 
    // this is where we animate hobbies section
    gsap.to('.hobbies-section .skill', {
      scrollTrigger: {
        trigger: '.hobbies-section',
        start: 'top 85%',
      },
      y: 0,
      opacity: 1,
      stagger: 0.02,
      duration: 0.02,
      ease: 'power3.out',
    })
    // this is where we animate certifications section
    gsap.to('.certifications-section .skill', {
      scrollTrigger: {
        trigger: '.certifications-section',
        start: 'top 85%',
      },
      y: 0,
      opacity: 1,
      stagger: 0.02,
      duration: 0.02,
      ease: 'power3.out',
    })

    
    ScrollTrigger.refresh()
    // this is where we clean up all ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])
  
  return (
    <div className="about-page bg-[#1a1a1a] text-white font-inter min-h-screen flex flex-col data-[theme=light]:bg-[#f5f5f5] data-[theme=light]:text-[#1a1a1a]" data-theme={theme}>
      <header className="flex justify-between items-center p-[40px_50px] fixed w-full top-0 bg-[rgba(26,26,26,0.9)] backdrop-blur-[10px] z-[100] data-[theme=light]:bg-[rgba(245,245,245,0.9)]" data-theme={theme}>
        <div className="text-[32px] font-semibold text-[#c0c0c0] leading-none font-satoshi data-[theme=light]:text-[#333]">
          ABOUT
          <div className="text-[13px] tracking-[1px] mt-2 text-[#777] font-mono">
            <span>{currentTime}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`bg-transparent border-none cursor-pointer flex items-center justify-center w-10 h-10
              transition-transform duration-300 ease-in-out hover:scale-110
              ${theme === 'light' ? 'text-black' : 'text-white'}
            `}
            aria-label="Toggle dark/light mode"
          >
            <svg
              className={`absolute w-6 h-6 stroke-current stroke-2 fill-none stroke-linecap-round stroke-linejoin-round transition-all duration-300 ${
                theme === 'light' ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
              }`}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <svg
              className={`absolute w-6 h-6 stroke-current stroke-2 fill-none stroke-linecap-round stroke-linejoin-round transition-all duration-300 ${
                theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
              }`}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
          <Link
            to="/"
            className="text-white no-underline text-[12px] tracking-[2px] border-b border-white transition-opacity duration-300 ease-in-out hover:opacity-70 data-[theme=light]:text-[#1a1a1a] data-[theme=light]:border-[#1a1a1a]"
            data-theme={theme}
          >
            BACK
          </Link>
        </div>
      </header>

      <main>
        <section className="snap-section hero-section gap-20 p-[150px_50px_120px]">
          <div className="hero-text">
            <span className="block text-[11px] tracking-[3px] text-[#888] mb-[10px] opacity-0 translate-y-[20px]">
              ABOUT ME
            </span>
            <h1 className="text-[clamp(42px,6vw,72px)] leading-[1.05] my-5 font-bold tracking-[-0.02em] opacity-0 translate-y-[20px]">
              Designing & building<br />
              immersive digital<br />
              experiences.
            </h1>
            <p className="max-w-[480px] text-base leading-[1.7] text-[#b5b5b5] opacity-0 translate-y-[20px]">
              I'm Roycee Hugh Lacuesta — a Computer Science student at Asia
              Pacific College with a strong foundation in Python, data
              structures, and core programming principles. I am actively
              involved in academic and organizational leadership.
            </p>
          </div>

          <div className="hero-visual flex justify-end relative opacity-0 scale-95">
            <img
              src="picture.jpg"
              alt="john doe headshot"
              className="w-[280px] md:w-[400px] rounded-full aspect-square object-cover grayscale transition-filter duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
            />
          </div>
        </section>

        <section className="snap-section infinite-skills w-full overflow-hidden py-[100px]">
          <div className="skills-header max-w-[600px] mx-auto mb-[60px] text-center">
            <h2 className="text-[36px] mb-[15px] font-satoshi opacity-0 translate-y-[20px]">
              Capabilities
            </h2>
            <p className="text-[#9a9a9a] leading-[1.6] opacity-0 translate-y-[20px]">
              These are my skills. 
            </p>
          </div>

          <div className="skills-track flex w-max animate-scroll">
            {[...Array(2)].map((_, repeatIndex) =>
              skillsData.map((skill) => (
                <div
                  key={`${skill.title}-${repeatIndex}`}
                  className="skill relative h-[250px] w-[180px] rounded-[50px] border border-[#2a2a2a] text-sm tracking-[1px] text-[#d0d0d0] bg-[#1f1f1f] bg-cover bg-center overflow-hidden transition-all duration-[400ms] ease-in-out flex justify-center items-center opacity-0 translate-y-[20px] hover:-translate-y-2 hover:border-white hover:bg-[#252525] mr-6"
                  style={{ backgroundImage: `url('${skill.img}')` }}
                >
                  <div className="overlay absolute inset-0 bg-[rgba(0,0,0,0.6)] text-white flex flex-col justify-center items-center text-center p-5 opacity-0 transition-opacity duration-300 ease-in-out rounded-[50px] hover:opacity-100">
                    <h1 className="text-xl mb-[10px]">{skill.title}</h1>
                    <small className="leading-[1.4] text-[rgb(196,190,190)]">{skill.desc}</small>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="snap-section certifications-section w-full overflow-hidden py-[120px]">
          <div className="skills-header max-w-[800px] mx-auto mb-[60px] text-center">
            <h2 className="text-[36px] mb-[15px] font-satoshi opacity-0 translate-y-[20px]">
              Certifications
            </h2>
            <p className="text-[#9a9a9a] leading-[1.6] opacity-0 translate-y-[20px]">
              Professional certifications and achievements demonstrating my skills.
            </p>
          </div>

          <div className="w-max flex animate-scroll gap-4 mb-8">
            {[...Array(2)].map((_, repeatIndex) =>
              certificationsData.slice(0, Math.ceil(certificationsData.length / 2)).map((cert) => (
                <div
                  key={`${cert.title}-${repeatIndex}`}
                  className="skill relative inline-flex items-center justify-center px-4 py-3 rounded-xl border border-[#2a2a2a] bg-[#1f1f1f] overflow-hidden opacity-0 translate-y-[20px] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-white"
                >
                  <div className="flex flex-col justify-center items-center text-center gap-1">
                    <img src={cert.img} alt={cert.title} className="w-8 h-8 object-contain" />
                    <h3 className="text-sm font-semibold">{cert.title}</h3>
                    <small className="text-[#c5c5c5] text-[10px]">{cert.desc}</small>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="w-max flex animate-scroll-reverse gap-4 mb-8">
            {[...Array(2)].map((_, repeatIndex) =>
              certificationsData.slice(Math.ceil(certificationsData.length / 2)).map((cert) => (
                <div
                  key={`${cert.title}-b-${repeatIndex}`}
                  className="skill relative inline-flex items-center justify-center px-4 py-3 rounded-xl border border-[#2a2a2a] bg-[#1f1f1f] overflow-hidden opacity-0 translate-y-[20px] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-white"
                >
                  <div className="flex flex-col justify-center items-center text-center gap-1">
                    <img src={cert.img} alt={cert.title} className="w-8 h-8 object-contain" />
                    <h3 className="text-sm font-semibold">{cert.title}</h3>
                    <small className="text-[#c5c5c5] text-[10px]">{cert.desc}</small>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="snap-section hobbies-section w-full py-[120px]">
          <div className="skills-header max-w-[600px] mx-auto mb-[60px] text-center">
            <h2 className="text-[36px] mb-[15px] font-satoshi opacity-0 translate-y-[20px]">
              Hobbies
            </h2>
            <p className="text-[#9a9a9a] leading-[1.6] opacity-0 translate-y-[20px]">
              Interests that fuel creativity beyond academics.
            </p>
          </div>

          <div className="skills-grid">
            {hobbiesData.map((hobby) => (
              <div
                key={hobby.title}
                className="skill relative h-[220px] rounded-2xl border border-[#2a2a2a] bg-[#1f1f1f] overflow-hidden opacity-0 translate-y-[20px] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-white"
                style={{ backgroundImage: `url('${hobby.img}')`, backgroundSize: 'cover' }}
              >
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex flex-col justify-center items-center text-center p-6">
                  <h3 className="text-lg mb-2">{hobby.title}</h3>
                  <small className="text-[#c5c5c5]">{hobby.desc}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <style>{`
        .about-page {
          scroll-behavior: smooth;
          scroll-snap-type: y mandatory;
          overflow-y: hidden;
          overflow-x: hidden;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          width: 100%;
          max-width: 1200px;
        }
        .snap-section {
          height: 90vh;
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .snap-section.hero-section {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          align-items: center;
        }
        .snap-section.skills-section {
          display: flex;         
          flex-direction: column; 
          justify-content: center; 
          align-items: center;   
          gap: 40px;             
          padding: 120px 50px;    
        }
        .snap-section.infinite-gallery {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        @media (max-width: 900px) {
          .about-page {
            scroll-snap-type: none;
          }
          .snap-section {
            min-height: auto;
          }
          .hero-section {
            grid-template-columns: 1fr;
            padding: 150px 25px 80px;
            text-align: center;
          }
          .hero-text p {
            margin: 0 auto;
          }
          .hero-visual {
            justify-content: center;
            margin-top: 40px;
          }
          header {
            padding: 20px 25px;
          }
          .skills-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @keyframes scroll {
          from { transform: translate3d(0,0,0); }
          to { transform: translate3d(-50%,0,0); }
        }
        @keyframes scroll-reverse {
          from { transform: translate3d(-50%,0,0); }
          to { transform: translate3d(0,0,0); }
        }
        /* make marquee smoother and prevent layout jumps */
        .skills-track { will-change: transform; display: flex; }
        .skills-track > * { flex: 0 0 auto; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
        .animate-scroll, .animate-scroll-reverse { animation-timing-function: linear; animation-iteration-count: infinite; will-change: transform; animation-play-state: running; }
        .animate-scroll { animation-name: scroll; animation-duration: 60s; }
        .animate-scroll-reverse { animation-name: scroll-reverse; animation-duration: 60s; }
      `}</style>
    </div>
  )
}

export default About

