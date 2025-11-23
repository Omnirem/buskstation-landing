
import BuskStationLogo from '../BuskStationLogo';
import ScrollLink from './ScrollLink';
import { Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerNavLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#why-us', label: 'Why Us?' },
    { href: '#how-to', label: 'How To' },
    { href: '#benefits', label: 'Benefits' },
    { href: '#cta', label: 'Contact' },
  ];

  return (
    <footer className="bg-card/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start">
            <ScrollLink href="#hero" className="flex items-center text-primary hover:text-accent transition-colors mb-4">
              <BuskStationLogo className="h-10 w-10 mr-2" />
              <span className="font-headline text-2xl font-bold">Busk Station</span>
            </ScrollLink>
            <p className="text-sm text-foreground/70 text-center md:text-left">
              Your Stage. Your Sound. Your Station.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 md:gap-x-6">
            {footerNavLinks.map((link) => (
              <ScrollLink 
                key={link.href} 
                href={link.href} 
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </ScrollLink>
            ))}
          </nav>

          <div className="flex justify-center md:justify-end space-x-6">
            <a href="https://linkedin.com/company/buskstation" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground/70 hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/busk.station/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-foreground/70 hover:text-primary transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border/50 text-center text-sm text-foreground/60">
          <p>&copy; {currentYear} Busk Station. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
