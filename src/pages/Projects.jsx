import { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

function Projects() {
  const [currentTime, setCurrentTime] = useState('00:00:00') // this is where we track current time for display
  const [isAnimating, setIsAnimating] = useState(false) // this is where we prevent overlapping animations
  const sliderRef = useRef(null) // this is where we reference the slider container for GSAP transformations
  // this is where we define constants for stack positioning
  const MAX_VISIBLE = 6 
  const Y_STEP = 12
  const Z_STEP = 80
  // this is where we define the list of projects to display
  const projects = [
    { name: 'Diane', color: '#950404', bgColor: '#1a0c0f', link: 'https://tranquil-pothos-181adb.netlify.app/' },
    { name: 'AgriConnect', color: '#800000', bgColor: '#1F0F12', link: 'https://github.com/KareruRei/AgriConnect' },
    { name: 'Mr. Facilitator', color: '#5C1A1A', bgColor: '#1E1416', link: '#' },
    { name: 'Direct Clothing', color: '#451A1A', bgColor: '#282020', link: 'https://github.com/KareruRei/DirectClothing' },
    { name: 'Password Manager', color: '#2E1A1A', bgColor: '#202020', link: 'https://github.com/KareruRei/PasswordManager' },
    { name: 'Clearance', color: '#1A1A1A', bgColor: '#141414', link: 'https://karerurei.github.io/Clearance/' },
  ]
  // this is where we update the clock every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(interval)
  }, [])
  // this is where we define a utility to darken a hex color for background effects
  const darkenColor = useCallback((hex, amount = 0.3) => {
    const r = Math.floor(parseInt(hex.slice(1, 3), 16) * (1 - amount))
    const g = Math.floor(parseInt(hex.slice(3, 5), 16) * (1 - amount))
    const b = Math.floor(parseInt(hex.slice(5, 7), 16) * (1 - amount))
    return `rgb(${r}, ${g}, ${b})`
  }, [])

  // this is where we define a utility to reposition all cards in the stack
  const repositionCards = useCallback((cards) => {
    cards.forEach((card, i) => {
      const y = Math.min(i, MAX_VISIBLE) * Y_STEP + '%'
      const z = Math.min(i, MAX_VISIBLE) * Z_STEP
      const scale = 1 - (MAX_VISIBLE - Math.min(i, MAX_VISIBLE)) * 0.02
      gsap.to(card, { y, z, scale, duration: 0.1, ease: 'power2.inOut' })
    })
  }, [])

  // this is where we perform initial setup when component mounts
  useEffect(() => {
    // this is where we split heading text into spans for the animation
    document.querySelectorAll('.copy h1').forEach((el) => {
      el.innerHTML = el.innerText
        .split('')
        .map((c) => `<span>${c === ' ' ? '&nbsp;' : c}</span>`)
        .join('')
    })
    // this is where we get all cards and set their initial positions
    const cards = gsap.utils.toArray('.card')
    repositionCards(cards)
    // this is where we set the last card as the active one
    const activeCard = cards[cards.length - 1]
    activeCard.classList.add('is-active')
    gsap.set(activeCard.querySelectorAll('span'), { y: 0 })
    const link = activeCard.querySelector('a')
    if (link) gsap.set(link, { opacity: 1 })
    // this is where we set container background based on active card color
    const container = document.querySelector('.projects-container')
    if (container && activeCard.dataset.color) {
      gsap.set(container, { backgroundColor: darkenColor(activeCard.dataset.color) })
    }
  }, [darkenColor, repositionCards])

  // this is where we define function to move to the next project card
  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const slider = sliderRef.current
    const cards = gsap.utils.toArray('.card')
    const activeCard = cards[cards.length - 1]

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    })

    tl.to(activeCard.querySelectorAll('span'), { y: 200, duration: 0.4, ease: 'power2.inOut' })
      .to(activeCard.querySelector('a'), { opacity: 0, duration: 0.2 }, '<')
      .to(activeCard, { y: '100%', scale: 0.7, duration: 0.02, ease: 'power2.inOut' }, '<')
      .add(() => {
        // this is where we move the active card to the back of the stack
        slider.prepend(activeCard)

        const updatedCards = gsap.utils.toArray('.card')
        updatedCards.forEach(c => c.classList.remove('is-active'))
        const newActive = updatedCards[updatedCards.length - 1]
        newActive.classList.add('is-active')

        // this is where we reposition all cards smoothly
        updatedCards.forEach((card, i) => {
          const index = Math.min(i, MAX_VISIBLE)
          const y = index * Y_STEP + '%'
          const z = index * Z_STEP
          const scale = 1 - (MAX_VISIBLE - index) * 0.02
          gsap.to(card, { y, z, scale, duration: 0.1, ease: 'power2.inOut' })
        })

        // this is where we animate the new active card text and link
        gsap.set(newActive.querySelectorAll('span'), { y: 200 })
        gsap.to(newActive.querySelectorAll('span'), { y: 0, duration: 0.02, ease: 'power2.inOut' })
        const link = newActive.querySelector('a')
        if (link) gsap.to(link, { opacity: 1, duration: 0.3, ease: 'power1.out' })

        // this is where we animate container background to match new active card
        const container = document.querySelector('.projects-container')
        if (container && newActive.dataset.color) {
          gsap.to(container, { backgroundColor: darkenColor(newActive.dataset.color), duration: 0.8, ease: 'power2.out' })
        }
      })
  }

  // this is where we define function to move to the previous project card
  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const slider = sliderRef.current
    const cards = gsap.utils.toArray('.card')
    const activeCard = cards[cards.length - 1]
    // this is where we hide current active card text and link
    const link = activeCard.querySelector('a')
    if (link) gsap.to(link, { opacity: 0, duration: 0.02, ease: 'power1.out' })
    gsap.to(activeCard.querySelectorAll('span'), { y: 200, duration: 0.02, ease: 'power2.inOut' })
    // this is where we move the first card to the back visually
    const firstCard = cards[0]
    gsap.set(firstCard, { y: -100, scale: 0.7 })
    slider.append(firstCard)
    // this is where we update active card and reposition all cards
    const updatedCards = gsap.utils.toArray('.card')
    updatedCards.forEach(c => c.classList.remove('is-active'))
    const newActive = updatedCards[updatedCards.length - 1]
    newActive.classList.add('is-active')

    repositionCards(updatedCards)
    // this is where we update container background
    const container = document.querySelector('.projects-container')
    if (container && newActive.dataset.color) {
      gsap.to(container, { backgroundColor: darkenColor(newActive.dataset.color), duration: 0.02, ease: 'power2.out' })
    }
    // this is where we animate new active card text and link
    gsap.set(newActive.querySelectorAll('span'), { y: 200 })
    gsap.to(newActive.querySelectorAll('span'), { y: 0, duration: 0.02, ease: 'power2.inOut' })
    const newLink = newActive.querySelector('a')
    if (newLink) gsap.to(newLink, { opacity: 1, duration: 0.02, ease: 'power1.out' })

    setIsAnimating(false)
  }

  return (
    <div className="projects-container bg-[#1A1A1A] text-white font-sans min-h-screen flex flex-col overflow-hidden transition-colors duration-[600ms] ease-in-out">
      <header className="flex justify-between items-center p-[40px_50px]">
        <div className="text-[32px] font-bold text-[#c0c0c0] font-satoshi">
          BUILDS
          <div className="text-sm text-[#888] mt-1 font-mono">
            <span>{currentTime}</span>
          </div>
        </div>
        <Link to="/" className="text-white no-underline text-sm border-b border-white">BACK</Link>
      </header>
      <div className="relative w-screen h-screen overflow-visible">
        <div ref={sliderRef} className="absolute top-[5vh] w-screen h-screen perspective-[1200px] perspective-origin-[50%_50%] pointer-events-none">
          {projects.map((project, index) => (
            <div
              key={index}
              className="card absolute top-[35%] left-[50%] w-[80%] h-[500px] transform-style-preserve-3d -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden bg-[rgba(26,26,26,0.35)] backdrop-blur-[14px] border border-[rgba(255,255,255,0.12)] shadow-[0_8px_32px_rgba(0,0,0,0.25)] text-white transition-all duration-10 ease-in-out"
              style={{ backgroundColor: project.bgColor }}
              data-color={project.color}
            >
              <div className="relative w-full h-full flex flex-col items-center justify-start pt-24">
                <h1 className="text-left text-[50px] font-heavy tracking-[-0.05em] uppercase font-satoshi opacity-0 pointer-events-none animate-fadeIn">
                  {project.name}
                </h1>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center text-sm text-white no-underline absolute top-5 right-5 transition-all duration-300 opacity-0 pointer-events-none"
                >
                  View Project
                  <span className="ml-2 transform transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <button onClick={handlePrev} className="side-btn absolute top-[35%] -translate-y-1/2 left-[100px] bg-transparent border-none text-white cursor-pointer z-[50] pointer-events-auto w-12 h-12 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110" aria-label="Previous project">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button onClick={handleNext} className="side-btn absolute top-[35%] -translate-y-1/2 right-[100px] bg-transparent border-none text-white cursor-pointer z-[50] pointer-events-auto w-12 h-12 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110" aria-label="Next project">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <style>{`
        .card.is-active h1,
        .card.is-active a {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
    </div>
  )
}

export default Projects
