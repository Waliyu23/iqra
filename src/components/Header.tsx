import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Search, ShoppingBag, Heart, Menu, X, User } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useAuth } from "@/hooks/useAuth";
import { useCatalog } from "@/lib/catalog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const catalog = useCatalog();
  const {
    setIsCartOpen,
    setIsWishlistOpen,
    setIsMobileMenuOpen,
    searchQuery,
    setSearchQuery,
    getCartCount,
    wishlist,
  } = useStore();
  const { user, isAuthenticated } = useAuth();
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;

  const searchResults = searchQuery.trim().length > 1
    ? catalog.products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[var(--sidebar-width)] h-16 bg-[#1a9e7f] border-b border-[#0d7d5f] z-40 flex items-center px-4 sm:px-6">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden mr-3 p-2 text-white hover:bg-white/15 rounded-lg transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Category Dropdown - Desktop */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="hidden md:flex items-center gap-1 mr-4 cursor-pointer hover:text-[#1a9e7f] transition-colors"
          >
            <span className="text-sm font-medium text-white">All Categories</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
              <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 p-1.5">
          <DropdownMenuItem asChild>
            <Link to="/shop" className="cursor-pointer font-medium text-[#1a9e7f]">
              Shop All Products
            </Link>
          </DropdownMenuItem>
          {catalog.categories.map((category) => (
            <DropdownMenuItem key={category.id} asChild>
              <Link to={`/shop?category=${category.slug}`} className="cursor-pointer">
                {category.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Search Bar */}
      <div ref={searchRef} className="flex-1 max-w-xl relative">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <input
            type="text"
            placeholder="Search products, books, electronics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            className="w-full h-10 pl-10 pr-4 rounded-full bg-white border-none text-sm text-[#333] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#333]"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search Dropdown */}
        {searchFocused && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-[#e5e5e5] overflow-hidden z-50">
            {searchResults.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                onClick={() => {
                  setSearchQuery("");
                  setSearchFocused(false);
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#f5f5f5] transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#111] truncate">{product.name}</div>
                  <div className="text-xs text-[#666]">{product.categoryName}</div>
                </div>
                <div className="text-sm font-semibold text-[#1a9e7f]">GH₵{product.price}</div>
              </Link>
            ))}
            <button
              onClick={() => {
                navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
                setSearchFocused(false);
              }}
              className="w-full px-4 py-3 text-sm text-[#1a9e7f] font-medium hover:bg-[#f5f5f5] transition-colors border-t border-[#e5e5e5]"
            >
              View all results for &quot;{searchQuery}&quot;
            </button>
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1 ml-4">
        {/* Wishlist */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative p-2.5 hover:bg-white/15 rounded-lg transition-colors"
        >
          <Heart size={20} className="text-white" />
          {wishlistCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-[#1a9e7f] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2.5 hover:bg-white/15 rounded-lg transition-colors"
        >
          <ShoppingBag size={20} className="text-white" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-[#1a9e7f] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        {/* User */}
        {isAuthenticated && user ? (
          <Link to="/account" className="ml-1 p-1.5 hover:bg-white/15 rounded-lg transition-colors">
            {user.avatar ? (
              <img src={user.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#1a9e7f] flex items-center justify-center text-white text-xs font-semibold">
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
          </Link>
        ) : (
          <Link to="/login" className="ml-1 p-2.5 hover:bg-white/15 rounded-lg transition-colors">
            <User size={20} className="text-white" />
          </Link>
        )}
      </div>
    </header>
  );
}
