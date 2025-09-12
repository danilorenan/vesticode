import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    instagram: '',
    mensagem: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData); // todo: remove mock functionality
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve. Obrigado pelo interesse!"
    });
    // Reset form
    setFormData({
      nome: '',
      email: '',
      instagram: '',
      mensagem: ''
    });
  };

  const handleWhatsAppClick = () => {
    console.log('WhatsApp clicked'); // todo: remove mock functionality
    const message = "Olá! Tenho interesse nos serviços da Vesti Code.";
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contato" className="py-24 bg-card">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-card-foreground mb-4" data-testid="contact-title">
            Vamos tirar sua ideia do papel?
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="contact-subtitle">
            Preencha o formulário abaixo ou chame diretamente no WhatsApp. Estou pronto para entender seu desafio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="bg-background border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Send className="w-5 h-5" />
                Envie sua Mensagem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-foreground">Nome *</Label>
                  <Input
                    id="nome"
                    name="nome"
                    type="text"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    required
                    data-testid="input-nome"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">E-mail *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    required
                    data-testid="input-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram" className="text-foreground">Instagram da Marca</Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    type="text"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="@suamarca"
                    data-testid="input-instagram"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensagem" className="text-foreground">Mensagem *</Label>
                  <Textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    placeholder="Conte-me sobre seu projeto e desafios..."
                    rows={4}
                    required
                    data-testid="input-mensagem"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-accent text-accent-foreground border-accent-border hover-elevate"
                  data-testid="button-submit"
                >
                  Enviar Mensagem
                  <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* WhatsApp Contact */}
          <Card className="bg-background border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MessageSquare className="w-5 h-5" />
                Ou Chame no WhatsApp
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Prefere uma conversa mais direta? Chame no WhatsApp para uma consultoria rápida e personalizada.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-foreground">Resposta em até 1 hora</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-foreground">Consultoria gratuita de 15 min</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-foreground">Análise do seu perfil atual</span>
                </div>
              </div>

              <Button 
                onClick={handleWhatsAppClick}
                variant="outline"
                className="w-full border-accent-border hover:bg-accent hover:text-accent-foreground hover:border-accent-border"
                data-testid="button-whatsapp"
              >
                <MessageSquare className="mr-2 w-4 h-4" />
                Chamar no WhatsApp
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Disponível de segunda a sexta, das 9h às 18h
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}