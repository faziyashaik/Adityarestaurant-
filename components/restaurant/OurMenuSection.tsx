'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { getMenuItems } from '@/services/menuApi';
import { MenuItemType } from '@/lib/store';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { DishOrderModal, OrderDishItem } from './DishOrderModal';

export const OurMenuSection: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDish, setSelectedDish] = useState<OrderDishItem | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayCount, setDisplayCount] = useState<number>(24);

  const fetchLiveMenu = async (isInitial = false) => {
    if (isInitial) {
      setIsLoading(true);
    }
    setError(null);
    try {
      const data = await getMenuItems();
      if (data) {
        setMenuItems(data);
      }
    } catch {
      if (isInitial) {
        setError('Unable to load live menu items. Please try refreshing.');
      }
    } finally {
      if (isInitial) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchLiveMenu(true);

    // 1. Periodic background auto-polling every 3 seconds
    const intervalId = setInterval(() => {
      fetchLiveMenu(false);
    }, 3000);

    // 2. Tab focus / visibility revalidation
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchLiveMenu(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 3. Same-browser cross-tab instant broadcast listener
    let channel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      channel = new BroadcastChannel('aditya_menu_updates');
      channel.onmessage = (event) => {
        if (event.data === 'menu_updated') {
          fetchLiveMenu(false);
        }
      };
    }

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (channel) {
        channel.close();
      }
    };
  }, []);

  // Compute dynamic categories from loaded menu items with strict deduplication
  const dynamicCategories = useMemo(() => {
    const cats = new Set<string>(['ALL', 'VEG', 'NON-VEG']);
    menuItems.forEach((item) => {
      if (item.category) {
        const catName = item.category.toUpperCase().trim();
        if (catName) {
          cats.add(catName);
        }
      }
    });
    return Array.from(cats);
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      let matchesCategory = true;
      if (activeCategory === 'VEG') {
        matchesCategory = item.type === 'veg';
      } else if (activeCategory === 'NON-VEG') {
        matchesCategory = item.type === 'non-veg';
      } else if (activeCategory !== 'ALL') {
        matchesCategory = item.category.toUpperCase() === activeCategory;
      }

      // Search filter
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });
  }, [menuItems, activeCategory, searchQuery]);

  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, displayCount);
  }, [filteredItems, displayCount]);

  const handleOrderClick = (item: MenuItemType) => {
    setSelectedDish({
      id: item.id,
      name: item.name,
      description: `${item.category} • ₹${item.price}`,
    });
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setDisplayCount(24);
  };

  return (
    <section id="our-menu-section" className="py-16 bg-[#F7F3ED] text-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Title & Description */}
        <div className="text-center space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#741B2A] tracking-tight">
            Our Menu
          </h2>
          <div className="w-12 h-1 bg-[#C9A23A] mx-auto rounded-full" />
          <p className="text-gray-700 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Explore our wide range of authentic culinary delights prepared with the finest ingredients.
          </p>
        </div>

        {/* Categorization Sorting Bar */}
        <div className="w-full overflow-x-auto scrollbar-none py-3">
          <div className="flex items-center justify-start md:justify-center gap-3 sm:gap-5 md:gap-6 min-w-max px-4 mx-auto">
            {dynamicCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#741B2A] text-white rounded-full px-5 py-2 shadow-md transform scale-105'
                      : 'text-gray-800 hover:text-[#741B2A] px-2 py-1.5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative pt-2">
          <input
            type="text"
            placeholder="Search dish name (e.g. Biryani, Paneer, Tikka)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#741B2A] focus:border-transparent text-sm text-gray-900 bg-white shadow-xs"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Menu Items Count Banner */}
        <div className="text-center text-xs text-gray-600">
          Showing {displayedItems.length} of {filteredItems.length} dishes
        </div>

        {error && (
          <div className="bg-red-50 text-[#C0392B] p-4 rounded-xl text-sm border border-red-200 flex items-center justify-between max-w-md mx-auto">
            <span>{error}</span>
            <button onClick={() => fetchLiveMenu(true)} className="font-bold underline text-xs flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          </div>
        )}

        {/* 4-Column Responsive Grid */}
        {isLoading ? (
          <div className="text-center py-16 text-gray-500 font-sans">
            Loading authentic menu dishes from database...
          </div>
        ) : displayedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {displayedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
              >
                {/* Item Name & Price */}
                <div className="flex items-start justify-between space-x-2">
                  <div className="flex items-center space-x-2 min-w-0">
                    <span
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        item.type === 'veg' ? 'bg-emerald-600' : 'bg-red-600'
                      }`}
                      title={item.type === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                    />
                    <h3
                      className="font-serif font-bold text-sm text-[#741B2A] truncate leading-tight group-hover:text-[#5F1624]"
                      title={item.name}
                    >
                      {item.name}
                    </h3>
                  </div>
                  <span className="font-serif font-bold text-sm text-[#741B2A] flex-shrink-0">
                    ₹{item.price}
                  </span>
                </div>

                {/* Order via WhatsApp Button */}
                <button
                  onClick={() => handleOrderClick(item)}
                  className="w-full py-1.5 px-3 border border-[#741B2A] text-[#741B2A] hover:bg-[#741B2A] hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] cursor-pointer"
                >
                  <span>Order via WhatsApp</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 font-sans">
            No dishes found matching your search query. Try searching for something else!
          </div>
        )}

        {/* Load More Button if more items exist */}
        {displayCount < filteredItems.length && (
          <div className="text-center pt-6">
            <button
              onClick={() => setDisplayCount((prev) => prev + 24)}
              className="px-8 py-2.5 bg-white border border-[#741B2A] text-[#741B2A] hover:bg-[#741B2A] hover:text-white rounded-full text-xs font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Load More Dishes ({filteredItems.length - displayCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Dish Order Modal */}
      {selectedDish && (
        <DishOrderModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </section>
  );
};
