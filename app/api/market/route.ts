import { NextResponse } from 'next/server';
import { assets } from '@/lib/market-data';
import { buildMarketSnapshot } from '@/lib/market-api';

export async function GET() {
  const snapshot = await buildMarketSnapshot();

  const updatedAssets = assets.map((asset) => {
    const live = snapshot.get(asset.symbol);

    if (!live) {
      return asset;
    }

    return {
      ...asset,
      price: live.symbol.includes('BTC') || live.symbol.includes('ETH') || live.symbol.includes('SOL')
        ? `$${Number(live.price.replace(/,/g, '')).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : live.symbol === 'NQ'
          ? Number(live.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          : live.symbol === 'ES'
            ? Number(live.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : live.price,
      change: `${live.change.startsWith('-') ? '' : '+'}${live.change.startsWith('-') ? live.change : live.change}`,
      direction: live.direction,
    };
  });

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    assets: updatedAssets,
    summary: {
      total: updatedAssets.length,
      bullish: updatedAssets.filter((asset) => asset.trend === 'LONG').length,
      bearish: updatedAssets.filter((asset) => asset.trend === 'SHORT').length,
      neutral: updatedAssets.filter((asset) => asset.trend === 'WAIT' || asset.trend === 'NO TRADE').length,
    },
  });
}
