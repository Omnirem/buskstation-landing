
'use client';

import { useState, useEffect } from 'react';
import BuskStationLogo from '../BuskStationLogo';
import ScrollLink from './ScrollLink';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const navLinks = [
  { href: '#why-us', label: 'Why Us?' },
  { href: '#features', label: 'Features' },
  { href: '#how-to', label: 'How To' },
  { href: '#benefits', label: 'Benefits' },
  { href: '#team', label: 'Team' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoTextHovered, setIsLogoTextHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar: Transitions from full-width to dynamic island */}
      <header
        className={cn(
          "fixed z-50 transition-all duration-300 ease-in-out",
          "hidden md:flex items-center", // Base desktop styles
          isScrolled
            ? "top-4 left-1/2 -translate-x-1/2 w-[75vw] rounded-full border border-white/10 bg-background/20 backdrop-blur-2xl shadow-xl"
            : "top-0 left-0 right-0 bg-transparent backdrop-blur-none shadow-none border-none rounded-none max-w-full"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between w-full h-auto transition-all duration-300 ease-in-out",
            isScrolled
              ? "px-6 py-3" // Padding for the island
              : "container mx-auto px-4 sm:px-6 lg:px-8 py-5" // Increased padding for initial full-width
          )}
        >
          <ScrollLink
            href="#hero"
            className="flex items-center group"
            onMouseEnter={() => setIsLogoTextHovered(true)}
            onMouseLeave={() => setIsLogoTextHovered(false)}
          >
            <BuskStationLogo className={cn("text-primary mr-2 transition-all duration-300 ease-in-out group-hover:rotate-[-6deg] group-hover:scale-110", isScrolled ? "h-8 w-8" : "h-10 w-10")} />
            <span className={cn("font-headline font-bold transition-all duration-300 ease-in-out", isScrolled ? "text-xl" : "text-2xl")}>
              <span className={cn("transition-colors duration-300", isLogoTextHovered ? 'text-accent' : 'text-foreground')}>Busk</span>
              <span className={cn("transition-colors duration-300", isLogoTextHovered ? 'text-foreground' : 'text-accent')}>Station</span>
            </span>
          </ScrollLink>
          <nav className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.href}
                href={link.href}
                className={cn("font-medium text-foreground/80 hover:text-primary transition-all duration-300 ease-in-out", isScrolled ? "text-sm" : "text-base")}
              >
                {link.label}
              </ScrollLink>
            ))}
            <Button
              size={isScrolled ? "sm" : "lg"} 
              className={cn(
                "rounded-full bg-accent text-accent-foreground cursor-default opacity-90 hover:opacity-100 transition-all duration-300 ease-in-out",
                isScrolled 
                  ? "px-4 py-1.5 text-sm h-9" 
                  : "px-6 py-2.5 text-base h-11" 
              )}
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
            >
              Coming Soon
            </Button>
          </nav>
        </div>
      </header>

      {/* Mobile Navbar (standard sticky glassy) */}
      <header
        className={cn(
          "sticky top-0 z-40 md:hidden",
          "transition-all duration-300",
          (isScrolled || isMobileMenuOpen)
            ? "bg-background/30 backdrop-blur-2xl shadow-md border-b border-border/20"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <ScrollLink
              href="#hero"
              className="flex items-center group"
              onMouseEnter={() => setIsLogoTextHovered(true)}
              onMouseLeave={() => setIsLogoTextHovered(false)}
              onClick={closeMobileMenu}
            >
              <BuskStationLogo className="h-9 w-9 mr-3 text-primary transition-all duration-300 ease-in-out group-hover:rotate-[-6deg] group-hover:scale-110" />
              <span className="font-headline text-2xl font-bold">
                <span className={cn("transition-colors duration-300", isLogoTextHovered ? 'text-accent' : 'text-foreground')}>Busk</span>
                <span className={cn("transition-colors duration-300", isLogoTextHovered ? 'text-foreground' : 'text-accent')}>Station</span>
              </span>
            </ScrollLink>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu" className="text-foreground">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background/90 backdrop-blur-xl shadow-xl pb-6 border-t border-border/20">
            <nav className="flex flex-col items-center space-y-4 pt-4">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="font-medium text-lg text-foreground/80 hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </ScrollLink>
              ))}
              <Button
                size="lg" 
                className="rounded-2xl w-full max-w-xs bg-accent text-accent-foreground cursor-default opacity-90 hover:opacity-100 transition-opacity"
                aria-disabled="true"
                onClick={(e) => e.preventDefault()}
              >
                Coming Soon
              </Button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
