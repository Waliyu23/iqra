import { X, Heart, ShoppingCart } from "lucide-react";
import { useStore } from "@/store/useStore";
import { Link } from "react-router";
import { useCatalog } from "@/lib/catalog";

export default function WishlistSidebar() {
  const catalog = useCatalog();
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart } = useStore();

  const wishlistProducts = catalog.products.filter((p) => wishlist.includes(p.id));

  if (!isWishlistOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[60] animate-fade-in"
        onClick={() => setIsWishlistOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#f8f9fa] z-[70] animate-slide-in-right flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#e5e5e5]">
          <h2 className="font-['DM_Sans'] font-semibold text-lg text-[#111]">
            Your Wishlist ({wishlist.length})
          </h2>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f5f5f5] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {wishlistProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Heart size={48} className="text-[#ddd] mb-4" />
              <p className="text-[#666] mb-2">Your wishlist is empty</p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="text-[#1a9e7f] font-medium text-sm hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="flex gap-4 bg-white rounded-xl p-3 border border-[#e5e5e5]">
                  <Link to={`/product/${product.slug}`} onClick={() => setIsWishlistOpen(false)}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-[#111] line-clamp-2 mb-1">
                      {product.name}
                    </h4>
                    <p className="text-sm font-semibold text-[#1a9e7f] mb-2">
                      GH₵{product.price}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 h-8 bg-[#1a9e7f] hover:bg-[#0d7d5f] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingCart size={14} />
                        Move to Cart
                      </button>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="w-8 h-8 rounded-lg border border-[#e5e5e5] flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
