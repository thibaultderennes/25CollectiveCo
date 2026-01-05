# Deployment Guide

This guide will walk you through deploying your 25CollectiveCo website to production.

## Prerequisites

- [ ] GitHub account
- [ ] Vercel account (free tier)
- [ ] Sanity project created and Studio deployed
- [ ] At least one blog post published in Sanity

## Step 1: Prepare Your Repository

### 1.1 Create .gitignore

Create a `.gitignore` file in your project root:

```
# Dependencies
node_modules/

# Build output
dist/
.astro/

# Environment variables
.env
.env.local
.env.production

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Cache
.cache/
```

### 1.2 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: 25CollectiveCo website"
git branch -M main
git remote add origin https://github.com/yourusername/25collectiveco.git
git push -u origin main
```

## Step 2: Deploy Sanity Studio

Your Sanity Studio should be deployed separately for content management.

### 2.1 Create Sanity Studio Project

If you haven't already:

```bash
mkdir sanity-studio
cd sanity-studio
npm create sanity@latest
```

Follow prompts and select:
- Create new project
- Use default dataset configuration
- Clean project with no predefined schemas

### 2.2 Add Post Schema

Copy your post schema to the Studio:

```bash
cp ../sanity-schemas/post.ts schemas/
```

Update `schemas/index.ts`:

```typescript
import post from './post'

export const schemaTypes = [post]
```

### 2.3 Deploy Studio

```bash
sanity deploy
```

Your Studio will be available at: `https://your-project.sanity.studio`

**Important**: Save this URL and your project ID for the next steps!

## Step 3: Deploy Website to Vercel

### 3.1 Import Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's an Astro project

### 3.2 Configure Environment Variables

Before deploying, add these environment variables in Vercel:

1. Click "Environment Variables"
2. Add the following:

```
SANITY_PROJECT_ID = your-project-id-here
SANITY_DATASET = production
```

**Note**: These are server-only variables (no `PUBLIC_` prefix). They're only accessed at build time, never in client-side code.

Find your Sanity Project ID:
- In Sanity Studio: Settings → Project Details
- Or in your Studio URL: `https://YOUR-PROJECT-ID.sanity.studio`

### 3.3 Deploy

1. Click "Deploy"
2. Wait for build to complete (usually 1-2 minutes)
3. Visit your deployed site!

## Step 4: Configure Custom Domain (Optional)

### 4.1 Add Domain in Vercel

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain (e.g., 25collectiveco.com)
4. Follow DNS configuration instructions

**Note**: The site URL is already configured in `astro.config.mjs` as `https://25collectiveco.com`. No environment variables need to be updated for the domain.

## Step 5: Set Up Automatic Deploys

Configure Sanity to trigger Vercel rebuilds when content changes.

### 5.1 Create Deploy Hook in Vercel

1. Go to Project Settings → Git
2. Scroll to "Deploy Hooks"
3. Create a new hook:
   - Name: "Sanity Content Update"
   - Branch: main
4. Copy the webhook URL

### 5.2 Add Webhook in Sanity

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to "API" → "Webhooks"
4. Click "Create webhook"
5. Configure:
   - Name: "Vercel Deploy"
   - URL: Paste your Vercel deploy hook URL
   - Dataset: production
   - Trigger on: Create, Update, Delete
   - Filter: `_type == "post"`
6. Save

Now your site will automatically rebuild when you publish/update posts!

## Step 6: Verification Checklist

After deployment, verify everything works:

- [ ] Homepage loads correctly
- [ ] All navigation tabs work
- [ ] Blog index page shows posts
- [ ] Individual blog posts load
- [ ] RSS feed works (`/rss.xml`)
- [ ] Sitemap generated (`/sitemap-0.xml`)
- [ ] Favicon displays
- [ ] Mobile responsive
- [ ] SEO meta tags present
- [ ] OpenGraph tags work (test with Facebook Debugger)

## Step 7: Post-Deployment Tasks

### 7.1 Test Content Updates

1. Go to your Sanity Studio
2. Edit or create a blog post
3. Publish it
4. Wait 2-3 minutes for automatic rebuild
5. Verify post appears on your site

### 7.2 Monitor Build Status

- Check Vercel dashboard for build status
- Review build logs if issues occur
- Monitor bandwidth usage (should stay well within free tier)

### 7.3 Set Up Analytics (Optional)

Add Google Analytics or Vercel Analytics:

In `src/pages/index.astro` and blog pages, add before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Or enable Vercel Analytics in your project settings (free tier included).

## Troubleshooting

### Build Fails

**Problem**: Build fails with "Cannot find module"
**Solution**: Check `package.json` dependencies are correct, commit and push

**Problem**: Sanity connection error
**Solution**: Verify environment variables are set correctly in Vercel

### Content Not Updating

**Problem**: Published post doesn't appear
**Solution**: 
1. Check post is published (not draft) in Sanity
2. Manually trigger deploy in Vercel
3. Verify webhook is configured correctly

### Performance Issues

**Problem**: Site loads slowly
**Solution**: 
1. All blog content should be static (no runtime fetching)
2. Check Vercel analytics for bottlenecks
3. Ensure images in Sanity are optimized (<1MB)

## Free Tier Limits

Monitor your usage to stay within free tiers:

### Vercel Free Tier Limits
- 100GB bandwidth/month
- 100 deployments/day
- No bandwidth charges for static content

### Sanity Free Tier Limits
- 3 users
- 2 datasets  
- 10,000 documents
- Unlimited API requests (CDN cached)

This setup should comfortably handle:
- 10,000+ monthly visitors
- 100+ blog posts
- Daily content updates

## Scaling Beyond Free Tier

If you need more, consider:
- Vercel Pro ($20/month): 1TB bandwidth, faster builds
- Sanity Growth ($99/month): More users, datasets, support

But for most personal/small business sites, free tiers are plenty!

## Support

- **Astro Docs**: [docs.astro.build](https://docs.astro.build)
- **Sanity Docs**: [sanity.io/docs](https://sanity.io/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)

## Next Steps

1. Add more content to your site
2. Customize styling to match your brand
3. Add more sections to the homepage
4. Consider adding a newsletter signup
5. Implement proper SEO optimization
6. Add structured data for rich snippets

Happy deploying! 🚀
