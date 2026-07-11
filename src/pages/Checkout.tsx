import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, CheckCircle2, ShoppingBag, MessageCircle } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function Checkout() {
  const { cart, getCartTotal, clearCart, showToast } = useStore();
  const total = getCartTotal();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const requiredFilled = useMemo(() => {
    return name.trim() && address.trim() && phone.trim();
  }, [name, address, phone]);

  const handlePlaceOrder = () => {
    if (!requiredFilled) {
      showToast("Please complete your name, address and phone number", "error");
      return;
    }

    clearCart();
    setSubmitted(true);
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
    showToast("Order details sent to WhatsApp", "success");
  };

  const whatsappLink = `https://wa.me/2333556600270?text=${encodeURIComponent(`Hello Iqra Bookshop, I would like to place/manage my order.\n\nCustomer details:\n- Name: ${name}\n- Phone: ${phone}\n- Email: ${email || "None"}\n- Address: ${address}\n- Notes: ${notes || "None"}\n\nOrder summary:\n${cart.map((item) => `- ${item.product.name} x${item.quantity}`).join("\n")}\n\nTotal: GH₵${total.toFixed(2)}\n\nPlease help arrange payment and delivery.`)}`;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center rounded-3xl border border-[#e5e5e5] bg-white p-10 text-center shadow-sm">
          <ShoppingBag size={48} className="mb-4 text-[#1a9e7f]" />
          <h1 className="mb-3 font-['DM_Sans'] text-2xl font-semibold text-[#111]">Your cart is empty</h1>
          <p className="mb-6 max-w-md text-sm text-[#666]">
            Add a few items to your cart and come back here to complete your order.
          </p>
          <Link to="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link to="/shop" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#1a9e7f] hover:underline">
          <ArrowLeft size={16} />
          Back to shopping
        </Link>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-[#e5e5e5] bg-white p-6 shadow-sm lg:sticky lg:top-6 lg:h-fit">
            <h2 className="mb-4 font-['DM_Sans'] text-xl font-semibold text-[#111]">Order Summary</h2>
            <div className="space-y-3 text-sm text-[#666]">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>GH₵{total.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="text-[#1a9e7f]">Varies by location</span>
              </div>
              <div className="flex items-center justify-between border-t border-[#ececec] pt-3 text-base font-semibold text-[#111]">
                <span>Total</span>
                <span>GH₵{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#e5e5e5] bg-[#f8f9fa] p-4">
              <p className="font-medium text-[#111]">Manage your order</p>
              <p className="mt-2 text-sm text-[#666]">After submitting, your details will be sent to our WhatsApp team for payment and delivery arrangement.</p>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={!requiredFilled}
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white transition-all ${requiredFilled ? "bg-[#1a9e7f] hover:bg-[#0d7d5f]" : "cursor-not-allowed bg-[#9fcfbe]"}`}
            >
              <CheckCircle2 size={18} />
              Submit Order
            </button>


            <div className="mt-6 rounded-2xl bg-[#f8f9fa] p-4 text-sm text-[#666]">
              <p className="font-medium text-[#111]">Need help?</p>
              <p className="mt-2">Contact us at <span className="font-semibold text-[#1a9e7f]">+2333556600270</span> for order support.</p>
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h1 className="font-['DM_Sans'] text-2xl font-semibold text-[#111]">Checkout</h1>
                  <p className="mt-1 text-sm text-[#666]">Complete your order in a few simple steps.</p>
                </div>
                <span className="rounded-full bg-[#ecfdf7] px-3 py-1 text-sm font-medium text-[#1a9e7f]">Step 1 of 2</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111]">Full Name <span className="text-red-500">*</span></label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border border-[#e5e5e5] px-4 py-3 text-sm outline-none focus:border-[#1a9e7f]"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#111]">Phone Number <span className="text-red-500">*</span></label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full rounded-2xl border border-[#e5e5e5] px-4 py-3 text-sm outline-none focus:border-[#1a9e7f]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#111]">Email Address</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-[#e5e5e5] px-4 py-3 text-sm outline-none focus:border-[#1a9e7f]"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111]">Delivery Address <span className="text-red-500">*</span></label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={4}
                    placeholder="House number, street, area, city"
                    className="w-full rounded-2xl border border-[#e5e5e5] px-4 py-3 text-sm outline-none focus:border-[#1a9e7f]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#111]">Order Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Any delivery instructions?"
                    className="w-full rounded-2xl border border-[#e5e5e5] px-4 py-3 text-sm outline-none focus:border-[#1a9e7f]"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-['DM_Sans'] text-xl font-semibold text-[#111]">Order Review</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4 rounded-2xl border border-[#ececec] p-4">
                    <img src={item.product.image} alt={item.product.name} className="h-16 w-16 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-[#111]">{item.product.name}</h3>
                      <p className="mt-1 text-sm text-[#666]">Qty {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[#1a9e7f]">GH₵{(parseFloat(item.product.price) * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
