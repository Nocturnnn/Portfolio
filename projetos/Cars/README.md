<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This repository contains a Next.js app generated from Google AI Studio.

View your app in AI Studio: https://ai.studio/apps/24f74afb-8bb0-48fd-87c7-c429e300a31e

## Run locally

**Prerequisites:** Node.js 20+ and npm.

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY`.
3. (Optional) In VS Code, install the recommended extensions:
   ```bash
   code --install-extension dbaeumer.vscode-eslint
   code --install-extension esbenp.prettier-vscode
   code --install-extension bradlc.vscode-tailwindcss
   ```
   Or just open the folder and accept recommendations from `.vscode/extensions.json`.
4. Run development server:
   ```bash
   npm run dev
   ```

## Available scripts

- `npm run dev` — starts Next.js in development mode.
- `npm run build` — creates production build.
- `npm run start` — starts production server.
- `npm run lint` — runs ESLint checks.
