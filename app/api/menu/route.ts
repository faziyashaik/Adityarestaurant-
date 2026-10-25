import { NextResponse } from 'next/server';
import { getMenuItemsDB, createMenuItemDB } from '@/lib/store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const items = await getMenuItemsDB();
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, type, price } = body;

    // API Validation (Section 7)
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Item name is required' }, { status: 400 });
    }
    if (!category || typeof category !== 'string') {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }
    if (type !== 'veg' && type !== 'non-veg') {
      return NextResponse.json({ error: 'Type must be "veg" or "non-veg"' }, { status: 400 });
    }
    if (typeof price !== 'number' || price <= 0) {
      return NextResponse.json({ error: 'Price must be a positive number' }, { status: 400 });
    }

    const newItem = await createMenuItemDB({
      name: name.trim(),
      category: category.trim().toUpperCase(),
      type,
      price,
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
  }
}
