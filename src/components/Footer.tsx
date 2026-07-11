import { Link } from "react-router";
import { MapPin, Phone, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.JPG" alt="Iqra Bookshop" className="h-14 w-14 rounded-xl object-cover" />
              <div>
                <div className="font-['DM_Sans'] font-bold text-lg leading-tight">IQRA</div>
                <div className="text-[10px] text-[#666] leading-tight tracking-wide">Bookshop</div>
              </div>
            </div>
            <p className="text-sm text-[#999] leading-relaxed mb-4">
              Your trusted destination for authentic Islamic books, educational resources, electronics, home decor, gifts, and professional services since 2015.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1a9e7f] transition-colors">
                <img src="/icons/instagram.svg" alt="Instagram" className="h-4 w-4 brightness-0 invert" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1a9e7f] transition-colors">
                <img src="/icons/facebook.webp" alt="Facebook" className="h-4 w-4 object-contain" />
              </a>
              <a
                href="https://wa.me/233556600270"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1a9e7f] transition-colors"
              >
                <img src="/icons/whatsapp-icon-logo-symbol-free-png.webp" alt="WhatsApp" className="h-4 w-4 object-contain" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-['DM_Sans'] font-semibold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", path: "/" },
                { label: "Shop", path: "/shop" },
                { label: "Categories", path: "/categories" },
                { label: "About Us", path: "/about" },
                { label: "Blog", path: "/blog" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-[#999] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-['DM_Sans'] font-semibold text-base mb-4">Customer Service</h3>
            <ul className="space-y-2.5">
              {["Shipping Information", "Returns & Exchanges", "FAQ", "Privacy Policy", "Terms of Service"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-[#999] hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-['DM_Sans'] font-semibold text-base mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#1a9e7f] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[#999]">
                  Kumasi, Aboabo Post Office, Airport Road - Ghana
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#1a9e7f] flex-shrink-0" />
                <span className="text-sm text-[#999]">+233 556 600 270</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#1a9e7f] flex-shrink-0" />
                <span className="text-sm text-[#999]">info@iqrabookshop.com</span>
              </li>
            </ul>
            <a
              href="https://wa.me/233556600270"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 bg-[#1a9e7f] hover:bg-[#0d7d5f] text-white rounded-lg text-sm font-medium transition-colors"
            >
              <img src="/icons/whatsapp-icon-logo-symbol-free-png.webp" alt="" className="h-4 w-4 object-contain" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#666]">
            &copy; 2025 Iqra Bookshop. All rights reserved.
          </p>
          <p className="text-xs text-[#666] flex items-center gap-1">
            Made with <Heart size={12} className="text-red-500 fill-red-500" /> for the Ummah
          </p>
        </div>
      </div>
    </footer>
  );
}
