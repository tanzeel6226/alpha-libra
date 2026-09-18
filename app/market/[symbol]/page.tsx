import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight, Activity, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import { assets } from '@/lib/market-data';

export default function MarketDetailPage({ params }: { params: { symbol: string } }) {
  const symbol = decodeURIComponent(params.symbol || '').toUpperCase();
  const asset = assets.find((item) => item.symbol === symbol);

  if (!asset) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-blue-400">Alpha Libra</div>
            <h1 className="text-3xl font-bold">{asset.symbol}</h1>
          </div>
          <nav className="flex gap-2 text-sm">
            <Link href="/" className="rounded-xl px-3 py-2 text-slate-300 hover:bg-slate-800/60">Dashboard</Link>
            <Link href="/watchlist" className="rounded-xl px-3 py-2 text-slate-300 hover:bg-slate-800/60">Watchlist</Link>
            <Link href="/signals" className="rounded-xl px-3 py-2 text-slate-300 hover:bg-slate-800/60">Signals</Link>
          </nav>
        </header>

        <section className="mb-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-slate-400">{asset.name}</div>
                <div className="text-4xl font-bold">{asset.price}</div>
              </div>
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${asset.direction === 'up' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'}`}>
                {asset.direction === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {asset.change}
              </div>
            </div>

            <div className="chart-grid overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-3">
              <svg viewBox="0 0 400 180" className="h-56 w-full">
                <defs>
                  <linearGradient id="detailLine" x1="0" x2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <path d="M10 110 L60 95 L105 76 L155 83 L205 50 L245 62 L295 44 L340 52 L380 28" fill="none" stroke="url(#detailLine)" strokeWidth="3" strokeLinecap="round" />
                <path d="M10 110 L60 95 L105 76 L155 83 L205 50 L245 62 L295 44 L340 52 L380 28 L380 180 L10 180 Z" fill="rgba(56, 189, 248, 0.12)" />
              </svg>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-slate-400">Signal</span>
                <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${asset.trend === 'LONG' ? 'bg-emerald-500/15 text-emerald-300' : asset.trend === 'SHORT' ? 'bg-rose-500/15 text-rose-300' : asset.trend === 'WAIT' ? 'bg-amber-500/15 text-amber-300' : 'bg-slate-500/15 text-slate-300'}`}>
                  {asset.trend}
                </span>
              </div>
              <div className="text-xl font-semibold">{asset.setup}</div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm text-blue-400">
                <ShieldCheck size={16} />
                Risk / Reward
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2">
                  <div className="text-slate-500">Entry</div>
                  <div className="mt-1 font-medium text-blue-400">{asset.entry}</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2">
                  <div className="text-slate-500">SL</div>
                  <div className="mt-1 font-medium text-rose-400">{asset.sl}</div>
                </div>
                {[asset.tp1, asset.tp2, asset.tp3, asset.tp4].map((tp, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 p-2">
                    <div className="text-slate-500">TP{idx + 1}</div>
                    <div className="mt-1 font-medium text-emerald-400">{tp}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Bias', value: asset.bias },
            { label: 'Timeframe', value: asset.timeframe },
            { label: 'Category', value: asset.category },
            { label: 'Engine', value: 'SMC v1.0' },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="text-sm text-slate-400">{label}</div>
              <div className="mt-2 text-lg font-semibold">{value}</div>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <div className="mb-3 flex items-center gap-2 text-blue-400">
            <Activity size={16} />
            Trade decision logic
          </div>
          <ul className="space-y-2 text-slate-300">
            <li>• Higher timeframe bias confirms the direction.</li>
            <li>• Liquidity sweep and structure shift are monitored before execution.</li>
            <li>• Entry is placed at valid order block or fair value gap retest.</li>
            <li>• Risk is capped with stop loss and TP ladder aligned to valid SMC logic.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

