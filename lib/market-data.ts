export type AssetCategory = 'Crypto' | 'Forex' | 'Stocks' | 'Futures';
export type Timeframe = '1H' | '4H' | '1D';
export type Signal = 'LONG' | 'SHORT' | 'WAIT' | 'NO TRADE';

export type Asset = {
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
  category: AssetCategory;
};

export const assets: Asset[] = [
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

export const getSignalSummary = () => ({
  LONG: assets.filter((asset) => asset.trend === 'LONG').length,
  SHORT: assets.filter((asset) => asset.trend === 'SHORT').length,
  WAIT: assets.filter((asset) => asset.trend === 'WAIT').length,
  'NO TRADE': assets.filter((asset) => asset.trend === 'NO TRADE').length,
});

export const getAssetsByCategory = (category: AssetCategory) =>
  assets.filter((asset) => asset.category === category);

export const getStrongestSetup = () =>
  [...assets].sort((a, b) => (a.direction === 'up' ? -1 : 1)).slice(0, 5);
