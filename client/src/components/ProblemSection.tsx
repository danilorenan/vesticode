import { MessageCircle, ShieldX, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ProblemSection() {
  const problems = [
    {
      icon: MessageCircle,
      title: "Pedidos desorganizados no Direct",
      description: "Perda de vendas por falta de organização e demora nas respostas."
    },
    {
      icon: ShieldX,
      title: "Aparência amadora que não passa confiança",
      description: "Clientes desconfiam da qualidade sem uma apresentação profissional."
    },
    {
      icon: Clock,
      title: "Processo de pagamento manual e demorado",
      description: "Burocracia que afasta clientes e dificulta a finalização da compra."
    }
  ];

  return (
    <section id="problema" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-card-foreground mb-4" data-testid="problem-title">
            Vender pelas redes sociais está limitando seu crescimento?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card key={index} className="bg-background border-card-border hover-elevate transition-all duration-300" data-testid={`problem-card-${index}`}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center">
                  <problem.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4" data-testid={`problem-title-${index}`}>
                  {problem.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed" data-testid={`problem-description-${index}`}>
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}