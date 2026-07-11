import { useState } from "react";
import { useParams, Link, Navigate } from "react-router";
import {
  Heart, ShoppingCart, Star, ChevronRight, MessageCircle, Plus, Minus,
  Truck, Shield, RefreshCw, Share2
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { useCatalog } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const catalog = useCatalog();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  const product = catalog.products.find((item) => item.slug === slug);

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.compareAtPrice && parseFloat(product.compareAtPrice) > parseFloat(product.price);
  const discountPercent = hasDiscount && product.compareAtPrice
    ? Math.round((1 - parseFloat(product.price) / parseFloat(product.compareAtPrice)) * 100)
    : 0;

  const relatedProducts = catalog.products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const whatsappMessage = encodeURIComponent(
    `Hi, I'd like to order: ${product.name} - GH₵${product.price}`
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#666] mb-8">
          <Link to="/" className="hover:text-[#1a9e7f] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-[#1a9e7f] transition-colors">Shop</Link>
          <ChevronRight size={14} />
          <span className="text-[#333]">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Image */}
          <div className="bg-[#f8f9fa] rounded-2xl p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-[400px] object-contain"
            />
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-[#1a9e7f] uppercase tracking-wider">
                {product.categoryName}
              </span>
              {product.isNewArrival && (
                <span className="px-2 py-0.5 bg-[#1a9e7f] text-white text-[10px] font-semibold rounded-full">
                  NEW
                </span>
              )}
            </div>

            <h1 className="font-['DM_Sans'] font-bold text-2xl md:text-3xl text-[#111] mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.round(parseFloat(product.rating)) ? "text-[#c9a227] fill-[#c9a227]" : "text-[#ddd]"}
                  />
                ))}
              </div>
              <span className="text-sm text-[#666]">({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-[#111] font-['DM_Sans']">
                GH₵{product.price}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-xl text-[#999] line-through">
                    GH₵{product.compareAtPrice}
                  </span>
                  {discountPercent > 0 && (
                    <span className="px-2 py-0.5 bg-[#c9a227] text-white text-xs font-semibold rounded-full">
                      Save {discountPercent}%
                    </span>
                  )}
                </>
              )}
            </div>

            <p className="text-sm text-[#666] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* SKU & Stock */}
            <div className="flex items-center gap-6 mb-6 text-sm">
              <div className="text-[#666]">
                SKU: <span className="text-[#333] font-medium">{product.sku}</span>
              </div>
              <div className="text-[#666]">
                Availability:{" "}
                <span className={product.stockQuantity > 0 ? "text-[#1a9e7f] font-medium" : "text-red-500 font-medium"}>
                  {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity})` : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-[#333]">Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-[#e5e5e5] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-sm font-semibold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-[#e5e5e5] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 h-14 bg-[#1a9e7f] hover:bg-[#0d7d5f] text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg text-base"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                  inWishlist
                    ? "border-red-500 bg-red-50 text-red-500"
                    : "border-[#e5e5e5] hover:border-red-300 hover:text-red-500"
                }`}
              >
                <Heart size={22} fill={inWishlist ? "currentColor" : "none"} />
              </button>
              <button className="w-14 h-14 rounded-xl border-2 border-[#e5e5e5] flex items-center justify-center hover:border-[#1a9e7f] hover:text-[#1a9e7f] transition-colors">
                <Share2 size={20} />
              </button>
            </div>

            {/* WhatsApp Order */}
            <a
              href={`https://wa.me/233556600270?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 border-2 border-[#1a9e7f] text-[#1a9e7f] rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#1a9e7f] hover:text-white transition-all duration-200 mb-6"
            >
              <MessageCircle size={18} />
              Order via WhatsApp
            </a>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: Shield, label: "Secure Payment" },
                { icon: RefreshCw, label: "Easy Returns" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5 p-3 bg-[#f5f5f5] rounded-lg">
                  <Icon size={18} className="text-[#1a9e7f]" />
                  <span className="text-[11px] text-[#666] font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="flex gap-6 border-b border-[#e5e5e5] mb-6">
            {(["description", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab ? "text-[#1a9e7f]" : "text-[#666] hover:text-[#333]"
                }`}
              >
                {tab === "description" ? "Description" : `Reviews (${product.reviewCount})`}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a9e7f]" />
                )}
              </button>
            ))}
          </div>

          {activeTab === "description" ? (
            <div className="text-sm text-[#333] leading-relaxed">
              <p className="mb-4">{product.description}</p>
              <p>
                This product is carefully selected to meet our high standards of quality and authenticity.
                We work directly with trusted suppliers to ensure you receive the best Islamic products available.
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-[#666]">Reviews will be displayed here.</p>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-['DM_Sans'] font-bold text-xl text-[#111] mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
