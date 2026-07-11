import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function Toast() {
  const { toast, clearToast } = useStore();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle size={18} className="text-[#1a9e7f]" />,
    error: <AlertCircle size={18} className="text-red-500" />,
    info: <Info size={18} className="text-blue-500" />,
  };

  const borderColors = {
    success: "border-l-[#1a9e7f]",
    error: "border-l-red-500",
    info: "border-l-blue-500",
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] animate-slide-in-right">
      <div
        className={`bg-white rounded-lg shadow-lg border-l-4 ${borderColors[toast.type]} px-4 py-3 flex items-center gap-3 min-w-[280px]`}
      >
        {icons[toast.type]}
        <p className="text-sm text-[#333] flex-1">{toast.message}</p>
        <button
          onClick={clearToast}
          className="text-[#999] hover:text-[#333] transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
