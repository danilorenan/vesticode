import { Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const handleSocialClick = (platform: string) => {
    console.log(`${platform} clicked`); // todo: remove mock functionality
  };

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold mb-2" data-testid="footer-logo">
              Vesti Code
            </h3>
            <p className="text-primary-foreground/80" data-testid="footer-copyright">
              © 2024 Vesti Code. Todos os direitos reservados.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleSocialClick('Instagram')}
              className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              data-testid="social-instagram"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleSocialClick('LinkedIn')}
              className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              data-testid="social-linkedin"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}