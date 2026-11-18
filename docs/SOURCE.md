# Application source map

This repository shares selected frontend source from Heynomus. The interface is built with Next.js, React, TypeScript, Tailwind CSS, and Privy.

| File | Role |
| --- | --- |
| [app/page.tsx](../app/page.tsx) | Workspace overview. |
| [app/[...path]/page.tsx](../app/[...path]/page.tsx) | Product routes and project records. |
| [app/globals.css](../app/globals.css) | Workspace styling and responsive layout. |
| [components/research-app.tsx](../components/research-app.tsx) | Sidebar, explorer, project views, radar, activity feeds, comparisons, watchlist, and research terminal. |
| [components/ai-research.tsx](../components/ai-research.tsx) | Project questions, conversations, and cited answers. |
| [components/x-research-page.tsx](../components/x-research-page.tsx) | Public X report search, evidence, sources, and open questions. |
| [components/auth-provider.tsx](../components/auth-provider.tsx) | Account context and sign-in interface. |
| [components/privy-session.tsx](../components/privy-session.tsx) | Privy Google, email, and wallet connection. |
| [components/account-page.tsx](../components/account-page.tsx) | Account and workspace controls. |
| [lib/client-api.ts](../lib/client-api.ts) | Browser request helper for authenticated workspace calls. |
| [lib/types.ts](../lib/types.ts) | Project types, date formatting, and safe source links. |
| [public/openapi.json](../public/openapi.json) | Public API reference. |
| [public/skill.md](../public/skill.md) | Evidence-handling instructions for research agents. |

The source includes the standard frontend package manifest and build configuration. It expects the Heynomus API at same-origin `/api/*` paths. It does not include those services or a local research dataset. The full workspace is available at [heynomus.xyz](https://heynomus.xyz).
