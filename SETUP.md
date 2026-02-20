# Portfolio App - Complete Setup Guide

## Overview
This is a modern portfolio application built with Next.js 16.1.6, React 19, TypeScript, and Tailwind CSS v4. This guide will help you set up and configure the application for development and production.

## Project Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Runtime**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with PostCSS
- **Linting**: ESLint 9 with Next.js config
- **Package Manager**: npm (recommended), yarn, pnpm, or bun

## Prerequisites

- Node.js 18.17 or later
- npm 8.0+ (or yarn 3.0+, pnpm 7.0+, bun 1.0+)
- Git
- Text editor (VS Code recommended)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/anilkumardesai18/portfolio-app.git
cd portfolio-app
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using your preferred package manager:
```bash
yarn install
# or
pnpm install
# or
bun install
```

### 3. Create Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the template
cp .env.example .env.local  # if available
# Or create manually
touch .env.local
```

Add any necessary environment variables:

```
# Example - Add your variables here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Name
```

### 4. Run Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
pnpm dev
bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
portfolio-app/
├── src/
│   └── app/                 # Next.js App Router
│       ├── layout.tsx       # Root layout
│       ├── page.tsx         # Home page
│       ├── globals.css      # Global styles
│       └── favicon.ico      # Site favicon
├── public/                  # Static assets
│   └── [images, fonts, etc]
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── next.config.ts           # Next.js config
├── tailwind.config.js       # Tailwind CSS config
├── postcss.config.mjs       # PostCSS config
├── eslint.config.mjs        # ESLint config
└── README.md                # Project readme
```

## Configuration Files

### TypeScript (tsconfig.json)

- **Target**: ES2017
- **Module Resolution**: bundler with path aliases
- **Path Aliases**: `@/*` maps to `./src/*`
- **JSX**: React 17+ transform

### Tailwind CSS (tailwind.config.js)

- **Version**: 4.x with new powerful features
- **CSS-First Approach**: Configuration in CSS
- **Extends**: Theme customization available

### Next.js Config (next.config.ts)

- TypeScript-based configuration
- Supports image optimization, routing, and middleware
- Comment section for custom options

### ESLint (eslint.config.mjs)

- Next.js recommended rules
- TypeScript support
- Ignores: `.next/*`, `out/*`, `build/*`, `next-env.d.ts`

## Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot reload.

### Production Build
```bash
npm run build
```
Creates an optimized production build.

### Production Server
```bash
npm start
```
Runs the built application in production mode.

### Linting
```bash
npm run lint
```
Runs ESLint to check code quality and style.

## Development Workflow

### Adding New Pages

1. Create a new file in `src/app/[route]/page.tsx`
2. Export default React component
3. Next.js automatically creates the route

Example:
```typescript
// src/app/about/page.tsx
export default function About() {
  return <h1>About Me</h1>
}
```

### Using Tailwind CSS

Add Tailwind classes to your components:

```tsx
<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
  <h1 className="text-4xl font-bold text-white">Hello World</h1>
</div>
```

### Creating Components

Store reusable components in a `components` directory:

```
src/
├── app/
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Navigation.tsx
│   └── Footer.tsx
└── lib/
    └── utils.ts
```

## Building for Production

### Local Build Testing

```bash
npm run build
npm start
```

This will create an optimized build and start the production server locally.

### Build Output

The build creates:
- `.next/` - Build artifacts
- `out/` - Static export (if configured)
- Optimized JavaScript bundles
- Minified CSS
- Image optimization

### Performance Optimization

Next.js automatically:
- Code splits routes
- Minifies JavaScript and CSS
- Optimizes images
- Lazy loads components

## Deployment Options

### Vercel (Recommended)

Vercel is the official hosting platform for Next.js:

1. Push code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Deploy with one click

### Other Platforms

- **Docker**: Create a Dockerfile for containerization
- **Self-hosted**: Deploy to your own server
- **Netlify**: Supports Next.js with build configuration
- **Railway, Render**: Modern hosting platforms

## Environment Variables

### Public Variables

Prefix with `NEXT_PUBLIC_` to expose to browser:

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Your Name
NEXT_PUBLIC_CONTACT_EMAIL=you@example.com
```

### Secret Variables

These are only available on server:

```
API_SECRET_KEY=your_secret_key
DATABASE_URL=your_database_url
```

## Troubleshooting

### Port Already in Use

```bash
# Use different port
npm run dev -- -p 3001
```

### Node Modules Issues

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Generate type definitions
npm run build
```

### CSS Not Loading

- Ensure Tailwind CSS classes are in your JSX
- Rebuild with `npm run build`
- Check `globals.css` is imported in layout

## Code Quality

### Running Linter

```bash
npm run lint
```

### Fix Linting Issues

```bash
npm run lint -- --fix
```

## Git Workflow

### Initial Commit (if not done)

```bash
git add .
git commit -m "Initial project setup"
git push origin master
```

### Feature Branches

```bash
git checkout -b feature/your-feature-name
# Make changes
git add .
git commit -m "Add your feature"
git push origin feature/your-feature-name
```

## Next Steps

1. **Customize Content**: Edit `src/app/page.tsx` with your portfolio content
2. **Add Pages**: Create routes for About, Projects, Contact, etc.
3. **Style Your Brand**: Customize Tailwind configuration
4. **Add Images**: Place images in `public/` directory
5. **Deploy**: Push to GitHub and deploy via Vercel or your hosting
6. **Domain Setup**: Point your custom domain to hosted site

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)

## Support & Contributing

For issues or contributions:
1. Create an Issue with detailed description
2. Fork the repository
3. Create a feature branch
4. Submit a Pull Request

## License

This project is open source and available under the MIT License.

---

**Last Updated**: February 2026
**Version**: 0.1.0
