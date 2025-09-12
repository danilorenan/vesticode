import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import portfolioImage from '@assets/generated_images/Fashion_ecommerce_website_mockup_c757b603.png';

export default function PortfolioSection() {
  const handleViewProject = () => {
    console.log('View project clicked'); // todo: remove mock functionality
  };

  return (
    <section id="portfolio" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-card-foreground mb-4" data-testid="portfolio-title">
            Design que Vende, Tecnologia que Converte.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Project Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-background shadow-xl">
              <img 
                src={portfolioImage} 
                alt="Projeto de e-commerce para marca de moda"
                className="w-full h-full object-cover"
                data-testid="portfolio-image"
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-card-foreground" data-testid="portfolio-project-title">
              Elegance Fashion Studio
            </h3>
            
            <p className="text-lg text-muted-foreground leading-relaxed" data-testid="portfolio-project-description">
              Desenvolvemos uma loja online completa, focada na experiência do usuário e otimizada para conversão, 
              refletindo a identidade sofisticada da marca. O resultado foi um aumento de 300% nas vendas online 
              nos primeiros 3 meses.
            </p>

            <div className="space-y-4">
              <h4 className="font-semibold text-card-foreground">Resultados Alcançados:</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                  300% de aumento nas vendas online
                </li>
                <li className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                  65% de redução no abandono de carrinho
                </li>
                <li className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                  90% dos clientes aprovaram a nova experiência
                </li>
              </ul>
            </div>

            <Button 
              onClick={handleViewProject}
              variant="outline"
              className="bg-accent text-accent-foreground border-accent-border hover-elevate"
              data-testid="portfolio-view-project"
            >
              Ver Projeto Completo
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}