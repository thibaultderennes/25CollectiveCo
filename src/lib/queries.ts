// src/lib/queries.ts
import { sanityClient } from './sanity';

export interface Post {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  publishedAt: string;
  body: any[];
  coverImage?: string;
}

// Get all published posts, ordered by date
export async function getAllPosts(): Promise<Post[]> {
  const query = `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    body,
    "coverImage": coverImage.asset->url
  }`;

  try {
    const posts = await sanityClient.fetch<Post[]>(query);
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    body,
    "coverImage": coverImage.asset->url
  }`;

  try {
    const post = await sanityClient.fetch<Post>(query, { slug });
    return post || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}
