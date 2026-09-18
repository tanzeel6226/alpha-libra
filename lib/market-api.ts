export type MarketUpdate = {
  symbol: string;
  price: string;
  change: string;
  direction: 'up' | 'down';
};

const fallback: Omit<MarketUpdate, 'direction'>[] = [
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

function formatPrice(value: number, symbol: string) {
  const isCrypto = ['BTCUSD', 'ETHUSD', 'SOLUSD'].includes(symbol);
  if (isCrypto) {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  if (symbol === 'EURUSD' || symbol === 'XAUUSD') {
    return symbol === 'EURUSD' ? value.toFixed(4) : `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export async function buildMarketSnapshot() {
  const cryptoPairs = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];

  const requests = cryptoPairs.map((pair) =>
    fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`, { cache: 'no-store' })
      .then((res) => res.json())
      .catch(() => null),
  );

  const [btc, eth, sol] = await Promise.all(requests);
  const liveMap = new Map<string, MarketUpdate>();

  for (const [pair, response] of [
    ['BTCUSD', btc],
    ['ETHUSD', eth],
    ['SOLUSD', sol],
  ] as const) {
    if (response && typeof response.lastPrice === 'string') {
      const num = Number(response.lastPrice);
      const pct = Number(response.priceChangePercent ?? 0);
      liveMap.set(pair, {
        symbol: pair,
        price: formatPrice(num, pair),
        change: `${pct.toFixed(2)}%`,
        direction: pct >= 0 ? 'up' : 'down',
      });
    }
  }

  fallback.forEach((item) => {
    if (!liveMap.has(item.symbol)) {
      const val = Number(item.price);
      liveMap.set(item.symbol, {
        symbol: item.symbol,
        price: formatPrice(val, item.symbol),
        change: `${item.change}%`,
        direction: Number(item.change) >= 0 ? 'up' : 'down',
      });
    }
  });

  return liveMap;
}
