import { fetchApi } from './api';
import { OfferType } from '@/lib/store';

export async function getOffers(): Promise<OfferType[]> {
  return fetchApi<OfferType[]>('/api/offers');
}

export async function getActiveOffers(): Promise<OfferType[]> {
  return fetchApi<OfferType[]>('/api/offers/active');
}

export async function createOffer(offerData: Omit<OfferType, 'id'>): Promise<OfferType> {
  return fetchApi<OfferType>('/api/offers', {
    method: 'POST',
    body: JSON.stringify(offerData),
  });
}

export async function updateOffer(id: string, offerData: Partial<OfferType>): Promise<OfferType> {
  return fetchApi<OfferType>(`/api/offers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(offerData),
  });
}

export async function toggleOfferActive(id: string, isActive: boolean): Promise<OfferType> {
  return fetchApi<OfferType>(`/api/offers/${id}/active`, {
    method: 'PATCH',
    body: JSON.stringify({ isActive }),
  });
}

export async function deleteOffer(id: string): Promise<{ success: boolean }> {
  return fetchApi<{ success: boolean }>(`/api/offers/${id}`, {
    method: 'DELETE',
  });
}
