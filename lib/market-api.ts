export type MarketUpdate = {
  symbol: string;
  price: string;
  change: string;
  direction: 'up' | 'down';
  volume?: string;
};

export async function buildMarketSnapshot() {
  const base = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT', {
    cache: 'no-store',
  }).then((res) => res.json()).catch(() => null);

  const fallback = [
    { symbol: 'BTCUSD', price: '62450.00', change: '2.46' },
    { symbol: 'ETHUSD', price: '3240.50', change: '1.91' },
    { symbol: 'SOLUSD', price: '148.92', change: '3.08' },
    { symbol: 'EURUSD', price: '1.0864', change: '0.28' },
    { symbol: 'XAUUSD', price: '2360.40', change: '-0.64' },
    { symbol: 'NVDA', price: '118.34', change: '1.43' },
    { symbol: 'AAPL', price: '214.61', change: '0.74' },
    { symbol: 'ES', price: '5498.50', change: '-0.34' },
    { symbol: 'NQ', price: '19450.25', change: '-0.82' },
  ];

  const liveMap = new Map<string, MarketUpdate>();

  if (base && typeof base.lastPrice === 'string') {
    liveMap.set('BTCUSD', {
      symbol: 'BTCUSD',
      price: Number(base.lastPrice).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      change: `${Number(base.priceChangePercent).toFixed(2)}%`,
      direction: Number(base.priceChangePercent) >= 0 ? 'up' : 'down',
    });
  }

  fallback.forEach((item) => {
    if (!liveMap.has(item.symbol)) {
      liveMap.set(item.symbol, {
        symbol: item.symbol,
        price: item.symbol.includes('USD') || item.symbol === 'NQ' ? item.price : item.price,
        change: `${item.change}%`,
        direction: Number(item.change) >= 0 ? 'up' : 'down',
      });
    }
  });

  return liveMap;
}
