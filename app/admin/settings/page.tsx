'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useToast } from '@/components/admin/ToastContext';
import { getSettings, updateSettings } from '@/services/settingsApi';
import { SettingsType } from '@/lib/store';
import { Save, MessageSquare } from 'lucide-react';

export default function SettingsPage() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<SettingsType>({
    whatsappNumber: '919963012567',
    restaurantName: 'Aditya Restaurant & Hospitality',
    address: 'Kandukur, Andhra Pradesh',
    email: 'contact@adityahospitality.com',
    phone: '+91 99630 12567',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettingsData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getSettings();
      setFormData(data);
    } catch {
      setError('Unable to load settings.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettingsData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updated = await updateSettings(formData);
      setFormData(updated);
      showToast('Settings saved successfully.');
    } catch {
      showToast('Failed to save settings.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-3xl animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1B16] tracking-tight">
            Settings
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 text-[#C0392B] p-4 rounded-xl text-sm border border-red-200">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="py-12 text-center text-gray-500 font-sans">
            Loading settings...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E7E1D3] shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="font-serif font-bold text-xl text-[#7A1F2B] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#C9A227]" />
                WhatsApp &amp; Communication Configuration
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Configure your active WhatsApp business number used for all public website CTA redirects.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  WhatsApp Business Number (with Country Code) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 919963012567"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] text-sm text-gray-900 bg-white"
                />
                <span className="text-[10px] text-gray-500 mt-1 block">
                  Do not include + or spaces. Example: 919963012567 for India.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Business / Property Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.restaurantName}
                  onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] text-sm text-gray-900 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] text-sm text-gray-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] text-sm text-gray-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Property Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] text-sm text-gray-900 bg-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 bg-[#7A1F2B] hover:bg-[#661923] text-white text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50 border border-[#C9A227]/30"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving Settings...' : 'Save Settings'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
