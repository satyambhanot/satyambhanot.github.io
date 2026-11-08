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
      // Position on the home page: 1 comes first and gets the big featured card.
      order: z.number(),
      // A short category shown on the card, like Backend, Data, or Machine learning. It also
      // picks the card's artwork and the filter button it appears under.
      type: z.string(),
      period: z.string().optional(),
      context: z.string().optional(),
      team: z.string().optional(),
      role: z.string().optional(),
      stack: z.array(z.string()).min(1),
      // One line shown on the card for projects without their own page.
      takeaway: z.string().optional(),
      // A short result shown as a badge on the card, like "−25.2% dark nights".
      highlight: z.string().optional(),
      // The headline result for the featured project: a big value plus what it measures.
      // Keep any qualifier (like "in a held-out simulation") in the label.
      result: z.object({ value: z.string(), label: z.string() }).optional(),
      // Numbers for the interactive comparison on a case-study page. Every option needs a
      // value for every metric, and the first metric is the headline.
      // display "change" (the default) shows how far each option is from `baseline` on the
      // headline, which suits a metric where lower is better. display "value" shows the
      // headline value itself, which suits a score like F1. `default` is the option shown first.
      comparison: z
        .object({
          title: z.string(),
          note: z.string(),
          display: z.enum(['change', 'value']).default('change'),
          baseline: z.string().optional(),
          default: z.string().optional(),
          metrics: z
            .array(z.object({ id: z.string(), label: z.string(), decimals: z.number().optional(), suffix: z.string().optional() }))
            .min(1),
          options: z
            .array(z.object({ id: z.string(), label: z.string(), values: z.record(z.string(), z.number()) }))
            .min(2),
        })
        .optional(),
      cover: z.object({ src: image(), alt: z.string().min(1) }).optional(),
      repo: z.url().optional(),
      demo: z.url().optional(),
    }),
});

export const collections = { projects };
