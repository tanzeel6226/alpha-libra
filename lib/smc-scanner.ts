import { assets, type Asset, type AssetCategory } from './market-data';

export type ScannedAsset = Asset & {
  confidence: number;
  score: number;
  engine: string;
  status: 'Strong' | 'Watch' | 'Neutral';
};

const signalMatrix = {
  LONG: 1,
  SHORT: -1,
  WAIT: 0,
  'NO TRADE': 0,
} as const;

export function scanMarkets() {
  return assets.map((asset) => {
    const baseScore = signalMatrix[asset.trend] ?? 0;
    const categoryBias = {
      Crypto: 1,
      Forex: 0.6,
      Stocks: 0.8,
      Futures: 0.7,
    } as Record<AssetCategory, number>;

    const volatilityBoost = asset.timeframe === '1H' ? 0.12 : asset.timeframe === '4H' ? 0.08 : 0.06;
    const signalScore = Math.round((baseScore * 100 + categoryBias[asset.category] * 100 + volatilityBoost * 100) * 10) / 10;

    const confidence = Math.min(
      0.98,
      Math.max(0.42, Math.abs(signalScore / 100) * 0.85 + (asset.trend === 'WAIT' ? 0.18 : asset.trend === 'NO TRADE' ? 0.12 : 0.5))
    );

    const status =
      Math.abs(signalScore) >= 70 ? 'Strong' : Math.abs(signalScore) >= 40 ? 'Watch' : 'Neutral';

    return {
      ...asset,
      score: signalScore,
      confidence: Number(confidence.toFixed(2)),
      status,
      engine: 'SMC v1.0',
    } satisfies ScannedAsset;
  });
}

export function getMarketSummary() {
  const scanned = scanMarkets();
  return {
    total: scanned.length,
    bullish: scanned.filter((item) => item.trend === 'LONG').length,
    bearish: scanned.filter((item) => item.trend === 'SHORT').length,
    neutral: scanned.filter((item) => item.trend === 'WAIT' || item.trend === 'NO TRADE').length,
    strongest: scanned
      .slice()
      .sort((a, b) => Math.abs(b.score) - Math.abs(a.score))
      .slice(0, 5),
  };
}
