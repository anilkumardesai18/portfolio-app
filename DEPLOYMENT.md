# Portfolio App - Deployment Guide

This guide covers deploying your Portfolio App to various hosting platforms.

## Quick Start - Vercel (Recommended)

Vercel is the official Next.js hosting platform with zero-config deployments.

### Steps:

1. **Push to GitHub**
   ```bash
   git push origin master
   ```

2. **Import on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select `anilkumardesai18/portfolio-app`

3. **Configure Environment Variables**
   - In Vercel dashboard, go to "Settings" → "Environment Variables"
   - Add all variables from `.env.example`
   - Save and redeploy

4. **Deploy**
   - Vercel automatically deploys on every push to master
   - Your app is live at `your-app.vercel.app`

## Custom Domain Setup

### Vercel Domain Configuration:

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain (e.g., `yourportfolio.com`)
3. Update your domain registrar DNS settings:
   ```
   CNAME: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (usually 24-48 hours)

### For Indian Domain Registrars (Godaddy, NameCheap, etc.):

1. Log in to your registrar account
2. Go to DNS Settings
3. Add CNAME record pointing to `cname.vercel-dns.com`
4. Verify in Vercel dashboard

## Alternative Deployment Options

### 1. Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod
```

### 2. Railway

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Select "Deploy from GitHub"
4. Connect repository
5. Add environment variables
6. Deploy

### 3. Docker + Self-Hosted

#### Create Dockerfile:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .next ./
COPY public ./public

EXPOSE 3000

CMD ["npm", "start"]
```

#### Build and Run:

```bash
# Build image
docker build -t portfolio-app .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://yourdomain.com \
  portfolio-app
```

### 4. AWS

#### Using Amplify:

1. Go to AWS Amplify Console
2. Connect GitHub repository
3. Configure build settings
4. Deploy

#### Using EC2:

```bash
# SSH into your server
ssh -i your-key.pem ubuntu@your-instance-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone https://github.com/anilkumardesai18/portfolio-app.git
cd portfolio-app

# Install dependencies and build
npm install
npm run build

# Start with PM2
npm install -g pm2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
```

### 5. Heroku (Free tier deprecated)

Vercel or Railway recommended instead.

## Environment Variables for Production

Ensure these are set in your hosting platform:

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Your Name
NEXT_PUBLIC_CONTACT_EMAIL=your@email.com
API_SECRET_KEY=your_secure_key
```

## CI/CD Pipeline

Your GitHub Actions workflow automatically:
- ✅ Runs on every push
- ✅ Installs dependencies
- ✅ Runs linter (ESLint)
- ✅ Builds the project
- ✅ Uploads artifacts

## Performance Optimization

### Vercel Optimizations (Automatic):
- ✅ Image optimization
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Edge caching

### Manual Optimizations:

1. **Enable Static Generation** (if applicable)
   ```typescript
   export const revalidate = 3600; // Revalidate every hour
   ```

2. **Image Optimization**
   ```typescript
   import Image from 'next/image';
   
   <Image
     src="/path/to/image.jpg"
     alt="Description"
     width={800}
     height={600}
     priority={false}
   />
   ```

3. **Code Splitting**
   ```typescript
   import dynamic from 'next/dynamic';
   
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <p>Loading...</p>,
   });
   ```

## Monitoring & Analytics

### Vercel Analytics:
- Built-in performance monitoring
- Core Web Vitals tracking
- Error tracking

### Custom Analytics (Optional):

```typescript
// Add Google Analytics
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
```

## SSL/HTTPS

- **Vercel**: Automatic with Let's Encrypt
- **Custom Domain**: Automatic after DNS setup
- **Self-hosted**: Use Certbot

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com
```

## Troubleshooting

### Build Fails
- Check `npm run build` locally
- Verify all environment variables
- Check GitHub Actions logs

### 404 Errors
- Verify routes exist in `src/app`
- Check Next.js router configuration
- Clear cache and rebuild

### Performance Issues
- Use Vercel Analytics
- Check bundle size: `npm run build`
- Optimize images
- Enable caching

### CORS Issues
- Configure headers in `next.config.ts`
```typescript
const nextConfig = {
  headers: async () => [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
      ],
    },
  ],
};
```

## Rollback & Versioning

### Vercel Rollback:
1. Dashboard → Deployments
2. Find previous deployment
3. Click "Promote to Production"

### Git Rollback:
```bash
# Revert to previous commit
git revert HEAD
git push origin master

# Or reset to specific commit
git reset --hard <commit-hash>
git push origin master --force
```

## Security Best Practices

- ✅ Keep dependencies updated: `npm audit fix`
- ✅ Use environment variables for secrets
- ✅ Enable GitHub branch protection
- ✅ Use HTTPS only
- ✅ Set secure headers in Next.js config
- ✅ Regular security audits

## Post-Deployment Checklist

- [ ] Domain pointing correctly
- [ ] SSL certificate active
- [ ] Environment variables configured
- [ ] Contact form working (if applicable)
- [ ] Analytics tracking
- [ ] Social media links working
- [ ] Mobile responsiveness verified
- [ ] Performance metrics acceptable
- [ ] Backup strategy in place

## Support & Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/learn-pages-router/basics/deploying-nextjs-app)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com)

---

**Last Updated**: February 2026
**Version**: 1.0
