import { NextResponse } from 'next/server';
import { getMarketSummary, scanMarkets } from '@/lib/smc-scanner';

export async function GET() {
  const scanned = scanMarkets();
  const summary = getMarketSummary();

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    summary,
    assets: scanned,
  });
}
