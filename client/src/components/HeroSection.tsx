import { Button } from '@/components/ui/button';
import heroImage from '@assets/generated_images/Fashion_agency_workspace_hero_c3c6df7b.png';

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary-foreground mb-6 leading-tight" data-testid="hero-title">
          Lojas Online que Transformam Seguidores em Clientes.
        </h1>
        
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed" data-testid="hero-subtitle">
          Criamos a experiência de compra online que sua marca de moda merece, unindo design sofisticado e tecnologia que vende.
        </p>
        
        <Button 
          onClick={scrollToContact}
          size="lg"
          className="bg-background text-foreground border-2 border-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent-border transition-all duration-300 px-8 py-3 text-lg font-medium"
          data-testid="hero-cta"
        >
          Agende sua Análise Gratuita
        </Button>
      </div>
    </section>
  );
}