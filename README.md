# Glimpsy

Glimpsy is an opportunity intelligence workspace for freelance web developers. It normalizes project listings from multiple freelance platforms so developers can compare the request, timeline, budget, required stack, and overall fit without jumping between marketplaces.

## Current milestone

The repository currently contains:

- A responsive premium SaaS landing page.
- A filterable opportunity discovery workspace.
- Representative multi-platform demo opportunities.
- A normalized `FreelanceOpportunity` domain model.
- Platform-neutral formatting and presentation logic.
- Responsive and reduced-motion-aware styling.

The demo listings intentionally do **not** claim to be live marketplace projects. Real source adapters, persistence, authentication, deduplication, and matching intelligence are the next infrastructure layers.

## Tech stack

- Next.js 16.4
- React 19.3
- TypeScript with strict checking
- Plain CSS design system to keep the first milestone dependency-light

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for the landing page and `http://localhost:3000/opportunities` for the discovery workspace.

## Verification

```bash
npm run typecheck
npm run build
```

The GitHub Actions workflow runs both checks on pushes and pull requests targeting `main`.

## Architecture

```text
src/
├── app/                              # Next.js routes and page composition
├── components/                       # Shared application components
└── features/
    └── opportunities/
        ├── components/               # Opportunity-specific presentation
        ├── data/                     # Temporary representative demo data
        ├── lib/                      # Domain formatting and small utilities
        └── types/                    # Stable application-facing contracts
```

The core rule is simple: **source-specific payloads must never leak into the UI**.

Future integrations should live behind source adapters that translate marketplace data into `FreelanceOpportunity` before the rest of the application sees it.

```text
Marketplace payload
       ↓
Source adapter
       ↓
FreelanceOpportunity
       ↓
Deduplication / matching / persistence
       ↓
Application UI
```

## Engineering principles

1. Prefer explicit, human-readable names over abbreviations.
2. Keep functions and components focused on one responsibility.
3. Keep source integrations separate from product business logic.
4. Add abstractions only when they remove real repetition or platform coupling.
5. Use comments for business rules and non-obvious decisions, not obvious syntax.
6. Treat accessibility, responsiveness, and failure isolation as product requirements.
