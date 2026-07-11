import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface AppState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // UI State
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;

  // Quick View
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Toast
  toast: { message: string; type: "success" | "error" | "info" } | null;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  clearToast: () => void;

  // Session
  sessionId: string;
}

function generateSessionId(): string {
  return "session_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

function getInitialSessionId(): string {
  const stored = localStorage.getItem("iqra_session_id");
  if (stored) return stored;
  const newId = generateSessionId();
  localStorage.setItem("iqra_session_id", newId);
  return newId;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (product, quantity = 1) => {
        const { cart, showToast } = get();
        const existing = cart.find((item) => item.product.id === product.id);
        if (existing) {
          set({
            cart: cart.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { product, quantity }] });
        }
        showToast(`${product.name} added to cart`, "success");
      },
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.product.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + parseFloat(item.product.price) * item.quantity,
          0
        );
      },
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Wishlist
      wishlist: [],
      toggleWishlist: (productId) => {
        const { wishlist, showToast } = get();
        const isInList = wishlist.includes(productId);
        if (isInList) {
          set({ wishlist: wishlist.filter((id) => id !== productId) });
          showToast("Removed from wishlist", "info");
        } else {
          set({ wishlist: [...wishlist, productId] });
          showToast("Added to wishlist", "success");
        }
      },
      isInWishlist: (productId) => {
        return get().wishlist.includes(productId);
      },

      // Search
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),

      // UI State
      isCartOpen: false,
      setIsCartOpen: (open) => set({ isCartOpen: open }),
      isWishlistOpen: false,
      setIsWishlistOpen: (open) => set({ isWishlistOpen: open }),
      isMobileMenuOpen: false,
      setIsMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

      // Quick View
      quickViewProduct: null,
      setQuickViewProduct: (product) => set({ quickViewProduct: product }),

      // Toast
      toast: null,
      showToast: (message, type = "success") => {
        set({ toast: { message, type } });
        setTimeout(() => set({ toast: null }), 3000);
      },
      clearToast: () => set({ toast: null }),

      // Session
      sessionId: getInitialSessionId(),
    }),
    {
      name: "iqra-bookshop-store",
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        sessionId: state.sessionId,
      }),
    }
  )
);
