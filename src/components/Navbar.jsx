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
    <nav className="border-b py-4 px-8">
      <div className="container mx-auto max-w-[1200px] flex justify-between items-center">
        <div className="flex gap-8">
          <Link to="/" className="text-xl font-bold hover:text-primary">
            PromptEd
          </Link>
          <Link to="/library" className="hover:text-primary">Library</Link>
          <Link to="/frameworks" className="hover:text-primary">Frameworks</Link>
          <Link to="/resources" className="hover:text-primary">Resources</Link>
        </div>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
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
