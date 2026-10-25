import { fetchApi } from './api';
import { MenuItemType } from '@/lib/store';

export async function getMenuItems(): Promise<MenuItemType[]> {
  return fetchApi<MenuItemType[]>('/api/menu');
}

export async function createMenuItem(itemData: Omit<MenuItemType, 'id'>): Promise<MenuItemType> {
  return fetchApi<MenuItemType>('/api/menu', {
    method: 'POST',
    body: JSON.stringify(itemData),
  });
}

export async function updateMenuItem(id: string, itemData: Partial<MenuItemType>): Promise<MenuItemType> {
  return fetchApi<MenuItemType>(`/api/menu/${id}`, {
    method: 'PUT',
    body: JSON.stringify(itemData),
  });
}

export async function deleteMenuItem(id: string): Promise<{ success: boolean }> {
  return fetchApi<{ success: boolean }>(`/api/menu/${id}`, {
    method: 'DELETE',
  });
}
