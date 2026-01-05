// src/lib/sanity.ts
import { createClient } from '@sanity/client';

// Use server-only env vars (no PUBLIC_ prefix)
// These are only accessed at build time, never in client-side code
export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || '',
  dataset: import.meta.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN for better performance
});
