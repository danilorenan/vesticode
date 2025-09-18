import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SolutionsSection() {
const packages = [
{
title: "Presença Digital Essencial",
description: "Ideal para marcas que estão começando e querem uma presença online profissional.",
features: ["Site institucional", "Design responsivo", "Integração com redes sociais", "SEO básico"],
highlighted: false
},
{
title: "E-commerce de Lançamento",
description: "A solução completa para começar a vender online com tudo que sua marca precisa.",
features: ["Loja online completa", "Gateway de pagamento", "Gestão de produtos", "Analytics", "Suporte dedicado"],
highlighted: true
},
{
title: "E-commerce de Crescimento",
description: "Para marcas estabelecidas que querem escalar suas vendas e automatizar processos.",
features: ["Tudo do Lançamento", "Automações avançadas", "Marketing digital", "Relatórios detalhados", "Consultoria estratégica"],
highlighted: false
}
];

const scrollToContact = () => {
const element = document.getElementById('contato');
if (element) element.scrollIntoView({ behavior: 'smooth' });
};

return (
<section id="solucoes" className="py-24 bg-background">
<div className="max-w-7xl mx-auto px-6">
<div className="text-center mb-16">
<h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4" data-testid="solutions-title">
A Solução Completa para sua Marca.
</h2>
</div>
  <div className="grid md:grid-cols-3 gap-8">
      {packages.map((pkg, index) => (
        <Card
          key={index}
          className={`relative overflow-visible flex flex-col h-full hover-elevate transition-all duration-300 ${
            pkg.highlighted ? 'border-accent-border border-2 bg-card' : 'border-border bg-card'
          }`}
          data-testid={`solution-card-${index}`}
        >
          {/* Selo (pill centralizado, mesmo visual de antes) */}
          {pkg.highlighted && (
            <span className="badge-featured absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0">
              Mais Popular
            </span>
          )}

          {/* Espaço reservado no topo (apenas desktop) para alinhar títulos em todos os cards */}
          <div className="hidden md:block card-top-spacer" aria-hidden="true" />

          <CardHeader className="text-center pt-6 pb-4 md:pt-6">
            <CardTitle
              className="text-xl font-serif text-card-foreground"
              data-testid={`solution-title-${index}`}
            >
              {pkg.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0 flex-1 flex flex-col">
            <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`solution-description-${index}`}>
              {pkg.description}
            </p>

            <ul className="space-y-3 mb-6 md:mb-0">
              {pkg.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-card-foreground" data-testid={`solution-feature-${index}-${featureIndex}`}>
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6 md:mt-auto md:pt-3"> <Button onClick={scrollToContact} variant={pkg.highlighted ? 'default' : 'outline'} className={`w-full ${ pkg.highlighted ? 'bg-accent text-accent-foreground border-accent-border' : 'border-border hover:bg-accent hover:text-accent-foreground hover:border-accent-border' }`} data-testid={`solution-cta-${index}`} > Saiba Mais </Button> </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>
);
}