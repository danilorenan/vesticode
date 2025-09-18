import founderImage from '@assets/generated_images/Founder_professional_headshot_895f9d62.jpg';

export default function AboutSection() {
  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Founder Image */}
          <div className="relative">
            <div className="aspect-square rounded-full overflow-hidden bg-card shadow-xl max-w-md mx-auto">
              <img 
                src={founderImage} 
                alt="Danilo Rezende, Fundador da Vesti Code"
                className="w-full h-full object-cover"
                data-testid="founder-image"
              />
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6" data-testid="about-title">
              Expertise Real por Trás da Vesti Code
            </h2>
            
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p data-testid="about-intro">
                Meu nome é <span className="text-foreground font-semibold">Danilo Renan</span>, fundador da Vesti Code. 
                Com mais de 8 anos de experiência direta no desenvolvimento e gestão de um e-commerce de moda de sucesso, 
                eu não apenas construo sites: <span className="text-foreground font-semibold">eu entendo os desafios do seu negócio</span>.
              </p>
              
              <p data-testid="about-experience">
                Durante minha trajetória, vivi na pele as dificuldades de vender moda online - desde a organização de pedidos 
                até a criação de uma experiência de compra que realmente converte. Essa vivência me deu uma perspectiva única 
                sobre o que funciona e o que não funciona no e-commerce de moda.
              </p>
              
              <p data-testid="about-mission">
                Hoje, uso todo esse conhecimento para ajudar outras marcas a evitarem os erros que eu cometi e 
                acelerar o crescimento através de <span className="text-foreground font-semibold">soluções tecnológicas inteligentes</span> e 
                <span className="text-foreground font-semibold"> design estratégico</span>.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-6 bg-card/50 py-4 rounded-r-lg">
              <p className="text-foreground font-medium italic" data-testid="about-quote">
                "Não é sobre criar mais um site. É sobre construir uma máquina de vendas que trabalha 24h por dia para sua marca."
              </p>
              <p className="text-muted-foreground text-sm mt-2">- Danilo Renan, Fundador</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}