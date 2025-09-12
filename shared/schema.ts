import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nome: text("nome").notNull(),
  email: text("email").notNull(),
  instagram: text("instagram"),
  mensagem: text("mensagem").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Create a completely custom contact schema for proper validation
export const insertContactSchema = z.object({
  nome: z.string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços"),
  email: z.string()
    .email("Por favor, insira um email válido")
    .min(5, "Email deve ter pelo menos 5 caracteres")
    .max(254, "Email deve ter no máximo 254 caracteres")
    .toLowerCase(),
  instagram: z.string()
    .optional()
    .nullable()
    .refine((val) => !val || val === "" || /^@?[a-zA-Z0-9._]+$/.test(val), {
      message: "Instagram deve ser um nome de usuário válido (ex: @usuario)"
    })
    .transform((val) => val && val.trim() !== "" ? (val.startsWith("@") ? val : `@${val}`) : null),
  mensagem: z.string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(2000, "Mensagem deve ter no máximo 2000 caracteres")
    .transform(val => val.trim())
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
