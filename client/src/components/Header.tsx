import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@assets/generated_images/Vesti (1080 x 300 px) (1).png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center"> 
            <a href="/" className="inline-flex items-center" aria-label="Vesti Code - Início" data-testid="logo"> 
              <img src={logo} alt="Vesti Code" className="h-9 w-auto md:h-10 select-none" draggable="false" /> 
            </a> 
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('solucoes')}
              className="text-foreground hover:text-accent transition-colors"
              data-testid="nav-solutions"
            >
              Soluções
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-foreground hover:text-accent transition-colors"
              data-testid="nav-portfolio"
            >
              Portfólio
            </button>
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-foreground hover:text-accent transition-colors"
              data-testid="nav-about"
            >
              Sobre
            </button>
            <Button
              onClick={() => scrollToSection('contato')}
              variant="outline"
              className="bg-accent text-accent-foreground border-accent-border hover-elevate"
              data-testid="nav-contact"
            >
              Contato
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            data-testid="mobile-menu-toggle"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('solucoes')}
                className="text-left text-foreground hover:text-accent transition-colors"
                data-testid="mobile-nav-solutions"
              >
                Soluções
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="text-left text-foreground hover:text-accent transition-colors"
                data-testid="mobile-nav-portfolio"
              >
                Portfólio
              </button>
              <button
                onClick={() => scrollToSection('sobre')}
                className="text-left text-foreground hover:text-accent transition-colors"
                data-testid="mobile-nav-about"
              >
                Sobre
              </button>
              <Button
                onClick={() => scrollToSection('contato')}
                variant="outline"
                className="w-full bg-accent text-accent-foreground border-accent-border"
                data-testid="mobile-nav-contact"
              >
                Contato
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}