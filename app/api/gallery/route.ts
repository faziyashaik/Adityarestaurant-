import { NextResponse } from 'next/server';
import { getGalleryImagesDB, createGalleryImageDB, deleteGalleryImageDB } from '@/lib/store';

export async function GET() {
  try {
    const images = await getGalleryImagesDB();
    return NextResponse.json(images);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageUrl, title, category } = body;

    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    const newImage = await createGalleryImageDB({
      imageUrl: imageUrl.trim(),
      title: (title || '').trim(),
      category: (category || 'General').trim(),
    });

    return NextResponse.json(newImage, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to add gallery image' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
    }

    const success = await deleteGalleryImageDB(id);
    if (!success) {
      return NextResponse.json({ error: 'Gallery image not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete gallery image' }, { status: 500 });
  }
}
