'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useToast } from '@/components/admin/ToastContext';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from '@/services/menuApi';
import { MenuItemType } from '@/lib/store';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';

export default function MenuManagerPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<MenuItemType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItemType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    type: 'non-veg' as 'veg' | 'non-veg',
    price: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete Dialog State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMenuItems();
      setItems(data);
    } catch {
      setError('Unable to load menu items. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ name: '', category: 'CHICKEN', type: 'non-veg', price: '' });
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: MenuItemType, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      category: item.category || '',
      type: item.type || 'non-veg',
      price: (item.price || 0).toString(),
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const priceNum = parseFloat(formData.price);
    if (!formData.name.trim()) {
      setFormError('Item name is required');
      return;
    }
    if (!formData.category.trim()) {
      setFormError('Category is required');
      return;
    }
    if (isNaN(priceNum) || priceNum <= 0) {
      setFormError('Price must be a positive number');
      return;
    }

    setIsSaving(true);
    try {
      if (editingItem) {
        const payload = {
          name: formData.name.trim(),
          category: formData.category.trim().toUpperCase(),
          type: formData.type,
          price: priceNum,
        };
        const updated = await updateMenuItem(editingItem.id, payload);
        setItems((prev) =>
          prev.map((i) => (String(i.id) === String(editingItem.id) ? updated : i))
        );
        showToast('Menu item updated successfully.');
      } else {
        const created = await createMenuItem({
          name: formData.name.trim(),
          category: formData.category.trim().toUpperCase(),
          type: formData.type,
          price: priceNum,
        });
        setItems((prev) => [created, ...prev]);
        showToast('Menu item added successfully.');
      }
      setIsModalOpen(false);
      await fetchItems();

      // Notify open customer tabs instantly via BroadcastChannel
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('aditya_menu_updates');
        bc.postMessage('menu_updated');
        bc.close();
      }
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      setFormError(errorObj.message || 'Failed to save menu item');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await deleteMenuItem(deletingId);
      setItems((prev) => prev.filter((i) => String(i.id) !== String(deletingId)));
      showToast('Menu item deleted successfully.');

      // Notify open customer tabs instantly via BroadcastChannel
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('aditya_menu_updates');
        bc.postMessage('menu_updated');
        bc.close();
      }
    } catch {
      showToast('Failed to delete menu item.', 'error');
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  // Robust Search Filter (Handles name, category, ID, price, type)
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return items;
    return items.filter((item) => {
      const nameMatch = (item.name || '').toLowerCase().includes(query);
      const catMatch = (item.category || '').toLowerCase().includes(query);
      const idMatch = (item.id || '').toString().includes(query);
      const priceMatch = (item.price || '').toString().includes(query);
      const typeMatch = (item.type || '').toLowerCase().includes(query);
      return nameMatch || catMatch || idMatch || priceMatch || typeMatch;
    });
  }, [items, searchQuery]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1B16] tracking-tight">
            Menu Manager
          </h1>
          <button
            type="button"
            onClick={openAddModal}
            className="px-5 py-2.5 bg-[#7A1F2B] hover:bg-[#661923] text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-[#C9A227]/30 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search items, categories, prices, or #IDs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E7E1D3] rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-[#7A1F2B] focus:border-transparent placeholder-gray-400 shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs bg-gray-100 p-1 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 text-[#C0392B] p-4 rounded-xl text-sm border border-red-200 flex items-center justify-between">
            <span>{error}</span>
            <button type="button" onClick={fetchItems} className="font-bold underline text-xs">
              Retry
            </button>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-[#E7E1D3] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F7F2E9]/60 border-b border-[#E7E1D3] text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="py-3.5 px-5">ID</th>
                  <th className="py-3.5 px-5">Item Name</th>
                  <th className="py-3.5 px-5">Category</th>
                  <th className="py-3.5 px-5">Type</th>
                  <th className="py-3.5 px-5">Price</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500 font-sans">
                      Loading menu items...
                    </td>
                  </tr>
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500 font-sans">
                      {searchQuery ? 'No items match your search.' : 'No menu items found.'}
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      {/* ID formatted like #100 */}
                      <td className="py-3.5 px-5 font-mono text-xs text-gray-500">
                        #{item.id}
                      </td>

                      {/* Item Name */}
                      <td className="py-3.5 px-5 font-semibold text-gray-900">
                        {item.name}
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-5 font-bold text-xs uppercase tracking-wider text-[#7A1F2B]">
                        {item.category}
                      </td>

                      {/* Type Dot Indicator */}
                      <td className="py-3.5 px-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            item.type === 'veg'
                              ? 'bg-green-50 text-[#1E7D34] border border-green-200'
                              : 'bg-red-50 text-[#C0392B] border border-red-200'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              item.type === 'veg' ? 'bg-[#1E7D34]' : 'bg-[#C0392B]'
                            }`}
                          />
                          {item.type === 'veg' ? 'Veg' : 'Non-Veg'}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-5 font-bold text-gray-900">
                        ₹{item.price}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5 text-right space-x-2">
                        <button
                          type="button"
                          onClick={(e) => openEditModal(item, e)}
                          className="px-3 py-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 text-xs font-semibold border border-blue-200"
                          title="Edit menu item"
                          aria-label="Edit menu item"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletingId(item.id);
                          }}
                          className="px-3 py-1.5 text-[#C0392B] bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 text-xs font-semibold border border-red-200"
                          title="Delete menu item"
                          aria-label="Delete menu item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal (Position Fixed z-[100]) */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
            <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 space-y-6 my-auto z-[101]">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="font-serif font-bold text-2xl text-[#7A1F2B]">
                  {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
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
                    Item Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Butter Chicken BL"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] text-sm text-gray-900 bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CHICKEN"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] text-sm text-gray-900 uppercase bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value as 'veg' | 'non-veg' })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] text-sm text-gray-900 bg-white"
                    >
                      <option value="non-veg">Non-Veg</option>
                      <option value="veg">Veg</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 320"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] text-sm text-gray-900 bg-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2.5 bg-[#7A1F2B] hover:bg-[#661923] text-white text-sm font-semibold rounded-xl shadow-md transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSaving ? 'Saving...' : editingItem ? 'Save Changes' : 'Add Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={!!deletingId}
          title="Delete Menu Item"
          message="Are you sure you want to delete this menu item? This action cannot be undone."
          confirmLabel="Delete Item"
          isLoading={isDeleting}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingId(null)}
        />
      </div>
    </AdminLayout>
  );
}
