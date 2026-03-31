import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'

function Home() {
  // 1. Session Persistence: Loader runs only once per session
  const [showLoader, setShowLoader] = useState(() => !sessionStorage.getItem('loader-finished'))
  const [appVisible, setAppVisible] = useState(() => !!sessionStorage.getItem('loader-finished'))
  const [progress, setProgress] = useState(0)
  
  const [currentTime, setCurrentTime] = useState('08:44:59')
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  
  const loaderRef = useRef(null)
  const appRef = useRef(null)
  const cardsRef = useRef([])
  const pagesRef = useRef([])
  const navigate = useNavigate()

  // --- GSAP LOADER LOGIC ---
  useEffect(() => {
    if (!showLoader) return

    // gsap.context handles cleanup automatically for React Strict Mode
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('loader-finished', 'true')
          setShowLoader(false)
          setAppVisible(true)
          document.body.classList.remove('loading')
          document.body.classList.add('loaded')
        }
      })

      const counter = { val: 0 }
      
      // Animate the number 0 -> 100
      tl.to(counter, {
        val: 100,
        duration: 1.8,
        ease: "power3.inOut",
        onUpdate: () => setProgress(Math.floor(counter.val))
      })

      // Fade out loader screen
      tl.to(loaderRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
      }, "+=0.2")

    }, loaderRef)

    document.body.classList.add('loading')
    return () => ctx.revert() // Important: stops loops on unmount
  }, [showLoader])

  // --- CLOCK & THEME ---
  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date().toLocaleTimeString())
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  // --- GALLERY LOGIC ---
  const COLLAPSED_WIDTH = 75
  const EXPANDED_WIDTH = 320

  const collapseAll = () => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return
      card.classList.remove('active')
      gsap.to(card, {
        width: COLLAPSED_WIDTH,
        scale: 1,
        opacity: 0.6,
        boxShadow: '0 0 0 rgba(0,0,0,0)',
        duration: 0.4,
        ease: 'power2.out',
      })
      const span = card.querySelector('span')
      if (span) gsap.to(span, { rotate: -90, duration: 0.4 })
    })
    pagesRef.current.forEach((p) => p?.setAttribute('data-active', 'false'))
  }

  const handleCardClick = (index, route, e) => {
    const card = cardsRef.current[index]
    if (!card) return
    const isActive = card.classList.contains('active')

    if (!isActive) {
      collapseAll()
      card.classList.add('active')
      pagesRef.current[index]?.setAttribute('data-active', 'true')

      gsap.to(card, {
        width: EXPANDED_WIDTH,
        scale: 1.05,
        opacity: 1,
        boxShadow: '0 25px 60px rgba(0,0,0,0.45)',
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      })

      const span = card.querySelector('span')
      if (span) gsap.to(span, { rotate: 0, duration: 0.6 })
      card.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    } else {
      navigate(route) // Only navigate if card is already expanded
    }
  }

  // Click outside to collapse
  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedInside = cardsRef.current.some((card) => card && card.contains(e.target))
      if (!clickedInside) collapseAll()
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [appVisible])

  return (
    <>
      {showLoader && (
        <div
          ref={loaderRef}
          className="fixed inset-0 bg-[#1A1A1A] grid place-items-center z-[9999]"
        >
          <div className="text-[64px] tracking-[4px] text-white font-light font-mono">
            {progress}
          </div>
        </div>
      )}
      
      <div
        ref={appRef}
        className="min-h-screen flex flex-col transition-opacity duration-1000 ease-in-out"
        style={{ opacity: appVisible ? 1 : 0 }}
      >
        <header className="flex justify-center items-center p-[40px_50px] relative">
          <div className="text-[32px] font-bold tracking-[2px] text-[#c0c0c0] absolute left-[50px] font-satoshi">
            KARERU <br />
            <div className="text-[14px] font-normal tracking-[1px] mt-1 text-[#888] font-mono">
              <span>{currentTime}</span>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-[20px_50px] overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-none">
            <div className="flex gap-[10px] items-center p-0 min-w-min">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  ref={(el) => (pagesRef.current[i] = el)}
                  className="page bg-[#666] cursor-pointer flex-shrink-0 w-[3px] h-[15px] transition-all duration-[600ms] ease-[cubic-bezier(.22,.61,.36,1)]"
                  data-theme={theme}
                  data-active="false"
                ></div>
              ))}
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={`absolute right-[50px] bg-transparent border-none cursor-pointer flex items-center justify-center w-10 h-10 transition-transform duration-300 ease-in-out hover:scale-110 ${theme === 'light' ? 'text-black' : 'text-white'}`}
          >
            {/* SVGs (truncated for brevity, keep your original ones here) */}
            <svg className={`absolute w-6 h-6 stroke-current fill-none transition-all duration-300 ${theme === 'light' ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            <svg className={`absolute w-6 h-6 stroke-current fill-none transition-all duration-300 ${theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
          </button>
        </header>

        <div className="flex-1 flex items-center justify-center p-[20px_50px] overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-none">
          <div className="flex gap-[15px] items-center w-fit">
            {[
              { label: 'Me', route: '/about', color: 'from-[#494848] to-[#b6b6b6]' },
              { label: 'Builds', route: '/projects', color: 'from-[#891b1b] to-[#b6b6b6]' },
              { label: 'Connect', route: '/contact', color: 'from-[#09574f] to-[#b6b6b6]' },
            ].map((item, i) => (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                onClick={(e) => handleCardClick(i, item.route, e)}
                className={`gallery-item w-[75px] h-[230px] bg-gradient-to-b ${item.color} rounded-[14px] cursor-pointer overflow-hidden relative flex-shrink-0 transition-all duration-[550ms] ease-[cubic-bezier(.22,.61,.36,1)] data-[theme=light]:bg-[#ddd]`}
                data-theme={theme}
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[18px] font-semibold tracking-[2px] rotate-[-90deg] origin-center whitespace-nowrap text-white font-inter transition-transform duration-[550ms] ease-[cubic-bezier(.22,.61,.36,1)]">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="flex justify-between p-[40px_50px] text-[12px] tracking-[1px] mt-auto">
          <div className="flex flex-col items-start gap-[5px]">
            <a href="https://linkedin.com/..." target="_blank" className="text-[#888] no-underline hover:text-white transition-colors" data-theme={theme}>
              LINKEDIN <span className="arrow opacity-0 transition-opacity group-hover:opacity-100">↗</span>
            </a>
            <a href="https://github.com/..." target="_blank" className="text-[#888] no-underline hover:text-white transition-colors" data-theme={theme}>
              GITHUB <span className="arrow opacity-0 transition-opacity group-hover:opacity-100">↗</span>
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home