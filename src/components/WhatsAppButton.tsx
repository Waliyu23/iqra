export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/233556600270?text=Hi%20Iqra%20Bookshop"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      title="Chat on WhatsApp"
    >
      <img
        src="/icons/whatsapp-icon-logo-symbol-free-png.webp"
        alt="WhatsApp"
        className="h-7 w-7 object-contain"
      />
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-white rounded-lg shadow-md text-sm text-[#333] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat on WhatsApp
      </span>
    </a>
  );
}
