# khantphyowai.vercel.app

Khant Phyo Wai's portfolio: a Next.js site exported as static files.

## Editing

All the words on the page live in [`content/site.ts`](content/site.ts): facts, the "How I work" steps, the case studies (including their flow diagrams), more work, the changelog and the known issues. Edit that file; the components only handle layout.

The hero diagram is hand-placed in [`components/SystemDiagram.tsx`](components/SystemDiagram.tsx), with a wide layout for desktop and a tall one for phones.

## Running

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/, plus the share card at out/og.png
```

Vercel builds it automatically on push (`vercel.json` pins the Next.js preset).
