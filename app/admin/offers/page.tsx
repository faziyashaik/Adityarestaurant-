'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useToast } from '@/components/admin/ToastContext';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import {
  getOffers,
  createOffer,
  updateOffer,
  toggleOfferActive,
  deleteOffer,
} from '@/services/offersApi';
import { OfferType } from '@/lib/store';
import { Plus, Edit2, Trash2, Calendar, X, Check, ToggleLeft, ToggleRight } from 'lucide-react';

export default function OffersManagerPage() {
  const { showToast } = useToast();
  const [offers, setOffers] = useState<OfferType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<OfferType | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    originalPrice: '',
    discountPrice: '',
    validUntil: '',
    imageUrl: '',
    isActive: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchOffersData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getOffers();
      setOffers(data);
    } catch {
      setError('Unable to load offers. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOffersData();
  }, []);

  const openCreateModal = () => {
    setEditingOffer(null);
    setFormData({
      title: '',
      description: '',
      originalPrice: '',
      discountPrice: '',
      validUntil: '2026-09-30',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
      isActive: true,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (offer: OfferType) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      originalPrice: offer.originalPrice.toString(),
      discountPrice: offer.discountPrice.toString(),
      validUntil: offer.validUntil,
      imageUrl: offer.imageUrl,
      isActive: offer.isActive,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleToggleActive = async (offer: OfferType) => {
    const nextState = !offer.isActive;
    try {
      const updated = await toggleOfferActive(offer.id, nextState);
      setOffers((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
      showToast(`Offer ${nextState ? 'activated' : 'deactivated'} successfully.`);
    } catch {
      showToast('Failed to change offer active state.', 'error');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const discNum = parseFloat(formData.discountPrice);
    const origNum = formData.originalPrice ? parseFloat(formData.originalPrice) : discNum;

    // Validation (Section 20)
    if (!formData.title.trim()) {
      setFormError('Offer title is required');
      return;
    }
    if (isNaN(discNum) || discNum <= 0) {
      setFormError('Discount price must be a positive number');
      return;
    }
    if (formData.originalPrice && discNum >= origNum) {
      setFormError('Discount price must be less than original price');
      return;
    }
    if (!formData.validUntil) {
      setFormError('Valid until date is required');
      return;
    }

    setIsSaving(true);
    try {
      if (editingOffer) {
        const updated = await updateOffer(editingOffer.id, {
          title: formData.title.trim(),
          description: formData.description.trim(),
          originalPrice: origNum,
          discountPrice: discNum,
          validUntil: formData.validUntil,
          imageUrl: formData.imageUrl.trim() || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
          isActive: formData.isActive,
        });
        setOffers((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
        showToast('Offer updated successfully.');
      } else {
        const created = await createOffer({
          title: formData.title.trim(),
          description: formData.description.trim(),
          originalPrice: origNum,
          discountPrice: discNum,
          validUntil: formData.validUntil,
          imageUrl: formData.imageUrl.trim() || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
          isActive: formData.isActive,
        });
        setOffers((prev) => [created, ...prev]);
        showToast('Offer created successfully.');
      }
      setIsModalOpen(false);
    } catch (err: any) {
      setFormError(err.message || 'Failed to save offer');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await deleteOffer(deletingId);
      setOffers((prev) => prev.filter((o) => o.id !== deletingId));
      showToast('Offer deleted successfully.');
    } catch {
      showToast('Failed to delete offer.', 'error');
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1B16] tracking-tight">
            Offers Manager
          </h1>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 bg-[#7A1F2B] hover:bg-[#661923] text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-[#C9A227]/30"
          >
            <Plus className="w-4 h-4" />
            <span>Create Offer</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-[#C0392B] p-4 rounded-xl text-sm border border-red-200 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={fetchOffersData} className="font-bold underline text-xs">
              Retry
            </button>
          </div>
        )}

        {/* 2-Column Desktop Grid for Offers (Section 17) */}
        {isLoading ? (
          <div className="py-16 text-center text-gray-500 font-sans">
            Loading promotional offers...
          </div>
        ) : offers.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 space-y-4">
            <p className="text-gray-500 font-sans">No promotional offers created yet.</p>
            <button
              onClick={openCreateModal}
              className="px-5 py-2 bg-[#7A1F2B] text-white rounded-xl text-xs font-semibold"
            >
              Create First Offer
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-2xl border border-[#E7E1D3] shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
              >
                {/* Full-width Offer Image */}
                <div className="relative h-56 w-full bg-gray-100">
                  <Image
                    src={offer.imageUrl}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(offer)}
                      className={`px-3 py-1 rounded-full text-xs font-bold shadow-md transition-all flex items-center gap-1.5 ${
                        offer.isActive
                          ? 'bg-[#1E7D34] text-white'
                          : 'bg-gray-800/80 text-gray-300'
                      }`}
                    >
                      {offer.isActive ? (
                        <ToggleRight className="w-4 h-4 text-emerald-300" />
                      ) : (
                        <ToggleLeft className="w-4 h-4 text-gray-400" />
                      )}
                      <span>{offer.isActive ? 'Active' : 'Inactive'}</span>
                    </button>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-serif text-2xl font-bold text-[#7A1F2B] tracking-tight">
                        {offer.title}
                      </h3>
                    </div>

                    {/* Price Row: Original Price crossed out & Discount Price in Green */}
                    <div className="flex items-baseline gap-3">
                      {offer.originalPrice > offer.discountPrice && (
                        <span className="line-through text-gray-400 font-serif text-lg">
                          ₹{offer.originalPrice}
                        </span>
                      )}
                      <span className="font-serif text-3xl font-bold text-[#1E7D34]">
                        ₹{offer.discountPrice}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed font-sans">
                      {offer.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 pt-1">
                      <Calendar className="w-3.5 h-3.5 text-[#7A1F2B]" />
                      <span>VALID UNTIL: {offer.validUntil}</span>
                    </div>
                  </div>

                  {/* Bottom Action Row */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditModal(offer)}
                      className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeletingId(offer.id)}
                      className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-[#C0392B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create / Edit Offer Modal (Section 19) */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="font-serif font-bold text-2xl text-[#7A1F2B]">
                  {editingOffer ? 'Edit Offer' : 'New Special Offer'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {formError && (
                <div className="bg-red-50 text-[#C0392B] p-3 rounded-lg text-xs font-medium border border-red-200">
                  {formError}
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Offer Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Weekend Biryani Special"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] text-sm text-gray-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Details about the offer..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] text-sm text-gray-900 bg-white"
                  />
                </div>

                {/* Original & Discount Price (2 columns on desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Original Price (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 500"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] text-sm text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Discount Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="e.g. 399"
                      value={formData.discountPrice}
                      onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] text-sm text-gray-900 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Valid Until <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.validUntil}
                      onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] text-sm text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Initial State
                    </label>
                    <select
                      value={formData.isActive ? 'active' : 'inactive'}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.value === 'active' })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] text-sm text-gray-900 bg-white"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="Paste an Unsplash image link..."
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] text-sm text-gray-900 bg-white"
                  />
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    Paste an Unsplash image link or high-resolution URL.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2.5 bg-[#7A1F2B] hover:bg-[#661923] text-white text-sm font-semibold rounded-xl shadow-md transition-all disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : editingOffer ? 'Save Changes' : 'Create Offer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={!!deletingId}
          title="Delete Offer"
          message="Are you sure you want to delete this promotional offer? This will remove it permanently."
          confirmLabel="Delete Offer"
          isLoading={isDeleting}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingId(null)}
        />
      </div>
    </AdminLayout>
  );
}
