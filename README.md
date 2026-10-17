# kations only+ — AI web app

A responsive Next.js AI assistant with:
- AI chat through a server-side API route
- AI image generation
- Browser speech-to-text voice input
- Conversation history saved in the current browser
- Responsive dark interface

## Requirements

- Node.js 20 or later
- An OpenAI API key with API billing/access enabled

## Run locally

1. Install Node.js from https://nodejs.org/
2. Extract this project and open a terminal in the project folder.
3. Run:

   ```bash
   npm install
   ```

4. Copy `.env.example` to `.env.local`.
5. Put your API key in `.env.local`:

   ```bash
   OPENAI_API_KEY=your_real_key_here
   ```

6. Start the site:

   ```bash
   npm run dev
   ```

7. Open http://localhost:3000

**Never put your API key in client-side code or a `NEXT_PUBLIC_` variable.** Do not commit `.env.local` to GitHub.

## Publish it publicly with Vercel

1. Create a GitHub account at https://github.com and a Vercel account at https://vercel.com.
2. Create a new GitHub repository and upload the contents of this folder (not the ZIP itself).
3. In Vercel, choose **Add New → Project**, import that repository, and deploy.
4. In the Vercel project, open **Settings → Environment Variables** and add:
   - Name: `OPENAI_API_KEY`
   - Value: your OpenAI API key
   - Environment: Production (and Preview if you want previews to work)
5. Redeploy after adding the variable.
6. Vercel will provide a public URL such as `https://your-project.vercel.app`. Share that URL.

Exact labels in hosting dashboards can change. If a build fails, check the deployment logs and the Node.js version setting.

## Important notes

- The API key is stored server-side; visitors do not receive it directly.
- API usage is billed by the API provider and is separate from a ChatGPT subscription. Set usage limits/alerts in the API account before sharing publicly.
- This starter does not include user accounts, cross-device cloud history, or per-user quotas. Chat history is saved in local browser storage, so it stays in that browser and can be cleared by the visitor.
- Voice input relies on browser speech-recognition support and microphone permission; support varies by browser/device and usually requires HTTPS on the published site.
- Public deployments should add rate limiting, abuse prevention, and usage monitoring before broad sharing. Without rate limits, other people can trigger API costs.
- Image generation requires API access to the selected image model and can cost more than text chat.
