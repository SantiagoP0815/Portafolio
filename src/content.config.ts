import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    fecha: z.coerce.date(),
    herramientas: z.array(z.string()),
    categoria: z.enum(['web', 'red', 'forense', 'malware', 'ctf', 'desarrollo']),
    destacado: z.boolean().default(false),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    estado: z.enum(['completado', 'en-progreso', 'archivado']).default('completado'),
  }),
});

const writeups = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writeups' }),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    fecha: z.coerce.date(),
    dificultad: z.enum(['easy', 'medium', 'hard', 'insane']),
    herramientas: z.array(z.string()),
    categoria: z.enum(['htb', 'thm', 'ctf', 'vulnhub', 'otro']),
    plataforma: z.string(),
    completado: z.boolean().default(true),
    fases: z.array(z.enum(['Reconocimiento', 'Foothold', 'Explotación', 'Escalada de Privilegios'])).optional(),
  }),
});

export const collections = { proyectos, writeups };
