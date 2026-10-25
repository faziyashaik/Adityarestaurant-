import { NextResponse } from 'next/server';
import { getActiveOffersDB } from '@/lib/store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const activeOffers = await getActiveOffersDB();
    return NextResponse.json(activeOffers);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch active offers' }, { status: 500 });
  }
}
