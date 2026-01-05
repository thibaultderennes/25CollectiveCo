// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { getAllPosts } from '../lib/queries';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getAllPosts();

  if (!context.site) {
    throw new Error('Site URL is not configured in astro.config.mjs');
  }

  return rss({
    title: '25CollectiveCo Blog',
    description: 'Thoughts, updates, and explorations from the collective',
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description || '',
      pubDate: new Date(post.publishedAt),
      link: `/blog/${post.slug}`, // No trailing slash
    })),
    customData: `<language>en-us</language>`,
  });
}
