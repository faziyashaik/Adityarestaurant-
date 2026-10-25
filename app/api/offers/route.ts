import { NextResponse } from 'next/server';
import { getOffersDB, createOfferDB } from '@/lib/store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const offers = await getOffersDB();
    return NextResponse.json(offers);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, originalPrice, discountPrice, validUntil, imageUrl, isActive } = body;

    // API Validation (Section 7 & 20)
    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Offer title is required' }, { status: 400 });
    }
    if (typeof discountPrice !== 'number' || discountPrice <= 0) {
      return NextResponse.json({ error: 'Discount price must be a positive number' }, { status: 400 });
    }
    if (typeof originalPrice === 'number' && discountPrice >= originalPrice) {
      return NextResponse.json({ error: 'Discount price must be less than original price' }, { status: 400 });
    }
    if (!validUntil || typeof validUntil !== 'string') {
      return NextResponse.json({ error: 'Valid until date is required' }, { status: 400 });
    }

    const newOffer = await createOfferDB({
      title: title.trim(),
      description: (description || '').trim(),
      originalPrice: typeof originalPrice === 'number' ? originalPrice : discountPrice,
      discountPrice,
      validUntil,
      imageUrl: (imageUrl || '').trim() || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
      isActive: typeof isActive === 'boolean' ? isActive : true,
    });

    return NextResponse.json(newOffer, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 });
  }
}
