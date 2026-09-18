import { MoonStar, SunMedium, TrendingUp, Activity, BarChart3, ShieldCheck, ArrowUpRight, ArrowDownRight, Zap, Bell, Search, TimerReset, CandlestickChart, CircleDollarSign } from 'lucide-react';
import { useMemo, useState } from 'react';

type Timeframe = '1H' | '4H' | '1D';
type Signal = 'LONG' | 'SHORT' | 'WAIT' | 'NO TRADE';

type Asset = {
  symbol: string;
  name: string;
  price: string;
  change: string;
  direction: 'up' | 'down';
  trend: Signal;
  setup: string;
  entry: string;
  sl: string;
  tp1: string;
  tp2: string;
  tp3: string;
  tp4: string;
  bias: string;
  timeframe: Timeframe;
  category: 'Crypto' | 'Forex' | 'Stocks' | 'Futures';
};

const assets: Asset[] = [
  {
    symbol: 'BTCUSD',
    name: 'Bitcoin',
    price: '$62,450.00',
    change: '+2.46%',
    direction: 'up',
    trend: 'LONG',
    setup: 'CHOCH + OB retest',
    entry: '$62,120',
    sl: '$61,400',
    tp1: '$63,150',
    tp2: '$64,050',
    tp3: '$65,200',
    tp4: '$66,300',
    bias: 'Bullish HTF',
    timeframe: '4H',
    category: 'Crypto',
  },
  {
    symbol: 'ETHUSD',
    name: 'Ethereum',
    price: '$3,240.50',
    change: '+1.91%',
    direction: 'up',
    trend: 'LONG',
    setup: 'Liquidity sweep + FVG',
    entry: '$3,210',
    sl: '$3,120',
    tp1: '$3,360',
    tp2: '$3,460',
    tp3: '$3,580',
    tp4: '$3,720',
    bias: 'Bullish reclaim',
    timeframe: '1D',
    category: 'Crypto',
  },
  {
    symbol: 'SOLUSD',
    name: 'Solana',
    price: '$148.92',
    change: '+3.08%',
    direction: 'up',
    trend: 'LONG',
    setup: 'Break of structure',
    entry: '$146.20',
    sl: '$141.30',
    tp1: '$153.40',
    tp2: '$158.80',
    tp3: '$164.20',
    tp4: '$171.00',
    bias: 'Trend continuation',
    timeframe: '1H',
    category: 'Crypto',
  },
  {
    symbol: 'EURUSD',
    name: 'Euro / US Dollar',
    price: '1.0864',
    change: '+0.28%',
    direction: 'up',
    trend: 'WAIT',
    setup: 'Premium zone retest',
    entry: '1.0854',
    sl: '1.0828',
    tp1: '1.0898',
    tp2: '1.0925',
    tp3: '1.0950',
    tp4: '1.0985',
    bias: 'Bullish above 1.08',
    timeframe: '4H',
    category: 'Forex',
  },
  {
    symbol: 'XAUUSD',
    name: 'Gold',
    price: '$2,360.40',
    change: '-0.64%',
    direction: 'down',
    trend: 'SHORT',
    setup: 'MSS + bearish OB',
    entry: '$2,370.00',
    sl: '$2,390.50',
    tp1: '$2,330.00',
    tp2: '$2,320.00',
    tp3: '$2,308.50',
    tp4: '$2,295.00',
    bias: 'Bearish liquidity sweep',
    timeframe: '1D',
    category: 'Forex',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA',
    price: '$118.34',
    change: '+1.43%',
    direction: 'up',
    trend: 'LONG',
    setup: 'Trend continuation',
    entry: '$116.90',
    sl: '$113.40',
    tp1: '$121.60',
    tp2: '$124.80',
    tp3: '$128.40',
    tp4: '$132.00',
    bias: 'Strong bullish momentum',
    timeframe: '1H',
    category: 'Stocks',
  },
  {
    symbol: 'AAPL',
    name: 'Apple',
    price: '$214.61',
    change: '+0.74%',
    direction: 'up',
    trend: 'NO TRADE',
    setup: 'Neutral range',
    entry: '$214.00',
    sl: '$210.30',
    tp1: '$217.80',
    tp2: '$221.10',
    tp3: '$224.40',
    tp4: '$228.20',
    bias: 'Consolidation',
    timeframe: '4H',
    category: 'Stocks',
  },
  {
    symbol: 'ES',
    name: 'E-mini S&P 500',
    price: '5,498.50',
    change: '-0.34%',
    direction: 'down',
    trend: 'SHORT',
    setup: 'Bearish order block',
    entry: '5,512.00',
    sl: '5,535.50',
    tp1: '5,470.00',
    tp2: '5,440.00',
    tp3: '5,410.00',
    tp4: '5,378.00',
    bias: 'Distribution phase',
    timeframe: '1H',
    category: 'Futures',
  },
  {
    symbol: 'NQ',
    name: 'Nasdaq 100',
    price: '19,450.25',
    change: '-0.82%',
    direction: 'down',
    trend: 'SHORT',
    setup: 'Liquidity sweep + BOS',
    entry: '19,500.00',
    sl: '19,610.00',
    tp1: '19,320.00',
    tp2: '19,210.00',
    tp3: '19,120.00',
    tp4: '19,000.00',
    bias: 'Weakening risk appetite',
    timeframe: '1H',
    category: 'Futures',
  },
];

const groups = [
  { label: 'Crypto', items: assets.filter((a) => a.category === 'Crypto'), icon: Activity },
  { label: 'Forex', items: assets.filter((a) => a.category === 'Forex'), icon: CircleDollarSign },
  { label: 'Stocks', items: assets.filter((a) => a.category === 'Stocks'), icon: BarChart3 },
  { label: 'Futures', items: assets.filter((a) => a.category === 'Futures'), icon: CandlestickChart },
];

const signalColors: Record<Signal, string> = {
  LONG: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30',
  SHORT: 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30',
  WAIT: 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30',
  'NO TRADE': 'bg-slate-500/15 text-slate-300 ring-1 ring-slate-400/30',
};

export default function AlphaLibraDashboard() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSymbol, setActiveSymbol] = useState('BTCUSD');
  const [chartOpen, setChartOpen] = useState(true);

  const activeAsset = useMemo(
    () => assets.find((asset) => asset.symbol === activeSymbol) ?? assets[0],
    [activeSymbol],
  );

  const dashboardTheme =
    theme === 'dark'
      ? 'bg-slate-950 text-slate-100'
      : 'bg-slate-100 text-slate-900';

  const panelTheme =
    theme === 'dark'
      ? 'bg-slate-900/80 border-slate-800 text-slate-100'
      : 'bg-white/90 border-slate-200 text-slate-900';

  const mutedText = theme === 'dark' ? 'text-slate-400' : 'text-slate-600';
  const softBg = theme === 'dark' ? 'bg-slate-800/80' : 'bg-slate-100';

  const chartPoints = '10,80 52,60 95,75 140,38 182,42 220,22 260,48 300,32 340,40 380,28';

  return (
    <main className={`min-h-screen ${dashboardTheme} transition-colors duration-300`}>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className={`mb-6 flex flex-col gap-4 rounded-2xl border ${panelTheme} p-4 shadow-glow md:flex-row md:items-center md:justify-between`}>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-lg font-bold text-white shadow-lg shadow-blue-500/30">
              A
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-blue-400">Market intelligence</div>
              <h1 className="text-2xl font-bold">Alpha Libra</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm font-medium text-slate-200 hover:border-blue-400">
              <Search size={16} />
              Scan markets
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm font-medium text-slate-200 hover:border-blue-400">
              <Bell size={16} />
              Alerts
            </button>
            <button
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm font-medium text-slate-200 hover:border-blue-400"
            >
              {theme === 'dark' ? <SunMedium size={16} /> : <MoonStar size={16} />}
              {theme === 'dark' ? 'Light' : 'Dark'} mode
            </button>
          </div>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          {[
            { label: 'Strong Bullish', value: '14', hint: '+6 vs yesterday', icon: TrendingUp },
            { label: 'Strong Bearish', value: '9', hint: '-2 vs yesterday', icon: ArrowDownRight },
            { label: 'Wait Zones', value: '17', hint: 'Neutral bias', icon: TimerReset },
            { label: 'Win Rate', value: '74.8%', hint: 'Last 30 days', icon: ShieldCheck },
          ].map(({ label, value, hint, icon: Icon }) => (
            <div key={label} className={`rounded-2xl border ${panelTheme} p-4 shadow-glow`}>
              <div className="mb-3 flex items-center justify-between">
                <span className={mutedText}>{label}</span>
                <span className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
                  <Icon size={18} />
                </span>
              </div>
              <div className="text-3xl font-bold">{value}</div>
              <div className={`mt-1 text-xs ${mutedText}`}>{hint}</div>
            </div>
          ))}
        </section>

        <section className="mb-6 grid gap-6 xl:grid-cols-[1.2fr_1.8fr_1.2fr]">
          <div className={`rounded-2xl border ${panelTheme} p-4 shadow-glow`}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Watchlist</h2>
              <span className={`rounded-full px-2 py-1 text-xs ${theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'}`}>
                85 assets
              </span>
            </div>
            <div className="space-y-4">
              {groups.map(({ label, items, icon: Icon }) => (
                <div key={label}>
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-400">
                    <Icon size={14} />
                    {label}
                  </div>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <button
                        key={item.symbol}
                        onClick={() => setActiveSymbol(item.symbol)}
                        className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left transition ${
                          activeSymbol === item.symbol
                            ? 'border-blue-500/60 bg-blue-500/10'
                            : theme === 'dark'
                              ? 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                              : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-semibold">{item.symbol}</div>
                          <div className={`text-[11px] ${mutedText}`}>{item.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{item.price}</div>
                          <div className={`text-[11px] ${item.direction === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {item.change}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-2xl border ${panelTheme} p-4 shadow-glow`}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-blue-400">Selected asset</div>
                <h2 className="text-2xl font-bold">{activeAsset.symbol}</h2>
              </div>
              <div className={`rounded-full px-3 py-1 text-xs font-semibold ${signalColors[activeAsset.trend]}`}>
                {activeAsset.trend}
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900/40 p-3">
              <div>
                <div className={`text-sm ${mutedText}`}>{activeAsset.name}</div>
                <div className="text-3xl font-bold">{activeAsset.price}</div>
              </div>
              <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold ${activeAsset.direction === 'up' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'}`}>
                {activeAsset.direction === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {activeAsset.change}
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between text-sm">
              <div className={mutedText}>Bias: {activeAsset.bias}</div>
              <button
                onClick={() => setChartOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-400"
              >
                <Zap size={14} />
                {chartOpen ? 'Close chart' : 'Open live chart'}
              </button>
            </div>

            {chartOpen && (
              <div className={`chart-grid overflow-hidden rounded-2xl border ${theme === 'dark' ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-50'} p-3`}>
                <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
                  <span>{activeAsset.timeframe}</span>
                  <span>{activeAsset.setup}</span>
                </div>
                <svg viewBox="0 0 400 180" className="h-48 w-full">
                  <defs>
                    <linearGradient id="lineGlow" x1="0" x2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>
                  <path d={chartPoints} fill="none" stroke="url(#lineGlow)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M10 80 L52 60 L95 75 L140 38 L182 42 L220 22 L260 48 L300 32 L340 40 L380 28 L380 180 L10 180 Z" fill="rgba(59, 130, 246, 0.12)" />
                </svg>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>Support: {activeAsset.sl}</span>
                  <span>Entry: {activeAsset.entry}</span>
                  <span>Target: {activeAsset.tp1}</span>
                </div>
              </div>
            )}
          </div>

          <div className={`rounded-2xl border ${panelTheme} p-4 shadow-glow`}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">SMC setup</h2>
              <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase ${softBg} ${mutedText}`}>
                {activeAsset.category}
              </span>
            </div>

            <div className="space-y-3">
              <div className={`rounded-xl border ${theme === 'dark' ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'} p-3`}>
                <div className={mutedText}>Setup type</div>
                <div className="mt-1 font-semibold">{activeAsset.setup}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={`rounded-xl border ${theme === 'dark' ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'} p-3`}>
                  <div className={mutedText}>Entry</div>
                  <div className="mt-1 font-semibold text-blue-400">{activeAsset.entry}</div>
                </div>
                <div className={`rounded-xl border ${theme === 'dark' ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'} p-3`}>
                  <div className={mutedText}>SL</div>
                  <div className="mt-1 font-semibold text-rose-400">{activeAsset.sl}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'TP1', value: activeAsset.tp1 },
                  { label: 'TP2', value: activeAsset.tp2 },
                  { label: 'TP3', value: activeAsset.tp3 },
                  { label: 'TP4', value: activeAsset.tp4 },
                ].map(({ label, value }) => (
                  <div key={label} className={`rounded-xl border ${theme === 'dark' ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'} p-3`}>
                    <div className={mutedText}>{label}</div>
                    <div className="mt-1 font-semibold text-emerald-400">{value}</div>
                  </div>
                ))}
              </div>

              <div className={`rounded-xl border ${theme === 'dark' ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'} p-3`}>
                <div className="mb-2 flex items-center justify-between">
                  <span className={mutedText}>Risk / Reward</span>
                  <span className="font-semibold text-amber-400">1:3.4</span>
                </div>
                <div className="h-2 rounded-full bg-slate-700">
                  <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <div className={`rounded-2xl border ${panelTheme} p-4 shadow-glow`}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Trade journal</h2>
              <div className="flex items-center gap-2 text-xs text-blue-400">
                <Activity size={14} />
                Auto tracking
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {[
                { label: 'Daily P/L', value: '+$2,420', tone: 'text-emerald-400' },
                { label: 'Weekly P/L', value: '+$7,180', tone: 'text-emerald-400' },
                { label: 'Monthly win rate', value: '71.5%', tone: 'text-blue-400' },
              ].map(({ label, value, tone }) => (
                <div key={label} className={`rounded-xl border ${theme === 'dark' ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'} p-3`}>
                  <div className={mutedText}>{label}</div>
                  <div className={`mt-2 text-xl font-bold ${tone}`}>{value}</div>
                </div>
              ))}
            </div>

            <div className={`mt-4 overflow-hidden rounded-xl border ${theme === 'dark' ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'}`}>
              <table className="min-w-full text-left text-sm">
                <thead className={theme === 'dark' ? 'bg-slate-900 text-slate-300' : 'bg-slate-100 text-slate-700'}>
                  <tr>
                    <th className="px-4 py-3 font-medium">Asset</th>
                    <th className="px-4 py-3 font-medium">Direction</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.slice(0, 5).map((asset) => (
                    <tr key={asset.symbol} className={theme === 'dark' ? 'border-t border-slate-800' : 'border-t border-slate-200'}>
                      <td className="px-4 py-3 font-medium">{asset.symbol}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${signalColors[asset.trend]}`}>
                          {asset.trend}
                        </span>
                      </td>
                      <td className="px-4 py-3">{asset.setup}</td>
                      <td className={`px-4 py-3 font-semibold ${asset.direction === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {asset.direction === 'up' ? 'Win' : 'Loss'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`rounded-2xl border ${panelTheme} p-4 shadow-glow`}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Execution logic</h2>
              <span className="rounded-full bg-blue-500/10 px-2 py-1 text-xs font-semibold text-blue-400">Auto scan</span>
            </div>

            <div className="space-y-3">
              {[
                'Higher timeframe bias identified',
                'Liquidity sweep detected',
                'BOS or CHOCH confirmed',
                'Order block / FVG validation passed',
                'Entry, SL, TP1–TP4 generated',
                'Risk / reward threshold checked',
              ].map((step, index) => (
                <div key={step} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/15 text-xs font-bold text-blue-400">
                    {index + 1}
                  </div>
                  <div className={`rounded-xl border ${theme === 'dark' ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'} flex-1 p-3 text-sm`}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
