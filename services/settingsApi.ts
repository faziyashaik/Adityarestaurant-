import { fetchApi } from './api';
import { SettingsType } from '@/lib/store';

export async function getSettings(): Promise<SettingsType> {
  return fetchApi<SettingsType>('/api/settings');
}

export async function updateSettings(settingsData: Partial<SettingsType>): Promise<SettingsType> {
  return fetchApi<SettingsType>('/api/settings', {
    method: 'PUT',
    body: JSON.stringify(settingsData),
  });
}
