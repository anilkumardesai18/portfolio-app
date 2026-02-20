# InfinityFree Deployment Guide

## Important Note ⚠️

InfinityFree is a **FREE PHP/HTML hosting service** that does NOT support Node.js. Your Next.js application requires Node.js to run on a server.

**This guide shows how to deploy a STATIC export of your portfolio**, which means:
- ✅ Your portfolio will be accessible
- ✅ All static pages and styling will work
- ❌ Dynamic features (API routes, server-side rendering) will NOT work
- ❌ Database connections won't work
- ❌ Next.js features like ISR won't work

**Recommended Alternative:** Use [Vercel](https://vercel.com) (FREE, supports full Next.js)

---

## Method 1: Static Export (Recommended for InfinityFree)

This method exports your Next.js app as static HTML/CSS/JS files.

### Step 1: Configure Next.js for Static Export

Edit `next.config.ts` and add output configuration:

```typescript
const nextConfig = {
  output: 'export',
  // Disable Image Optimization (InfinityFree limitation)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### Step 2: Build Static Files

Run these commands in your terminal:

```bash
# Install dependencies
npm install

# Build static export
npm run build
```

This creates an `out/` folder with static files.

### Step 3: Upload to InfinityFree

**Via File Manager (Web Interface):**

1. Log in to InfinityFree Dashboard
2. Go to **File Manager**
3. Navigate to `public_html` folder (or your domain folder)
4. **Delete** all existing files in public_html
5. Upload contents of the `out/` folder:
   - Copy all files and folders from your local `out/` directory
   - Upload them to public_html
6. **Important:** Make sure `index.html` is directly in public_html

**Via FTP (Alternative - Faster for large sites):**

1. Get FTP credentials from InfinityFree Dashboard → FTP Details
2. Use FileZilla or any FTP client
3. Connect to your server
4. Navigate to `public_html` folder
5. Delete existing files
6. Upload all files from your local `out/` folder
7. Ensure folder structure is: `public_html/index.html`, `public_html/_next/...`, etc.

### Step 4: Access Your Site

- Your portfolio will be live at: `https://anilkumardesai.free.nf`
- All pages should be accessible

---

## Handling Next.js Routing

InfinityFree requires special configuration for Next.js routes:

### Option A: Use .htaccess (Recommended)

Create `.htaccess` file in public_html with:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # If the requested path is not a file or directory
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Rewrite to index.html
  RewriteRule ^ index.html [QSA,L]
</IfModule>
```

### Option B: Simple Pages Only

If using simple pages without complex routing, just upload the HTML files.

---

## Project Structure After Build

Your `out/` folder should look like:

```
out/
├── index.html           # Home page
├── about.html          # About page (if created)
├── _next/              # Next.js assets
│   ├── static/
│   └── data/
├── public/             # Your public assets
│   └── favicon.ico
└── sitemap.xml         # Auto-generated
```

---

## Troubleshooting

### Issue: 404 errors on routes
**Solution:** Upload `.htaccess` file to public_html

### Issue: Styles not loading
**Solution:** Check that `_next` folder is uploaded completely

### Issue: Images not showing
**Solution:** Ensure `public/` folder is uploaded to public_html

### Issue: Dynamic features not working
**Expected behavior** - InfinityFree doesn't support server-side rendering
**Use Vercel instead** for full Next.js features

---

## Performance Notes

- InfinityFree has slower servers (free hosting)
- First load may take 10-15 seconds
- Consider upgrading to paid hosting for better speed
- Vercel's free tier is faster and better for Next.js

---

## Best Practices

1. **Always backup** your InfinityFree files before uploading new versions
2. **Test locally** with `npm run build && npm run start` before uploading
3. **Minimize images** before uploading (InfinityFree has bandwidth limits)
4. **Check file size** - free tier has storage limits
5. **Monitor traffic** - free tier has bandwidth limits

---

## Step-by-Step Upload Instructions

### Using InfinityFree File Manager:

1. Build your project locally:
   ```bash
   npm run build
   ```

2. Open `out/` folder on your computer

3. Log in to InfinityFree Dashboard

4. Click **File Manager** for your account `if0_41206230`

5. You'll see public_html folder - click it

6. Click **Upload** button

7. Select all files from your `out/` folder:
   - `index.html`
   - `_next` folder
   - `public` folder
   - Other HTML files

8. Wait for upload to complete

9. Visit `https://anilkumardesai.free.nf` - your site should load!

---

## Automatic Deployment (Advanced)

For automatic updates when you push to GitHub:

1. Set up a build script that:
   - Pulls latest code from GitHub
   - Runs `npm install && npm run build`
   - Uploads `out/` to InfinityFree via FTP

2. Use services like GitHub Actions + FTP Deploy

3. Or use a CI/CD pipeline service

---

## Comparison: InfinityFree vs Vercel

| Feature | InfinityFree | Vercel |
|---------|--------------|--------|
| **Cost** | Free | Free |
| **Node.js Support** | ❌ No | ✅ Yes |
| **Next.js Support** | ⚠️ Static Only | ✅ Full |
| **Speed** | Slow | Fast |
| **Uptime** | ~95% | ~99.9% |
| **Bandwidth** | Limited | Unlimited |
| **Storage** | Limited | Unlimited |
| **SSL** | ✅ Yes | ✅ Yes |
| **Custom Domain** | ✅ Yes | ✅ Yes |

---

## Recommendations

**Use InfinityFree if:**
- You want completely free hosting
- You have a simple static portfolio
- You don't need server-side features

**Use Vercel if:**
- You want to use full Next.js features
- You need better performance
- You have dynamic content or APIs
- You want automatic deployments

---

## Support

For issues:
1. Check InfinityFree documentation: https://www.infinityfree.net/
2. Check Next.js static export docs: https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
3. Create an issue on GitHub

---

**Last Updated:** February 2026
**Version:** 1.0
