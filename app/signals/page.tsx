import Link from 'next/link';
import { Activity, ArrowDownRight, ArrowUpRight, ShieldCheck, TrendingUp } from 'lucide-react';
import { assets, getSignalSummary } from '@/lib/market-data';

export default function SignalsPage() {
  const summary = getSignalSummary();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-blue-400">Alpha Libra</div>
            <h1 className="text-3xl font-bold">Signal Engine</h1>
          </div>
          <nav className="flex gap-2 text-sm">
            <Link href="/" className="rounded-xl px-3 py-2 text-slate-300 hover:bg-slate-800/60">Dashboard</Link>
            <Link href="/watchlist" className="rounded-xl px-3 py-2 text-slate-300 hover:bg-slate-800/60">Watchlist</Link>
            <Link href="/signals" className="rounded-xl bg-blue-500/10 px-3 py-2 text-blue-300 ring-1 ring-blue-500/30">Signals</Link>
          </nav>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          {[
            { label: 'Long', value: summary.LONG, icon: TrendingUp, tone: 'text-emerald-400' },
            { label: 'Short', value: summary.SHORT, icon: ArrowDownRight, tone: 'text-rose-400' },
            { label: 'Wait', value: summary.WAIT, icon: Activity, tone: 'text-amber-400' },
            { label: 'No Trade', value: summary['NO TRADE'], icon: ShieldCheck, tone: 'text-slate-400' },
          ].map(({ label, value, icon: Icon, tone }) => (
            <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
                <span>{label}</span>
                <Icon size={16} className={tone} />
              </div>
              <div className={`text-3xl font-bold ${tone}`}>{value}</div>
            </div>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {assets.map((asset) => (
            <article key={asset.symbol} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-blue-400">{asset.category}</div>
                  <h2 className="text-2xl font-bold">{asset.symbol}</h2>
                </div>
                <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${asset.trend === 'LONG' ? 'bg-emerald-500/15 text-emerald-300' : asset.trend === 'SHORT' ? 'bg-rose-500/15 text-rose-300' : asset.trend === 'WAIT' ? 'bg-amber-500/15 text-amber-300' : 'bg-slate-500/15 text-slate-300'}`}>
                  {asset.trend}
                </span>
              </div>

              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="text-slate-400">{asset.name}</div>
                  <div className="text-2xl font-bold">{asset.price}</div>
                </div>
                <div className={asset.direction === 'up' ? 'text-emerald-400' : 'text-rose-400'}>
                  {asset.direction === 'up' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                </div>
              </div>

              <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2">
                  <div className="text-slate-500">Setup</div>
                  <div className="mt-1 font-medium">{asset.setup}</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2">
                  <div className="text-slate-500">Bias</div>
                  <div className="mt-1 font-medium">{asset.bias}</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2">
                  <div className="text-slate-500">Entry</div>
                  <div className="mt-1 font-medium text-blue-400">{asset.entry}</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2">
                  <div className="text-slate-500">SL</div>
                  <div className="mt-1 font-medium text-rose-400">{asset.sl}</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2 text-sm">
                {[asset.tp1, asset.tp2, asset.tp3, asset.tp4].map((tp, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 p-2 text-center">
                    <div className="text-slate-500">TP{idx + 1}</div>
                    <div className="mt-1 font-medium text-emerald-400">{tp}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
