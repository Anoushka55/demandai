# DemandIQ

An autonomous Demand & Supply Planning Agent UI demo, built with Next.js 14, TypeScript, and Tailwind CSS.

## What's inside

- **Home / Overview** — KPI cards, FA trend chart, top issues
- **Data Health** — Health Check Agent surface: data sources, detected issues, DQ alerts, activity log
- **KPI & Demand Sensing** — FA / Bias trends with target bands, sell-in vs offtake comparison, promo realization
- **Exception Report** — Expandable rows showing the agent's reasoning trace, confidence breakdown, similar cases, and Auto-Resolve / Escalate actions
- **Coverage & Reallocation** — Supply Agent surface with stock coverage analysis and reallocation approvals
- **Governance Pre-Reads** — Auto-compiled S&OP pack with editable narrative
- **Learning Dashboard** — Override log, validation rate, confidence-over-cycles trend
- **AI Assistant** — Conversational layer with preset questions and rule-based answers grounded in the mock data
- **Floating chatbot button** (bottom-right) — quick link to the Assistant
- **AI Architecture diagram** (header button) — animated modal showing the 3-agent architecture, decision engine, outputs, and learning loop

## Key design decisions

- **SKU demand-pattern segmentation** (Stable / Seasonal / Erratic / New) shown across the app
- **Self-learning confidence score** — computed in `lib/mockData.ts → computeConfidence()` from the historical override-log validation rate per root-cause tag, recency-weighted, with rule-strength and segment adjustments
- **Explainable RCA rule engine** — `detectRcaSignals()` + `classifyRootCause()` produce the tag plus the list of signals that fired
- **No file upload** — pre-loaded synthetic data filtered via dropdowns (SKU / Depot / Account / Brand / Period)
- **Auth is local-only** — entering a name on the login screen is stored in `localStorage`

## Stack

- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 3
- Recharts (charts)
- Lucide React (icons)
- Custom shadcn-style components (no external UI library)

## Running locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Enter a name on the login screen to access the app.

To build for production:

```bash
npm run build
npm run start
```

## File map

```
app/
  layout.tsx                # Root layout with providers
  globals.css               # Tailwind + custom styles
  login/                    # Login screen (outside route group)
  (app)/                    # Authenticated routes — has sidebar + header
    layout.tsx
    page.tsx                # Home
    data-health/
    kpi-demand-sensing/
    exceptions/
    coverage/
    governance/
    learning/
    assistant/
components/
  ArchitectureDialog.tsx    # Animated architecture modal
  AgentInsightCard.tsx
  FloatingChatButton.tsx
  Sidebar.tsx
  Header.tsx
  FilterBar.tsx
  Card.tsx, Badge.tsx, Button.tsx, Select.tsx
lib/
  mockData.ts               # Types, seeded data generation, segmentation, confidence + RCA logic
  options.ts                # Dropdown options and filter helpers
  assistant.ts              # Rule-based assistant answers
  utils.ts                  # cn(), formatINR(), formatNumber()
  userContext.tsx           # Login state (localStorage)
  overrideContext.tsx       # Live override log — appends on every action
```

## Where the agentic AI lives

Open the **AI Architecture** button in the header for the full diagram. In short:

1. **Health Check Agent** surfaces in *Data Health*
2. **DemandIQ Agent** drives *KPI & Demand Sensing* and *Exception Report*
3. **Supply Agent** drives *Coverage & Reallocation*
4. All three feed into a **decision engine** that auto-routes by impact × urgency × confidence
5. Outputs surface as Exception Report, Coverage Actions, Governance Pre-Read, AI Assistant, and per-page Insight Cards
6. Planner decisions are logged and fed back into Layer 2 via the **Learning Dashboard**

The classification logic currently runs as an explainable rule engine; the architecture has model slots reserved (RCA classifier, demand-sensing model, an LLM for narratives and chat) that can be wired in without changing the agents' contracts with the rest of the system.
