import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

// Simple rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting middleware
function rateLimit(maxRequests: number, windowMs: number) {
  return (req: any, res: any, next: any) => {
    const ip = req.ip || req.connection.remoteAddress || '127.0.0.1';
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean old entries
    const entries = Array.from(rateLimitStore.entries());
    for (const [key, value] of entries) {
      if (value.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }
    
    const current = rateLimitStore.get(ip) || { count: 0, resetTime: now + windowMs };
    
    if (current.resetTime < now) {
      current.count = 0;
      current.resetTime = now + windowMs;
    }
    
    if (current.count >= maxRequests) {
      res.status(429).json({
        success: false,
        message: "Muitas tentativas. Tente novamente em alguns minutos.",
        error: "RATE_LIMIT_EXCEEDED"
      });
      return;
    }
    
    current.count++;
    rateLimitStore.set(ip, current);
    next();
  };
}

// Input sanitization function
function sanitizeString(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .trim();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint with rate limiting
  app.post("/api/contact", rateLimit(5, 15 * 60 * 1000), async (req, res) => {
    try {
      // Sanitize inputs before validation
      const sanitizedBody = {
        ...req.body,
        nome: req.body.nome ? sanitizeString(req.body.nome) : req.body.nome,
        email: req.body.email ? req.body.email.trim().toLowerCase() : req.body.email,
        instagram: req.body.instagram ? sanitizeString(req.body.instagram) : req.body.instagram,
        mensagem: req.body.mensagem ? sanitizeString(req.body.mensagem) : req.body.mensagem,
      };

      // Validate request body
      const contactData = insertContactSchema.parse(sanitizedBody);
      
      // Create contact in database
      const contact = await storage.createContact(contactData);
      
      res.status(201).json({ 
        success: true, 
        message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        contact: {
          id: contact.id,
          nome: contact.nome,
          email: contact.email
        }
      });
    } catch (error) {
      console.error("Error creating contact:", error);
      
      if (error instanceof z.ZodError) {
        // Return user-friendly error messages
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        
        return res.status(400).json({
          success: false,
          message: "Verifique os dados informados e tente novamente.",
          fieldErrors
        });
      }
      
      res.status(500).json({
        success: false,
        message: "Erro interno do servidor. Tente novamente mais tarde."
      });
    }
  });

  // Remove the GET /api/contacts endpoint - this was a security vulnerability
  // If admin access is needed, implement proper authentication and authorization

  const httpServer = createServer(app);

  return httpServer;
}
