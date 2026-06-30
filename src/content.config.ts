import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const works = defineCollection({
  loader: glob({
    base: "./src/content/works",
    pattern: "**/*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      portfolio: z.enum(["technical", "creative"]),
      locale: z.enum(["it", "en"]),
      client: z.string(),
      start_date: z.coerce.date(),
      status: z.string(), // "Completed", "In progress", "Cancelled"
      type: z.string(), 
      link: z.url().optional(),
      image: image(),
      gallery: z.array(image()).default([]),
      notes: z.string().optional(),
    }),
});

export const collections = { works };
