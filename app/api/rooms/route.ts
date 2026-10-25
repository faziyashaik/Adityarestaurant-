import { NextResponse } from 'next/server';
import { getRoomsDB } from '@/lib/store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const rooms = await getRoomsDB();
    return NextResponse.json(rooms);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}
