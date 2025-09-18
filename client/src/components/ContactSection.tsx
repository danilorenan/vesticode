import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertContactSchema, type InsertContact } from '@shared/schema';

export default function ContactSection() {
  const { toast } = useToast();

  // Initialize form with react-hook-form and Zod validation
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      nome: '',
      email: '',
      instagram: '',
      mensagem: ''
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || "https://formspree.io/f/mnnbkwrv";
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nome: data.nome,
          email: data.email,
          instagram: data.instagram,
          mensagem: data.mensagem
        })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || `Erro ${res.status}`);
      }
      return res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve. Obrigado pelo interesse!"
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao enviar mensagem",
        description: error?.message || "Ocorreu um erro. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  const handleWhatsAppClick = () => {
    const message = `Olá Danilo! Tenho interesse nos serviços da Vesti Code. 

Vi o site e gostaria de saber mais sobre:
- Como vocês podem ajudar minha marca de moda
- Qual o melhor pacote para o meu caso
- Disponibilidade para uma conversa

Aguardo seu retorno!`;

    // Replace this with your actual WhatsApp number (format: country code + number without + or spaces)
    // Example: For +55 11 99999-9999, use: 5511999999999
    const phoneNumber = "5511999999999"; // TODO: Replace with actual phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
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

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Contact Form */}
          <Card className="bg-background border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Send className="w-5 h-5" />
                Envie sua Mensagem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Nome *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Seu nome completo"
                            data-testid="input-nome"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">E-mail *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="seu@email.com"
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Instagram da Marca</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ''}
                            placeholder="@suamarca"
                            data-testid="input-instagram"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mensagem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Mensagem *</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Conte-me sobre seu projeto e desafios..."
                            rows={4}
                            data-testid="input-mensagem"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-accent text-accent-foreground border-accent-border hover-elevate"
                    data-testid="button-submit"
                  >
                    {contactMutation.isPending ? 'Enviando...' : 'Enviar Mensagem'}
                    <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* WhatsApp Contact */}
          <Card className="bg-background border-card-border flex flex-col h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MessageSquare className="w-5 h-5" />
                Ou Chame no WhatsApp
              </CardTitle>
            </CardHeader>
            {/* Grid: auto | auto | 1fr | auto */}
            <CardContent className="flex-1 grid grid-rows-[auto_auto_1fr_auto] gap-6">
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

              {/* Esta linha vira o “elástico” que empurra o botão para baixo */}
              <p className="text-sm text-muted-foreground text-center">
                Disponível de segunda a sexta, das 9h às 18h
              </p>

              {/* Botão no rodapé + respiro acima */}
              <div className="pt-3">
                <Button
                  onClick={handleWhatsAppClick}
                  variant="outline"
                  className="w-full border-accent-border hover:bg-accent hover:text-accent-foreground hover:border-accent-border"
                  data-testid="button-whatsapp"
                >
                  <MessageSquare className="mr-2 w-4 h-4" />
                  Chamar no WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card> </div>
      </div>
    </section>
  );
}