import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per project in src/projects/. The build stops with a clear
// message if a required field is missing or a link isn't a real URL.
const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      // Position on the home page: 1 comes first and gets the big tile.
      order: z.number(),
      // A short category shown on the tile, like Backend, Data, or Machine learning.
      type: z.string(),
      period: z.string().optional(),
      context: z.string().optional(),
      team: z.string().optional(),
      role: z.string().optional(),
      stack: z.array(z.string()).min(1),
      // One line shown on the tile for projects without their own page.
      takeaway: z.string().optional(),
      cover: z.object({ src: image(), alt: z.string().min(1) }).optional(),
      repo: z.url().optional(),
      demo: z.url().optional(),
    }),
});

export const collections = { projects };
