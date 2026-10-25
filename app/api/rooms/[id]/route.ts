import { NextResponse } from 'next/server';
import { getRoomsDB, updateRoomPhotosDB, updateRoomPriceDB } from '@/lib/store';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const rooms = await getRoomsDB();
  const room = rooms.find((r) => r.id === id);
  if (!room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  }
  return NextResponse.json(room);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.photos && Array.isArray(body.photos)) {
      const updated = await updateRoomPhotosDB(id, body.photos);
      return NextResponse.json(updated);
    }
    if (typeof body.basePricePerNight === 'number') {
      const updated = await updateRoomPriceDB(id, body.basePricePerNight);
      return NextResponse.json(updated);
    }
    return NextResponse.json({ error: 'Invalid update payload' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Failed to update room' }, { status: 500 });
  }
}
