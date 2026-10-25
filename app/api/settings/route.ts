import { NextResponse } from 'next/server';
import { getSettingsDB, updateSettingsDB } from '@/lib/store';

export async function GET() {
  try {
    const settings = await getSettingsDB();
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = await updateSettingsDB(body);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
