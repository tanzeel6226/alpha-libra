import { NextResponse } from 'next/server';
import { assets } from '@/lib/market-data';
import { buildMarketSnapshot } from '@/lib/market-api';

function formatAssetPrice(assetSymbol: string, value: string) {
  const numeric = Number(value.replace(/[$,]/g, ''));

  if (['BTCUSD', 'ETHUSD', 'SOLUSD'].includes(assetSymbol)) {
    return `$${numeric.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  if (assetSymbol === 'EURUSD') {
    return numeric.toFixed(4);
  }

  if (assetSymbol === 'XAUUSD') {
    return `$${numeric.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  return value;
}

export async function GET() {
  const snapshot = await buildMarketSnapshot();

  const updatedAssets = assets.map((asset) => {
    const live = snapshot.get(asset.symbol);

    if (!live) {
      return asset;
    }

    const raw = live.change.replace('%', '');
    const signed = Number(raw);
    const formattedChange = `${signed >= 0 ? '+' : ''}${raw}%`;

    return {
      ...asset,
      price: formatAssetPrice(asset.symbol, live.price),
      change: formattedChange,
      direction: signed >= 0 ? 'up' : 'down',
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
