# Alpha Libra

Premium SMC-driven market dashboard for crypto, forex, stocks, and futures.

## Current status

- Premium dashboard UI is live
- Watchlist and signal pages are implemented
- Market scanning logic and mock live data layer added
- Ready for real exchange / broker API integration

## Features

- Top 50 crypto coins
- Top 10 forex pairs
- Top 20 stocks
- Top 5 futures
- SMC-style setup cards with entry, SL and TP1-TP4
- Long / short / wait / no-trade logic
- Light and dark mode
- Responsive dashboard for desktop and mobile
- Market scan route for structured JSON output

## Start locally

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## API route

```bash
GET /api/market
```

This endpoint returns the current scanned market snapshot and summary.

## Tech stack

- Next.js 14
- React 18
- Tailwind CSS
- TypeScript
- Lucide icons
