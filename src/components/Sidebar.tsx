import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  Home, ShoppingBag, Grid3X3, Briefcase, Monitor, Users, BookOpen, Phone,
  ChevronLeft, ChevronRight, LogIn, LogOut,
  X
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Shop", path: "/shop", icon: ShoppingBag },
  { label: "Categories", path: "/categories", icon: Grid3X3 },
  { label: "Services", path: "/services", icon: Briefcase },
  { label: "Corevex Tech", path: "/corevex", icon: Monitor },
  { label: "About Us", path: "/about", icon: Users },
  { label: "Blog", path: "/blog", icon: BookOpen },
  { label: "Contact", path: "/contact", icon: Phone },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useStore();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-[#e5e5e5]">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.JPG" alt="Iqra Bookshop" className="h-14 w-14 rounded-xl object-cover" />
          {!collapsed && (
            <div>
              <div className="font-['DM_Sans'] font-bold text-[15px] text-white leading-tight">IQRA</div>
              <div className="text-[10px] text-white/80 leading-tight tracking-wide">Bookshop</div>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex w-7 h-7 items-center justify-center rounded-md hover:bg-[#f5f5f5] transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden w-8 h-8 items-center justify-center"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all duration-200 ${
                active
                  ? "text-white font-medium"
                  : "text-white/90 hover:bg-white/15"
              }`}
              style={active ? { background: "rgba(255,255,255,0.18)" } : {}}
            >
              <Icon size={collapsed ? 20 : 18} strokeWidth={active ? 2 : 1.5} />
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
              {active && !collapsed && (
                <div className="ml-auto w-[3px] h-5 rounded-full bg-white" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 border-t border-[#e5e5e5]" />

      {/* Auth Section */}
      <div className="px-3 py-4">
        {isAuthenticated && user ? (
          <div className="flex items-center gap-3 px-2">
            {user.avatar ? (
              <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#1a9e7f] flex items-center justify-center text-white text-sm font-semibold">
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{user.name || "User"}</div>
                <button
                  onClick={() => logout()}
                  className="text-xs text-white/80 hover:text-white flex items-center gap-1 mt-0.5"
                >
                  <LogOut size={12} /> Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg border-2 border-white/70 text-white hover:bg-white/15 hover:text-white transition-all duration-200"
          >
            <LogIn size={18} />
            {!collapsed && <span className="text-sm font-semibold">Sign In / Register</span>}
          </Link>
        )}
      </div>

      {/* Social & Help */}
      {!collapsed && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-3 mb-3">
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              <img src="/icons/instagram.svg" alt="Instagram" className="h-[18px] w-[18px] brightness-0 invert" />
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              <img src="/icons/facebook.webp" alt="Facebook" className="h-[18px] w-[18px] object-contain" />
            </a>
            <a href="https://wa.me/233556600270" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
              <img src="/icons/whatsapp-icon-logo-symbol-free-png.webp" alt="WhatsApp" className="h-[18px] w-[18px] object-contain" />
            </a>
          </div>
          <a
            href="https://wa.me/233556600270?text=Hi%20Iqra%20Bookshop"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-white/80 hover:text-white transition-colors"
          >
            <img src="/icons/whatsapp-icon-logo-symbol-free-png.webp" alt="" className="h-4 w-4 object-contain" />
            <span>Need Help? Chat with us</span>
          </a>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex fixed left-0 top-0 h-full bg-[#111] border-r border-[#111] z-50 flex-col transition-all duration-300`}
        style={{ width: collapsed ? "var(--sidebar-collapsed)" : "var(--sidebar-width)" }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-[280px] bg-[#111] z-50 flex-col transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
