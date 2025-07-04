# AI Portfolio Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# OpenRouter API Key for AI Chat functionality
# Get your free API key from: https://openrouter.ai/
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Optional: Your Vercel deployment URL (auto-detected in production)
# VERCEL_URL=your-portfolio.vercel.app
```

## Getting Your OpenRouter API Key

1. Visit [OpenRouter](https://openrouter.ai/)
2. Sign up for a free account
3. Navigate to your API keys section
4. Create a new API key
5. Copy the key and paste it in your `.env.local` file

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- **Homepage**: Modern landing page with your bio and call-to-action buttons
- **Projects Page**: Showcase your projects with tech stack badges and links
- **AI Chat**: Interactive chatbot powered by GPT-3.5 via OpenRouter
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Mode Support**: Automatic dark/light mode based on system preferences

## Customization

- Update your name and bio in `src/app/page.tsx`
- Add/modify projects in `src/app/data/projects.ts`
- Customize the AI assistant's personality in `src/app/chat/page.tsx`
- Update the resume file path in the homepage (currently points to `/Vigneshwaran_Resume.pdf`)

## Deployment

The application is ready to deploy on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **AI**: OpenRouter API (GPT-3.5)
- **Deployment**: Vercel (recommended) 