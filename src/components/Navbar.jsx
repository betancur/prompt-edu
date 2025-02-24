import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SunIcon, MoonIcon, Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

function Navbar() {
  const [theme, setTheme] = React.useState('light');
  const [isOpen, setIsOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const NavLinks = ({ mobile = false }) => (
    <>
      <Link 
        to="/library" 
        className={`${mobile ? 'text-foreground hover:text-foreground/80' : 'text-white hover:text-white/80'} transition-colors`}
        onClick={() => mobile && setIsOpen(false)}
      >
        Biblioteca
      </Link>
      <Link 
        to="/frameworks" 
        className={`${mobile ? 'text-foreground hover:text-foreground/80' : 'text-white hover:text-white/80'} transition-colors`}
        onClick={() => mobile && setIsOpen(false)}
      >
        Frameworks
      </Link>
      <Link 
        to="/resources" 
        className={`${mobile ? 'text-foreground hover:text-foreground/80' : 'text-white hover:text-white/80'} transition-colors`}
        onClick={() => mobile && setIsOpen(false)}
      >
        Recursos
      </Link>
      <Link 
        to="/image-generator" 
        className={`${mobile ? 'text-foreground hover:text-foreground/80' : 'text-white hover:text-white/80'} transition-colors`}
      onClick={() => mobile && setIsOpen(false)}
      >
        Generador IA
      </Link>
    </>
  );

  return (
    <nav className="w-full m-0 px-8 py-4 bg-[#001F2C] dark:bg-[#001F2C]">
      <div className="container mx-auto max-w-[1200px] flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.svg"
              alt="Aula Prompts Logo"
              className="h-[32px] md:h-[40px] w-auto max-w-[120px] md:max-w-[160px]"
            />
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <NavLinks />
          </div>
        </div>

        <div className="flex items-center gap-4">
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

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden text-white hover:text-white/80 hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-8 mt-8 px-2">
                <NavLinks mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
