import { NextResponse } from 'next/server';
import { updateRoomPriceDB } from '@/lib/store';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { basePricePerNight } = body;

    if (typeof basePricePerNight !== 'number' || basePricePerNight <= 0) {
      return NextResponse.json({ error: 'Base price must be a positive number' }, { status: 400 });
    }

    const updated = await updateRoomPriceDB(id, basePricePerNight);
    if (!updated) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update room price' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return PUT(request, { params });
}
