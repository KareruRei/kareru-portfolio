import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Contact() {
  const [currentTime, setCurrentTime] = useState('00:00:00')
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

  // Live clock logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Theme logic
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <div 
      className="bg-[#1a1a1a] text-white font-sans min-h-screen flex flex-col overflow-hidden data-[theme=light]:bg-[#f5f5f5] data-[theme=light]:text-[#1a1a1a]" 
      data-theme={theme}
    >
      <header className="flex justify-between items-center p-[30px_50px] relative">
        <div className="text-[32px] font-bold tracking-[2px] text-[#c0c0c0] font-satoshi">
          KARERU <br />
          <div className="text-[14px] font-normal tracking-[1px] mt-1 text-[#888] font-mono">
            <span>{currentTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className={`bg-transparent border-none cursor-pointer flex items-center justify-center w-10 h-10 transition-transform duration-300 ease-in-out hover:scale-110 ${theme === 'light' ? 'text-black' : 'text-white'}`}
            aria-label="Toggle dark/light mode"
          >
            <svg className={`absolute w-6 h-6 stroke-current stroke-2 fill-none transition-all duration-300 ${theme === 'light' ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <svg className={`absolute w-6 h-6 stroke-current stroke-2 fill-none transition-all duration-300 ${theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
          
          <Link
            to="/"
            className="text-white no-underline text-sm tracking-[2px] border-b border-white pb-0.5 transition-colors duration-[200ms] hover:text-[#888] data-[theme=light]:text-[#1a1a1a] data-[theme=light]:border-[#1a1a1a]"
            data-theme={theme}
          >
            BACK
          </Link>
        </div>
      </header>

      {/* SOCIAL CONTENT */}
      <div className="flex gap-[30px] justify-center items-center flex-1">
        {/* X */}
        <a data-social="X" style={{ '--accent-color': 'black' }} href="https://x.com/idk_kareru" target="_blank" rel="noopener noreferrer" className="bg-[#c0c0c0] p-4 rounded-full h-[100px] w-[100px] box-border flex-shrink-0 grid place-items-center relative group hover:bg-[var(--accent-color)] hover:fill-white transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)]">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-[50px] w-[50px]"><title>X</title><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" /></svg>
          <span className="absolute bg-[var(--accent-color)] text-white no-underline py-2 px-4 rounded-full -translate-y-10 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-20 group-hover:rotate-0 group-hover:opacity-100 pointer-events-none">X</span>
          <span className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--accent-color)] translate-y-0 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-[60px] group-hover:rotate-0 group-hover:opacity-100 pointer-events-none"></span>
        </a>

        {/* Github */}
        <a data-social="Github" style={{ '--accent-color': '#333' }} href="https://github.com/KareruRei" target="_blank" rel="noopener noreferrer" className="bg-[#c0c0c0] p-4 rounded-full h-[100px] w-[100px] box-border flex-shrink-0 grid place-items-center relative group hover:bg-[var(--accent-color)] hover:fill-white transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)]">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-[50px] w-[50px]"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
          <span className="absolute bg-[var(--accent-color)] text-white no-underline py-2 px-4 rounded-full -translate-y-10 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-20 group-hover:rotate-0 group-hover:opacity-100 pointer-events-none">Github</span>
          <span className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--accent-color)] translate-y-0 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-[60px] group-hover:rotate-0 group-hover:opacity-100 pointer-events-none"></span>
        </a>

        {/* Discord */}
        <a data-social="Discord" style={{ '--accent-color': '#5865F2' }} href="https://discord.com/users/748762806232285305" target="_blank" rel="noopener noreferrer" className="bg-[#c0c0c0] p-4 rounded-full h-[100px] w-[100px] box-border flex-shrink-0 grid place-items-center relative group hover:bg-[var(--accent-color)] hover:fill-white transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)]">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-[50px] w-[50px]"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" /></svg>
          <span className="absolute bg-[var(--accent-color)] text-white no-underline py-2 px-4 rounded-full -translate-y-10 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-20 group-hover:rotate-0 group-hover:opacity-100 pointer-events-none">Discord</span>
          <span className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--accent-color)] translate-y-0 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-[60px] group-hover:rotate-0 group-hover:opacity-100 pointer-events-none"></span>
        </a>

        {/* LinkedIn */}
        <a data-social="LinkedIn" style={{ '--accent-color': '#0077B5' }} href="https://www.linkedin.com/in/royceelacuesta/" target="_blank" rel="noopener noreferrer" className="bg-[#c0c0c0] p-4 rounded-full h-[100px] w-[100px] box-border flex-shrink-0 grid place-items-center relative group hover:bg-[var(--accent-color)] hover:fill-white transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)]">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-[50px] w-[50px]"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          <span className="absolute bg-[var(--accent-color)] text-white no-underline py-2 px-4 rounded-full -translate-y-10 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-20 group-hover:rotate-0 group-hover:opacity-100 pointer-events-none">LinkedIn</span>
          <span className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--accent-color)] translate-y-0 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-[60px] group-hover:rotate-0 group-hover:opacity-100 pointer-events-none"></span>
        </a>

        {/* Instagram */}
        <a data-social="Instagram" style={{ '--accent-color': '#E1306C' }} href="https://www.instagram.com/ww.yhgh/" target="_blank" rel="noopener noreferrer" className="bg-[#c0c0c0] p-4 rounded-full h-[100px] w-[100px] box-border flex-shrink-0 grid place-items-center relative group hover:bg-[var(--accent-color)] hover:fill-white transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)]">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-[50px] w-[50px]"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.012 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.012 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          <span className="absolute bg-[var(--accent-color)] text-white no-underline py-2 px-4 rounded-full -translate-y-10 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-20 group-hover:rotate-0 group-hover:opacity-100 pointer-events-none">Instagram</span>
          <span className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--accent-color)] translate-y-0 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-[60px] group-hover:rotate-0 group-hover:opacity-100 pointer-events-none"></span>
        </a>
      </div>

      <footer className="flex justify-between p-[40px_50px] text-[12px] tracking-[1px] mt-auto">
        <div className="flex flex-col items-start gap-[5px]">
          <a href="https://linkedin.com/in/royceelacuesta/" target="_blank" className="text-[#888] no-underline hover:text-white transition-colors" data-theme={theme}>
            LINKEDIN <span className="arrow opacity-0 transition-opacity group-hover:opacity-100">↗</span>
          </a>
          <a href="https://github.com/KareruRei" target="_blank" className="text-[#888] no-underline hover:text-white transition-colors" data-theme={theme}>
            GITHUB <span className="arrow opacity-0 transition-opacity group-hover:opacity-100">↗</span>
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Contact