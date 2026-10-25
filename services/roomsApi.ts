import { fetchApi } from './api';
import { RoomType } from '@/lib/store';

export async function getRooms(): Promise<RoomType[]> {
  return fetchApi<RoomType[]>('/api/rooms');
}

export async function updateRoomPrice(id: string, basePricePerNight: number): Promise<RoomType> {
  return fetchApi<RoomType>(`/api/rooms/${id}/price`, {
    method: 'PUT',
    body: JSON.stringify({ basePricePerNight }),
  });
}

export async function updateRoomPhotos(id: string, photos: string[]): Promise<RoomType> {
  return fetchApi<RoomType>(`/api/rooms/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ photos }),
  });
}
