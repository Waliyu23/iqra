import { X, Plus, Minus, ShoppingCart, Heart, Star, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/store/useStore";

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);
  const hasDiscount = quickViewProduct.compareAtPrice && parseFloat(quickViewProduct.compareAtPrice) > parseFloat(quickViewProduct.price);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setQuantity(1);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi, I'd like to order: ${quickViewProduct.name} - GH₵${quickViewProduct.price}`
  );

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[80] animate-fade-in"
        onClick={() => setQuickViewProduct(null)}
      />
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto pointer-events-auto animate-scale-in">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-1/2 bg-[#f8f9fa] p-8 flex items-center justify-center">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="max-w-full max-h-[300px] object-contain"
              />
            </div>

            {/* Details */}
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium text-[#1a9e7f] uppercase tracking-wider">
                  {quickViewProduct.categoryName}
                </span>
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f5f5f5] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <h2 className="font-['DM_Sans'] font-bold text-xl text-[#111] mb-2">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.round(parseFloat(quickViewProduct.rating)) ? "text-[#c9a227] fill-[#c9a227]" : "text-[#ddd]"}
                    />
                  ))}
                </div>
                <span className="text-xs text-[#666]">({quickViewProduct.reviewCount} reviews)</span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#111] font-['DM_Sans']">
                GH₵{quickViewProduct.price}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-[#999] line-through">
                    GH₵{quickViewProduct.compareAtPrice}
                  </span>
                )}
              </div>

              <p className="text-sm text-[#666] mb-6 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-[#333]">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-lg border border-[#e5e5e5] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-sm font-semibold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-lg border border-[#e5e5e5] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-[#1a9e7f] hover:bg-[#0d7d5f] text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                    inWishlist
                      ? "border-red-500 bg-red-50 text-red-500"
                      : "border-[#e5e5e5] hover:border-red-300 hover:text-red-500"
                  }`}
                >
                  <Heart size={20} fill={inWishlist ? "currentColor" : "none"} />
                </button>
              </div>

              {/* WhatsApp Order */}
              <a
                href={`https://wa.me/233556600270?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 border-2 border-[#1a9e7f] text-[#1a9e7f] rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#1a9e7f] hover:text-white transition-all duration-200"
              >
                <MessageCircle size={16} />
                Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
