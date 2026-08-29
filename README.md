# STRAKD

**TRACK. STACK. REPEAT.**
*Track your flow. Stack your future.*

A futuristic, glassmorphic personal budget tracker with a hip-hop / streetwear-inspired identity. Built with React, React Router, the Context API, and a custom localStorage-backed hook.

## Palette

| Token | Hex | Use |
|---|---|---|
| Ink | `#19171b` | Dark-mode background |
| Charcoal | `#252628` | Secondary surfaces |
| Gold | `#d29f22` | Primary accent, income |
| Maroon | `#5d0018` | Expense accent (light mode primary) |

## Stack

- **React 19 + Vite**
- **React Router v6** — real routes for every page (`/`, `/dashboard`, `/add-transaction`, `/transaction/:id`, `/summary`)
- **Context API** — `ThemeContext` (light/dark, no prop drilling) and `TransactionsContext` (shares one `useTransactions()` instance across routes)
- **Custom hook** — `useTransactions()` centralizes all read/write/add/update/delete + localStorage sync
- **Framer Motion** — page transitions, card entrances, modal/menu animations
- **CSS 3D** — cursor-tilt glass cards, parallax background, layered logo depth (no WebGL — CSS transforms are the simplest tool that does the job here)
- **`prefers-reduced-motion`** respected throughout

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "STRAKD — initial build"
git branch -M main
git remote add origin https://github.com/<your-username>/midterm-project-webdvt.git
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to vercel.com/new and import the `midterm-project-webdvt` repo.
2. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output directory `dist`.
3. Deploy.

`vercel.json` is already included with a SPA rewrite rule, so refreshing a dynamic route like `/transaction/123` in production will not 404.

## Project structure

```
src/
├── components/     GlassCard, Navbar, ThemeToggle, StatCard, TransactionList/Item,
│                   TransactionForm, FilterBar, SpendingChart, EmptyState, Scene, Logo
├── pages/          Dashboard, AddTransaction, TransactionDetail, Summary, NotFoundRoute
├── context/        ThemeContext, TransactionsContext
├── hooks/          useTransactions, useTilt
├── utils/          transactionUtils, seedData
├── App.jsx
└── main.jsx
```

## Notes

- Transactions persist in `localStorage` and seed with 10 realistic sample tracks on first load.
- Performance: totals/breakdowns are `useMemo`'d off the transaction list, list rows and cards are `React.memo`'d, and hook callbacks are `useCallback`'d — each has an inline comment explaining why.
- Income/expense are distinguished by an up/down glyph **and** color, not color alone.
