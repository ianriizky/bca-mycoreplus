# Deployment Guide

## Overview

BCA MyCore+ is a static site application that can be deployed to any static hosting service. The application runs 100% in the browser with no backend server required.

## Build Process

### Prerequisites

- Node.js 18.0.0+
- Bun 1.0.0+ or npm 9.0.0+
- Git 2.30.0+

### Build Command

```bash
# Using Bun (recommended)
bun run build

# Using npm
npm run build
```

### Build Output

- **Location**: `dist/` directory
- **Files**:
  - `index.html` - Main HTML file
  - `assets/` - JavaScript, CSS, images
  - `favicon.svg` - Site favicon

### Build Optimization

The build process automatically:

1. **Compiles TypeScript** to JavaScript
2. **Bundles modules** with Vite
3. **Minifies code** for smaller file size
4. **Optimizes CSS** with Tailwind
5. **Optimizes images** and assets
6. **Generates source maps** for debugging
7. **Creates production bundle** (~102KB gzipped)

### Verify Build

```bash
# Preview production build locally
bun run preview
# or
npm run preview
```

Visit `http://localhost:4173` to verify the build works correctly.

## Deployment Options

### GitHub Pages

#### Setup

1. **Ensure repository is on GitHub**:

   ```bash
   git remote -v
   # Should show origin pointing to GitHub
   ```

2. **Configure GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (will be created)
   - Folder: `/ (root)`

#### Deployment

```bash
# Deploy to GitHub Pages
bun run deploy
# or
npm run deploy
```

This command:

1. Builds production bundle
2. Creates `gh-pages` branch
3. Pushes `dist/` folder to `gh-pages`
4. GitHub Pages automatically deploys

#### Access

Your site will be available at:

```
https://ianrizky.github.io/bca-mycoreplus/
```

### Vercel

#### Setup

1. **Install Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:

   ```bash
   vercel login
   ```

3. **Link project**:
   ```bash
   vercel link
   ```

#### Deployment

```bash
# Deploy to Vercel
vercel
```

Or enable automatic deployments:

1. Go to Vercel dashboard
2. Connect GitHub repository
3. Configure build settings:
   - Build Command: `bun run build`
   - Output Directory: `dist`

#### Access

Your site will be available at:

```
https://bca-mycoreplus.vercel.app/
```

### Netlify

#### Setup

1. **Install Netlify CLI**:

   ```bash
   npm i -g netlify-cli
   ```

2. **Login to Netlify**:

   ```bash
   netlify login
   ```

3. **Link project**:
   ```bash
   netlify link
   ```

#### Deployment

```bash
# Deploy to Netlify
netlify deploy --prod
```

Or enable automatic deployments:

1. Go to Netlify dashboard
2. Connect GitHub repository
3. Configure build settings:
   - Build Command: `bun run build`
   - Publish Directory: `dist`

#### Access

Your site will be available at:

```
https://bca-mycoreplus.netlify.app/
```

### AWS S3 + CloudFront

#### Setup

1. **Create S3 bucket**:

   ```bash
   aws s3 mb s3://bca-mycoreplus --region us-east-1
   ```

2. **Enable static website hosting**:

   ```bash
   aws s3 website s3://bca-mycoreplus \
     --index-document index.html \
     --error-document index.html
   ```

3. **Create CloudFront distribution**:
   - Origin: S3 bucket
   - Default Root Object: `index.html`
   - Error responses: 404 → index.html

#### Deployment

```bash
# Build and deploy to S3
bun run build
aws s3 sync dist/ s3://bca-mycoreplus --delete
aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"
```

### Docker

#### Dockerfile

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf

```nginx
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    try_files $uri $uri/ /index.html;
  }
}
```

#### Build and Run

```bash
# Build Docker image
docker build -t bca-mycoreplus .

# Run container
docker run -p 80:80 bca-mycoreplus
```

## Performance Optimization Checklist

### Before Deployment

- [ ] Run production build: `bun run build`
- [ ] Verify build size: `ls -lh dist/`
- [ ] Test production build locally: `bun run preview`
- [ ] Run all tests: `bun run test`
- [ ] Check for TypeScript errors: `npx tsc --noEmit`
- [ ] Run ESLint: `npx eslint src/`
- [ ] Check accessibility: Run Lighthouse audit

### Build Optimization

- [ ] Enable gzip compression on server
- [ ] Set cache headers for assets
- [ ] Use CDN for static assets
- [ ] Enable HTTP/2 on server
- [ ] Minify HTML, CSS, JavaScript
- [ ] Optimize images (already done by Vite)

### Runtime Optimization

- [ ] Monitor Core Web Vitals
- [ ] Check bundle size: `npm run build:analyze`
- [ ] Profile with React DevTools
- [ ] Monitor memory usage
- [ ] Test on slow networks (DevTools throttling)
- [ ] Test on low-end devices

## Monitoring & Debugging

### Performance Monitoring

#### Lighthouse Audit

1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Click "Analyze page load"
4. Review scores:
   - Performance: Target 90+
   - Accessibility: Target 90+
   - Best Practices: Target 90+
   - SEO: Target 90+

#### Core Web Vitals

Monitor in production:

```typescript
// Add to main.tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

### Error Tracking

#### Browser Console

1. Open DevTools Console
2. Check for errors
3. Check for warnings
4. Monitor network requests

#### Error Logging

```typescript
// Add global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
  // Send to error tracking service
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason)
  // Send to error tracking service
})
```

### Analytics

Since this is a zero-server app, use client-side analytics:

```typescript
// Example: Google Analytics
import { useEffect } from 'react'

export function Analytics() {
  useEffect(() => {
    // Initialize analytics
    window.gtag?.('config', 'GA_MEASUREMENT_ID')
  }, [])
  return null
}
```

## Rollback Procedure

### GitHub Pages

```bash
# Revert to previous deployment
git revert <commit-hash>
git push origin main
bun run deploy
```

### Vercel

1. Go to Vercel dashboard
2. Select project
3. Go to Deployments
4. Click "Promote to Production" on previous deployment

### Netlify

1. Go to Netlify dashboard
2. Select site
3. Go to Deploys
4. Click "Publish deploy" on previous deployment

## Environment-Specific Configuration

### Development

```bash
bun run dev
```

- Hot Module Replacement enabled
- Source maps enabled
- Debug logging enabled
- No minification

### Staging

```bash
bun run build
bun run preview
```

- Production build
- Full optimization
- Source maps enabled
- Ready for testing

### Production

```bash
bun run build
# Deploy to hosting service
```

- Production build
- Full optimization
- Minified code
- No source maps (optional)

## Security Checklist

- [ ] No sensitive data in code
- [ ] No API keys in code
- [ ] HTTPS enabled on server
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Content Security Policy set
- [ ] No vulnerable dependencies

### Security Headers

Add to server configuration:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf dist node_modules
bun install
bun run build
```

### Deployment Fails

1. Check build output: `bun run build`
2. Verify dist/ folder exists
3. Check deployment service logs
4. Verify authentication credentials

### Site Not Loading

1. Check browser console for errors
2. Check network tab for failed requests
3. Verify index.html is being served
4. Check server configuration

### Performance Issues

1. Run Lighthouse audit
2. Check bundle size: `ls -lh dist/`
3. Profile with DevTools
4. Check for memory leaks
5. Monitor Core Web Vitals

## Maintenance

### Regular Tasks

- [ ] Monitor error logs weekly
- [ ] Check performance metrics weekly
- [ ] Update dependencies monthly
- [ ] Run security audit monthly
- [ ] Review analytics monthly

### Update Dependencies

```bash
# Check for updates
bun outdated
# or
npm outdated

# Update all dependencies
bun update
# or
npm update

# Update specific package
bun add package@latest
# or
npm install package@latest
```

### Backup

```bash
# Backup current deployment
git tag -a v1.0.0 -m "Production release"
git push origin v1.0.0
```

## Cost Estimation

### GitHub Pages

- **Cost**: Free
- **Bandwidth**: Unlimited
- **Storage**: 1GB per repository

### Vercel

- **Cost**: Free tier available
- **Bandwidth**: 100GB/month free
- **Deployments**: Unlimited

### Netlify

- **Cost**: Free tier available
- **Bandwidth**: 100GB/month free
- **Deployments**: Unlimited

### AWS S3 + CloudFront

- **Cost**: ~$0.50-2/month
- **Bandwidth**: $0.085/GB
- **Requests**: $0.0075 per 10k requests

## Support

For deployment issues:

1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Review hosting service documentation
3. Check GitHub issues
4. Contact hosting service support

---

**Last Updated**: 2026-05-10
**Version**: 1.0.0
