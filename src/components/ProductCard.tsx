import { useRef, useCallback } from "react";
import { Link } from "react-router";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import { useStore } from "@/store/useStore";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = ((centerY - y) / centerY) * 5;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
    card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
  }, []);

  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.compareAtPrice && parseFloat(product.compareAtPrice) > parseFloat(product.price);
  const discountPercent = hasDiscount && product.compareAtPrice
    ? Math.round((1 - parseFloat(product.price) / parseFloat(product.compareAtPrice)) * 100)
    : 0;

  return (
    <div
      ref={cardRef}
      className="product-card bg-white rounded-xl border border-[#e5e5e5] overflow-hidden group"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Area */}
      <div className={`relative bg-white overflow-hidden ${compact ? "aspect-square" : "aspect-square"}`}>
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-400 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNewArrival && (
            <span className="px-2 py-0.5 bg-[#1a9e7f] text-white text-[10px] font-semibold rounded-full uppercase tracking-wider">
              New
            </span>
          )}
          {hasDiscount && discountPercent > 0 && (
            <span className="px-2 py-0.5 bg-[#c9a227] text-white text-[10px] font-semibold rounded-full uppercase tracking-wider">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#1a9e7f] hover:text-white transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 ${
              inWishlist ? "bg-red-500 text-white" : "bg-white hover:bg-red-500 hover:text-white"
            }`}
          >
            <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4">
        <div className="text-[11px] font-medium text-[#1a9e7f] uppercase tracking-wider mb-1">
          {product.categoryName}
        </div>
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-sm font-semibold text-[#111] line-clamp-2 mb-2 hover:text-[#1a9e7f] transition-colors min-h-[40px]">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.round(parseFloat(product.rating)) ? "text-[#c9a227] fill-[#c9a227]" : "text-[#ddd]"}
              />
            ))}
          </div>
          <span className="text-xs text-[#666]">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-bold text-[#111] font-['DM_Sans']">
            GH₵{product.price}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-[#999] line-through">
              GH₵{product.compareAtPrice}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product)}
          className="w-full h-10 bg-[#1a9e7f] hover:bg-[#0d7d5f] text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-md"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
