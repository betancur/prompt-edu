import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

function Navbar() {
  const [theme, setTheme] = React.useState('light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <nav className="w-full m-0 px-8 py-4 bg-[#001F2C] dark:bg-[#001F2C]">
      <div className="container mx-auto max-w-[1200px] flex justify-between items-center">
        <div className="flex gap-8">
          <Link to="/" className="text-xl font-bold text-white hover:text-white/80">
            EduPromptIA
          </Link>
          <Link to="/library" className="text-white hover:text-white/80">Biblioteca</Link>
          <Link to="/frameworks" className="text-white hover:text-white/80">Frameworks</Link>
          <Link to="/resources" className="text-white hover:text-white/80">Recursos</Link>
        </div>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-white hover:text-white/80 hover:bg-white/10"
          >
            {theme === 'light' ? 
              <MoonIcon className="h-5 w-5" /> : 
              <SunIcon className="h-5 w-5" />
            }
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
