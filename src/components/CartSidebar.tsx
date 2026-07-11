import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useStore } from "@/store/useStore";

export default function CartSidebar() {
  const navigate = useNavigate();
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, getCartTotal, clearCart } = useStore();
  const total = getCartTotal();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[60] animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#f8f9fa] z-[70] animate-slide-in-right flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#e5e5e5]">
          <h2 className="font-['DM_Sans'] font-semibold text-lg text-[#111]">
            Your Cart ({cart.length})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f5f5f5] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-[#ddd] mb-4" />
              <p className="text-[#666] mb-2">Your cart is empty</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-[#1a9e7f] font-medium text-sm hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 bg-white rounded-xl p-3 border border-[#e5e5e5]">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-[#111] line-clamp-2 mb-1">
                      {item.product.name}
                    </h4>
                    <p className="text-sm font-semibold text-[#1a9e7f] mb-2">
                      GH₵{item.product.price}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-md border border-[#e5e5e5] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-md border border-[#e5e5e5] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#999] hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="bg-white border-t border-[#e5e5e5] px-6 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#666]">Subtotal</span>
              <span className="font-['DM_Sans'] font-bold text-lg text-[#111]">GH₵{total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full h-12 bg-[#1a9e7f] hover:bg-[#0d7d5f] text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>
            <div className="flex items-center justify-between">
              <button
                onClick={() => clearCart()}
                className="text-sm text-[#999] hover:text-red-500 transition-colors"
              >
                Clear Cart
              </button>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-sm text-[#1a9e7f] font-medium hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
