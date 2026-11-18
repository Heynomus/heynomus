<p align="center"><img src="public/brand/heynomus-symbol.png" alt="Heynomus" width="88" /></p>

<h1 align="center">Heynomus</h1>
<p align="center">Evidence-first research for Robinhood Chain.</p>
<p align="center"><a href="https://heynomus.xyz">Website</a> · <a href="https://x.com/heynomus">X</a> · <a href="docs/X-RESEARCH.md">X Research</a> · <a href="NOTICE.md">Sources and attribution</a></p>

Heynomus connects public project identity, development activity, contract observations, and research coverage in one workspace. Every observation keeps its source and timestamp. Missing evidence stays visible.

## What is included

- **Project discovery:** search the catalogue, explore narratives, inspect source links, compare projects, and follow counted development events.
- **Public evidence:** GitHub releases and substantive code changes, linked website observations, contract reads, market readings, and explicitly partial watched-contract activity.
- **Private workspaces:** Google, email, and external EVM wallet authentication through Privy; account-scoped watchlists, notes, submissions, and AI conversations.
- **AI research:** InferHub summaries grounded in bounded public evidence, with numbered citations and rejection of unknown citation IDs. Private notes are excluded from inference context.
- **X Research:** explicit mention requests, persistent queues, source-backed reports at `/x-research`, cached summaries, opt-out controls, draft/live modes, conservative budget reservations, and duplicate-dispatch protection.
- **Operations:** an administrator workspace, worker checkpoints, source retries and cooldowns, health checks, database migrations, and consistent SQLite backups.

Features are implemented in this source. Real-provider availability depends on credentials, permissions, funding, source coverage, and configuration. Automated tests use mocked providers; they do not establish that a production X reply or OAuth session has succeeded.

## Stack

| Layer | Implementation |
| --- | --- |
| Web | Next.js 16, React 19, TypeScript, Tailwind |
| Identity | Privy access-token verification and account-scoped authorization |
| Data | Node SQLite in WAL mode; schema migrations managed with Drizzle |
| Research | Separate Node worker for public sources and chain 4663 |
| Inference | InferHub, with configurable models and bounded context |
| X | Official API; public reads and owner-context replies |
| VPS | PM2 processes behind nginx |

## Run locally

Requirements: Node **22.16+**, npm, and Python 3 for the configuration wizards.

```bash
npm ci
cp .env.example .env.local
# Fill the settings needed for your environment; use the actual local origin.
npm run worker:build
npm run x:build
npm run dev
```

The local web server listens on `http://127.0.0.1:3120`. Set `HEYNOMUS_ORIGIN` to that exact origin for local API mutations. Enable the same origin in your Privy app if you want to test sign-in. With no configured account provider, sign-in remains pending. A new database starts with the included licensed identity seed and does not invent activity or market history.

Set `INFERHUB_MODEL` to an exact model available to your key. `ROBINHOOD_RPC_URLS` accepts comma-separated mainnet RPC endpoints; the worker checks chain **4663**. Production collection should use adequate provider quotas and suitable RPC capacity.

```bash
npm run worker:once  # collects actual public sources; needs configured providers
npm run worker      # continuous research collector
```

Never run collection or live X commands with production credentials as a test fixture.

## Configure a VPS

The supplied production setup targets **https://heynomus.xyz**, with the web process at **127.0.0.1:3120**.

```bash
cd /var/www/heynomus
npm run configure
bash deploy/install-vps.sh
```

The configuration wizard masks credentials and writes `.env.local`. It verifies the authenticated InferHub model catalogue. Enable Google, email, and wallet sign-in in Privy and allow the exact production origin. Copy the verified Privy DID from `/account` into `HEYNOMUS_ADMIN_DIDS` to enable the administrator workspace.

On a fresh host, review `deploy/activate-nginx.sh` and the certificate setup before activation. On an existing HTTPS host, preserve its working TLS configuration. See [production checks](docs/PRODUCTION-CHECKLIST.md) and [validation notes](docs/VALIDATION.md).

The file-backed PM2 configuration must be reloaded after environment changes:

```bash
pm2 startOrReload deploy/ecosystem.config.cjs --update-env
npm run doctor
```

`npm run doctor` checks configured providers and can perform network reads. `npm run backup` creates a consistent local backup; private backups also need an independently protected off-VPS destination.

## Enable X Research

```bash
npm run x:configure
bash deploy/install-x-worker.sh
npm run x:status
```

The separate `heynomus-x-worker` has no listening port. Example configuration defaults to **off**. Draft mode can perform paid reads and inference but sends no replies. Live AI replies require X's prior written approval, owner credentials, sufficient API credits, and appropriate app permissions.

A public request looks like:

```text
@heynomus check this project
```

Include one exact Robinhood Chain contract or official website, or reply to a public project post with an identifiable source. The first enabled poll skips historical mentions. Reports distinguish observed facts, project claims, derived labels, and unknowns. Outgoing replies use a report ID and contain no URL; full evidence is accessible from the profile's website.

`@heynomus stop` opts out; `@heynomus start` resumes. Drafts require explicit approval before dispatch. Ambiguous write outcomes are retained as uncertain and never resent automatically. Budget figures are conservative local estimates, not provider invoices.

Read [X setup, budgets, and operations](docs/X-RESEARCH.md) before enabling live mode.

## Validate changes

```bash
npm run check:public
npm test
npm run x:test
npm run worker:build
npm run x:build
npm run build
```

The test suites use isolated databases and mocked providers. CI requires no production API keys and does not deploy or publish replies.

## Repository map

| Path | Purpose |
| --- | --- |
| `app/`, `components/` | Public research workspace, account controls, and API routes |
| `lib/` | Authorization, evidence projections, inference, and database adapters |
| `worker/` | Research collector and isolated X research bot |
| `db/`, `drizzle/` | Database schema, migration history, and licensed seed |
| `deploy/`, `scripts/` | VPS services, builds, configuration, backups, and checks |
| `tests/` | Backend, domain, and X worker tests |
| `public/` | Brand assets, fonts, OpenAPI, and agent instructions |
| `docs/` | Operations, validation, and X Research documentation |

## Research limits and attribution

A token deployment does not establish a working product. Code activity does not establish a deployment. Contract usage is partial unless complete coverage is explicitly shown. Reports do not establish contract security or provide investment recommendations.

Licensed directory candidates retain their source release and attribution. Ongoing observations are collected independently from public sources. See [NOTICE.md](NOTICE.md) and the retained third-party license files. No new project-wide open-source license is selected by this package.

See [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md), and [GitHub setup](GITHUB-SETUP.md).
