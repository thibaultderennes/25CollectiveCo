# 25CollectiveCo Website

A minimal, early-2000s-inspired website built with Astro and Sanity CMS. Features a clean, typography-first design with white background and Helvetica Neue font stack.

## Features

- **Minimal Design**: White background, black text, Helvetica Neue typography
- **Static Blog**: SEO-friendly blog powered by Sanity CMS, pre-rendered at build time
- **Tabbed Navigation**: Single-page experience with anchor-based navigation
- **RSS Feed**: Automatic RSS feed generation for blog posts
- **Sitemap**: Auto-generated sitemap for SEO
- **Free Tier Compatible**: Designed to run entirely on free hosting tiers

## Tech Stack

- **Astro**: Static site generator
- **Sanity**: Headless CMS for content management
- **Vercel**: Hosting platform (free tier)
- **TypeScript**: Type safety

## Project Structure

```
25collectiveco/
├── src/
│   ├── components/
│   │   └── PortableText.astro    # Renders Sanity rich text
│   ├── lib/
│   │   ├── sanity.ts              # Sanity client configuration
│   │   └── queries.ts             # GROQ queries for posts
│   ├── pages/
│   │   ├── index.astro            # Landing page with tabbed sections
│   │   ├── blog/
│   │   │   ├── index.astro        # Blog listing page
│   │   │   └── [slug].astro       # Individual blog post pages
│   │   └── rss.xml.ts             # RSS feed
│   └── styles/
│       └── global.css             # Global styles
├── sanity-schemas/
│   └── post.ts                    # Sanity post schema
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Sanity account (free tier)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity

#### Create a Sanity Project

```bash
npm install -g @sanity/cli
sanity init
```

Follow the prompts to:
- Create a new project
- Choose a dataset name (e.g., "production")
- Select "Clean project with no predefined schemas"

#### Configure Sanity Studio

Create a new directory for your Sanity Studio:

```bash
mkdir sanity-studio
cd sanity-studio
sanity init
```

Then add the post schema to your Studio:

1. Copy `sanity-schemas/post.ts` to your Studio's `schemas` directory
2. Import and add it to your Studio's schema configuration

```javascript
// In your Studio's sanity.config.ts or schema.ts
import post from './schemas/post'

export default createConfig({
  // ... other config
  schema: {
    types: [post],
  },
})
```

#### Deploy Sanity Studio

Deploy your Studio to Sanity's free hosting:

```bash
cd sanity-studio
sanity deploy
```

Your Studio will be available at `https://your-project.sanity.studio`

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Update with your Sanity credentials:

```
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
```

Find your project ID in your Sanity dashboard or Studio.

**Important**: These are server-only variables (no `PUBLIC_` prefix) and are only accessed at build time.

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:4321` to see your site.

### 5. Create Content

1. Go to your Sanity Studio URL
2. Create and publish blog posts
3. Return to your local dev server and rebuild to see new content

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables in Vercel:
   - `SANITY_PROJECT_ID`
   - `SANITY_DATASET`
4. Deploy!

### Automatic Rebuilds

To automatically rebuild your site when content changes in Sanity:

1. In Vercel, go to Settings → Git → Deploy Hooks
2. Create a deploy hook
3. In Sanity Studio, go to Settings → API → Webhooks
4. Add a new webhook pointing to your Vercel deploy hook URL
5. Configure it to trigger on document changes

Now your site will automatically rebuild when you publish new posts!

## Content Management

### Writing Blog Posts

1. Go to your Sanity Studio
2. Click "Blog Post" to create a new post
3. Fill in:
   - **Title**: Post title (required)
   - **Slug**: URL-friendly slug (auto-generated from title)
   - **Description**: Short excerpt for listings and SEO
   - **Cover Image**: Optional featured image
   - **Published At**: Publication date and time
   - **Body**: Rich text content with formatting options
4. Click "Publish" when ready

### Post Visibility

- **Published posts**: Will appear on your site after the next build
- **Draft posts**: Will NOT appear on your site (safe for work-in-progress content)

## Customization

### Update Site Content

Edit the landing page sections in `src/pages/index.astro`:
- Hero text and motto
- Projects, About, Archive, Contact sections
- Footer links and contact info

### Add a Video

To add a hero video, uncomment and update the video embed in `src/pages/index.astro`:

```html
<div class="video-container">
  <iframe 
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
    frameborder="0" 
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>
```

### Styling

All styles are in `src/styles/global.css`. The design follows these principles:
- Helvetica Neue font stack
- White (#FFFFFF) background
- Black (#000000) text
- Minimal decoration
- Generous spacing

## Free Tier Compatibility

This project is designed to stay within free tier limits:

### Vercel Free Tier
- ✅ 100GB bandwidth/month
- ✅ Unlimited static page builds
- ✅ No serverless functions required

### Sanity Free Tier
- ✅ 3 users
- ✅ 2 datasets
- ✅ 10,000 documents
- ✅ Unlimited API requests (with CDN caching)
- ✅ Free Studio hosting

All blog content is fetched at build time, so there are no runtime API calls to Sanity from your public site. This keeps everything fast and free!

## Troubleshooting

### "Cannot find module '@sanity/client'"

Make sure you've installed dependencies:
```bash
npm install
```

### Blog posts not showing

1. Check that posts are published (not drafts) in Sanity Studio
2. Ensure environment variables are set correctly
3. Rebuild your site (posts are fetched at build time)

### Sanity connection errors

Verify your `.env` file has the correct:
- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`

## License

MIT

## Support

For issues or questions, please open an issue on the repository.
