import { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

function Projects() {
  const [currentTime, setCurrentTime] = useState('00:00:00')
  const [isAnimating, setIsAnimating] = useState(false)
  const sliderRef = useRef(null)

  const MAX_VISIBLE = 4
  const Y_STEP = -25 
  const Z_STEP = -100 

  const projects = [
    { name: 'Arduino Face Recognition', color: '#950404', bgColor: '#0f0708', link: 'https://github.com/gabbrealz/Arduino_Face_Recognition' },
    { name: 'Campus Marketplace', color: '#7a0303', bgColor: '#0d0607', link: 'https://github.com/KareruRei/Campus_Marketplace' },
    { name: 'Student Management System', color: '#630202', bgColor: '#0a0506', link: 'https://github.com/KareruRei/Student-Management-System' },
    { name: 'Motorcycle Inventory System', color: '#4d0202', bgColor: '#080405', link: 'https://github.com/KareruRei/Motorcycle-Inventory-System' },
    { name: 'Valentine Quest', color: '#3b0101', bgColor: '#050304', link: 'https://github.com/KareruRei/Valentine-s...' },
    { name: 'AgriConnect', color: '#800000', bgColor: '#1F0F12', link: 'https://github.com/KareruRei/AgriConnect' },
    { name: 'Mr. Facilitator', color: '#5C1A1A', bgColor: '#1E1416', link: 'https://github.com/KareruRei/Mr.-Facilitator' },
    { name: 'Direct Clothing', color: '#451A1A', bgColor: '#282020', link: 'https://github.com/KareruRei/DirectClothing' },
    { name: 'Password Manager', color: '#2E1A1A', bgColor: '#202020', link: 'https://github.com/KareruRei/PasswordManager' },
    { name: 'Clearance', color: '#1A1A1A', bgColor: '#141414', link: 'https://karerurei.github.io/Clearance/' },
  ]

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date().toLocaleTimeString())
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const repositionCards = useCallback((cards) => {
    cards.forEach((card, i) => {
      const indexFromEnd = cards.length - 1 - i
      const isVisible = indexFromEnd < MAX_VISIBLE
      const isFront = indexFromEnd === 0
      
      if (isFront) card.classList.add('is-active')
      else card.classList.remove('is-active')

      // Animate the main card body
      gsap.to(card, {
        y: isVisible ? indexFromEnd * Y_STEP : Y_STEP * MAX_VISIBLE,
        z: isVisible ? indexFromEnd * Z_STEP : Z_STEP * MAX_VISIBLE,
        opacity: isVisible ? 1 - (indexFromEnd * 0.1) : 0, // Slight fade for the card itself
        scale: isVisible ? 1 - (indexFromEnd * 0.04) : 0.8,
        duration: 0.4,
        ease: 'expo.out',
        overwrite: true
      })

      // Select inner text elements to hide them if not at front
      const innerContent = card.querySelectorAll('.card-content-inner')
      gsap.to(innerContent, {
        opacity: isFront ? 1 : 0,
        pointerEvents: isFront ? 'auto' : 'none',
        duration: 0.4,
        ease: 'power2.out'
      })
    })
  }, [])

  const handleNext = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    
    const cards = gsap.utils.toArray('.card')
    const activeCard = cards[cards.length - 1]
    
    gsap.to(activeCard, { 
      x: '120%', 
      rotation: 15, 
      opacity: 0, 
      duration: 0.6, 
      ease: 'power2.inOut',
      onComplete: () => {
        sliderRef.current.prepend(activeCard)
        gsap.set(activeCard, { x: '0%', rotation: 0 })
        repositionCards(gsap.utils.toArray('.card'))
        setIsAnimating(false)
      }
    })
  }, [isAnimating, repositionCards])

  const handlePrev = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)

    const cards = gsap.utils.toArray('.card')
    const bottomCard = cards[0]
    
    gsap.set(bottomCard, { x: '-120%', rotation: -15, opacity: 0 })
    sliderRef.current.append(bottomCard)
    
    const updatedCards = gsap.utils.toArray('.card')
    repositionCards(updatedCards)

    gsap.to(bottomCard, { 
      x: '0%', 
      rotation: 0, 
      opacity: 1, 
      duration: 0.6, 
      ease: 'expo.out',
      onComplete: () => setIsAnimating(false)
    })
  }, [isAnimating, repositionCards])

  useEffect(() => {
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) < 15) return 
      if (e.deltaY > 0) handleNext()
      else handlePrev()
    }
    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [handleNext, handlePrev])

  useEffect(() => {
    repositionCards(gsap.utils.toArray('.card'))
  }, [repositionCards])

  return (
    <div className="projects-container bg-[#080808] text-white font-sans min-h-screen flex flex-col overflow-hidden">
      
      <header className="flex justify-between items-center p-[30px_50px] relative z-[100]">
        <div className="text-[32px] font-bold tracking-[2px] text-[#c0c0c0] font-satoshi">
          BUILDS <br />
          <div className="text-[14px] font-normal tracking-[1px] mt-1 text-[#888] font-mono">
            <span>{currentTime}</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-white no-underline text-sm tracking-[2px] border-b border-white pb-0.5 hover:text-[#888]">
            BACK
          </Link>
        </div>
      </header>

      <main className="relative flex-1 flex items-center justify-center perspective-[2000px]">
        <div ref={sliderRef} className="relative w-[min(90%,1090px)] h-[610px] preserve-3d mt-[-50px]">
          {projects.map((project, index) => (
            <div
              key={index}
              className="card absolute inset-0 rounded-[40px] p-16 flex flex-col justify-between border border-white/5 shadow-2xl"
              style={{ 
                backgroundColor: project.bgColor,
                boxShadow: `0 30px 60px -12px ${project.color}22` 
              }}
            >
              
              <div className="card-content-inner flex justify-between items-start">
                <span className="font-mono text-white/20 text-2xl">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <a href={project.link} target="_blank" rel="noreferrer" 
                   className="link-btn p-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                </a>
              </div>

              <div className="card-content-inner">
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                  {project.name}
                </h2>
                <div className="h-1.5 w-32 rounded-full" style={{ backgroundColor: project.color }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-10 flex gap-12 z-[100]">
          <button onClick={handlePrev} className="group flex items-center gap-2 text-white/30 hover:text-white transition-colors">
            <span className="text-[10px] tracking-[3px] uppercase">Prev</span>
            <div className="w-10 h-[1px] bg-white/20 group-hover:w-16 group-hover:bg-white transition-all"></div>
          </button>
          <button onClick={handleNext} className="group flex items-center gap-2 text-white/30 hover:text-white transition-colors">
            <div className="w-10 h-[1px] bg-white/20 group-hover:w-16 group-hover:bg-white transition-all"></div>
            <span className="text-[10px] tracking-[3px] uppercase">Next</span>
          </button>
        </div>
      </main>

      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        .card { backface-visibility: hidden; }
        .card:not(.is-active) { pointer-events: none; }
        h2 { text-shadow: 0 20px 40px rgba(0,0,0,0.4); }
      `}</style>
    </div>
  )
}

export default Projects