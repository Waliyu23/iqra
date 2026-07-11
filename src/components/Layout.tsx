import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import CartSidebar from "./CartSidebar";
import WishlistSidebar from "./WishlistSidebar";
import QuickViewModal from "./QuickViewModal";
import Toast from "./Toast";
import WhatsAppButton from "./WhatsAppButton";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="lg:ml-[var(--sidebar-width)]">
        <Header />
        <main className="pt-16 min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
      <CartSidebar />
      <WishlistSidebar />
      <QuickViewModal />
      <Toast />
      <WhatsAppButton />
    </div>
  );
}
