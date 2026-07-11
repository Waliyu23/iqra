import {
  Printer, GraduationCap, Package, Search, ArrowRight, CheckCircle
} from "lucide-react";
import { services } from "@/data/products";

const iconMap: Record<string, React.ElementType> = {
  printer: Printer,
  "graduation-cap": GraduationCap,
  package: Package,
  search: Search,
};

export default function Services() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-['DM_Sans'] font-bold text-[clamp(2rem,4vw,3rem)] text-[#111] mb-3">
            Our Services
          </h1>
          <p className="text-base text-[#666] max-w-xl mx-auto">
            Beyond books and products — services for your convenience
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Package;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-[#e5e5e5] p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-[rgba(26,158,127,0.1)] flex items-center justify-center mb-5">
                  <Icon size={28} className="text-[#1a9e7f]" />
                </div>
                <h2 className="font-['DM_Sans'] font-semibold text-xl text-[#111] mb-3">
                  {service.title}
                </h2>
                <p className="text-sm text-[#333] leading-relaxed mb-5">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[#666]">
                      <CheckCircle size={14} className="text-[#1a9e7f] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/233556600270"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#1a9e7f] text-[#1a9e7f] rounded-lg text-sm font-semibold hover:bg-[#1a9e7f] hover:text-white transition-all duration-200"
                >
                  Contact Us <ArrowRight size={16} />
                </a>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#1a9e7f] to-[#0d7d5f] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-['DM_Sans'] font-bold text-2xl md:text-3xl text-white mb-3">
            Need a Custom Service?
          </h2>
          <p className="text-white/90 mb-6 max-w-lg mx-auto">
            We are always ready to assist with special requests and custom projects. Reach out to us via WhatsApp.
          </p>
          <a
            href="https://wa.me/233556600270"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#1a9e7f] rounded-xl font-semibold hover:bg-[#f5f5f5] transition-colors shadow-lg"
          >
            Get in Touch <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
