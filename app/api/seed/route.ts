import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/store';

export async function GET() {
  await seedDatabase();
  return NextResponse.json({ success: true, message: 'Database seeded successfully' });
}

export async function POST() {
  await seedDatabase();
  return NextResponse.json({ success: true, message: 'Database seeded successfully' });
}
