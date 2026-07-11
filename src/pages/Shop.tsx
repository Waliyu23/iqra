import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import { SlidersHorizontal, Search, X, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useCatalog } from "@/lib/catalog";

type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "bestselling";

export default function Shop() {
  const catalog = useCatalog();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categorySlug = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";
  const sortBy = (searchParams.get("sort") as SortOption) || "featured";

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categorySlug ? [categorySlug] : []
  );

  useEffect(() => {
    if (categorySlug) {
      setSelectedCategories([categorySlug]);
    }
  }, [categorySlug]);

  const filteredProducts = useMemo(() => {
    let result = [...catalog.products];

    // Category filter
    if (selectedCategories.length > 0) {
      const catIds = catalog.categories
        .filter((c) => selectedCategories.includes(c.slug))
        .map((c) => c.slug);
      result = result.filter((p) => p.categorySlug && catIds.includes(p.categorySlug));
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.tags.toLowerCase().includes(q)
      );
    }

    // Price filter
    result = result.filter(
      (p) =>
        parseFloat(p.price) >= priceRange[0] &&
        parseFloat(p.price) <= priceRange[1]
    );

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "newest":
        result.sort((a, b) => (a.isNewArrival === b.isNewArrival ? 0 : a.isNewArrival ? -1 : 1));
        break;
      case "bestselling":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        result.sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1));
    }

    return result;
  }, [catalog.products, catalog.categories, selectedCategories, searchQuery, sortBy, priceRange]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setSearchParams({});
  };

  const activeFilterCount = selectedCategories.length + (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-['DM_Sans'] font-semibold text-sm text-[#111] mb-3">Categories</h3>
        <div className="space-y-2">
          {catalog.categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                  selectedCategories.includes(cat.slug)
                    ? "bg-[#1a9e7f] border-[#1a9e7f]"
                    : "border-[#ccc] group-hover:border-[#1a9e7f]"
                }`}
                onClick={() => toggleCategory(cat.slug)}
              >
                {selectedCategories.includes(cat.slug) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-[#333]">{cat.name}</span>
              <span className="text-xs text-[#999] ml-auto">
                {catalog.products.filter((p) => p.categorySlug === cat.slug).length}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-['DM_Sans'] font-semibold text-sm text-[#111] mb-3">Price Range</h3>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-full h-9 px-3 rounded-lg border border-[#e5e5e5] text-sm"
            placeholder="Min"
          />
          <span className="text-[#999]">-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full h-9 px-3 rounded-lg border border-[#e5e5e5] text-sm"
            placeholder="Max"
          />
        </div>
        <input
          type="range"
          min={0}
          max={500}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-[#1a9e7f]"
        />
        <div className="flex justify-between text-xs text-[#666] mt-1">
          <span>GH₵{priceRange[0]}</span>
          <span>GH₵{priceRange[1]}</span>
        </div>
      </div>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="w-full h-10 border border-[#e5e5e5] rounded-lg text-sm text-[#666] hover:border-[#1a9e7f] hover:text-[#1a9e7f] transition-colors"
        >
          Clear Filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-['DM_Sans'] font-bold text-[clamp(2rem,4vw,3rem)] text-[#111] mb-2">
            Shop
          </h1>
          <p className="text-sm text-[#666]">
            Showing {filteredProducts.length} of {catalog.products.length} products
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-[260px] flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-xl border border-[#e5e5e5] p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-['DM_Sans'] font-semibold text-base">Filters</h2>
                <SlidersHorizontal size={16} className="text-[#666]" />
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#e5e5e5]">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#e5e5e5] rounded-lg text-sm text-[#333] hover:border-[#1a9e7f] transition-colors"
              >
                <SlidersHorizontal size={16} />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>

              {/* Sort Dropdown */}
              <div className="relative ml-auto">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    const params = new URLSearchParams(searchParams);
                    params.set("sort", e.target.value);
                    setSearchParams(params);
                  }}
                  className="appearance-none h-10 pl-4 pr-10 rounded-lg border border-[#e5e5e5] text-sm text-[#333] bg-white focus:outline-none focus:ring-2 focus:ring-[#1a9e7f]/30 cursor-pointer"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="bestselling">Best Selling</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] pointer-events-none" />
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {selectedCategories.map((slug) => {
                  const cat = catalog.categories.find((c) => c.slug === slug);
                  return (
                    <span
                      key={slug}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[rgba(26,158,127,0.1)] text-[#1a9e7f] text-xs font-medium rounded-full"
                    >
                      {cat?.name}
                      <button onClick={() => toggleCategory(slug)}>
                        <X size={12} />
                      </button>
                    </span>
                  );
                })}
                {(priceRange[0] > 0 || priceRange[1] < 500) && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[rgba(26,158,127,0.1)] text-[#1a9e7f] text-xs font-medium rounded-full">
                    GH₵{priceRange[0]} - GH₵{priceRange[1]}
                  </span>
                )}
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search size={48} className="text-[#ddd] mb-4" />
                <h3 className="font-['DM_Sans'] font-semibold text-lg text-[#111] mb-2">
                  No products found
                </h3>
                <p className="text-sm text-[#666] mb-4">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {mobileFiltersOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-[300px] bg-white z-50 lg:hidden overflow-y-auto p-5 animate-slide-in-right">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['DM_Sans'] font-semibold text-lg">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-8 h-8 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>
            <FilterContent />
          </div>
        </>
      )}
    </div>
  );
}
