import { fetchApi } from './api';
import { GalleryImageType } from '@/lib/store';

export async function getGalleryImages(): Promise<GalleryImageType[]> {
  return fetchApi<GalleryImageType[]>('/api/gallery');
}

export async function createGalleryImage(imgData: Omit<GalleryImageType, 'id'>): Promise<GalleryImageType> {
  return fetchApi<GalleryImageType>('/api/gallery', {
    method: 'POST',
    body: JSON.stringify(imgData),
  });
}

export async function deleteGalleryImage(id: string): Promise<{ success: boolean }> {
  return fetchApi<{ success: boolean }>(`/api/gallery?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}
