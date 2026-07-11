import {
  ShoppingCart, Building, School, Stethoscope, HeartHandshake,
  Smartphone, Code, Wrench, Lightbulb, ArrowRight
} from "lucide-react";
import { corevexServices } from "@/data/products";

const iconMap: Record<string, React.ElementType> = {
  "shopping-cart": ShoppingCart,
  building: Building,
  school: School,
  stethoscope: Stethoscope,
  heartHandshake: HeartHandshake,
  smartphone: Smartphone,
  code: Code,
  wrench: Wrench,
  lightbulb: Lightbulb,
};

const processSteps = [
  { step: "01", title: "Discovery", description: "We understand your business goals, target audience, and project requirements through detailed consultation." },
  { step: "02", title: "Design", description: "Our designers create stunning, user-friendly mockups that align with your brand identity." },
  { step: "03", title: "Development", description: "Our developers build robust, scalable solutions using the latest technologies and best practices." },
  { step: "04", title: "Launch & Support", description: "We deploy your project and provide ongoing maintenance and support for continued success." },
];

export default function Corevex() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#111] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
            <Code size={16} className="text-[#1a9e7f]" />
            <span className="text-sm text-white/80">A Division of Iqra Bookshop</span>
          </div>
          <h1 className="font-['DM_Sans'] font-bold text-[clamp(2rem,4vw,3.5rem)] text-white mb-4">
            Corevex Tech Solutions
          </h1>
          <p className="text-lg text-[#999] max-w-2xl mx-auto mb-8">
            Modern Digital Solutions for Your Business. We combine creativity, technology, and innovation to deliver reliable and user-friendly solutions.
          </p>
          <a
            href="https://wa.me/233556600270?text=Hi%20Corevex%20Tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#1a9e7f] hover:bg-[#0d7d5f] text-white rounded-xl font-semibold transition-colors shadow-lg"
          >
            Get a Quote <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12">
            <h2 className="font-['DM_Sans'] font-bold text-[clamp(1.5rem,3vw,2rem)] text-[#111] mb-3">
              Our Services
            </h2>
            <p className="text-sm text-[#666]">
              Comprehensive digital solutions tailored to your needs
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {corevexServices.map((service) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-xl border border-[#e5e5e5] p-6 hover:shadow-lg hover:border-[#1a9e7f]/20 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[rgba(26,158,127,0.1)] flex items-center justify-center mb-4 group-hover:bg-[#1a9e7f] transition-colors">
                    <Icon size={22} className="text-[#1a9e7f] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-['DM_Sans'] font-semibold text-base text-[#111] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#666] leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-[#1a9e7f] hover:underline">
                    Learn More <ArrowRight size={14} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12">
            <h2 className="font-['DM_Sans'] font-bold text-[clamp(1.5rem,3vw,2rem)] text-[#111] mb-3">
              How We Work
            </h2>
            <p className="text-sm text-[#666]">
              Our proven process ensures successful project delivery
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-xl p-6 text-center border border-[#e5e5e5]">
                  <div className="w-12 h-12 rounded-full bg-[#1a9e7f] flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-sm">{step.step}</span>
                  </div>
                  <h3 className="font-['DM_Sans'] font-semibold text-base text-[#111] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#666] leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#e5e5e5]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Image */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/corevex-office.jpg"
              alt="Corevex Tech Office"
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#111]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['DM_Sans'] font-bold text-[clamp(1.5rem,3vw,2.5rem)] text-white mb-4">
            Ready to Go Digital?
          </h2>
          <p className="text-[#999] mb-8">
            Let us help you establish and grow your online presence. Contact Corevex Tech today for a free consultation.
          </p>
          <a
            href="https://wa.me/233556600270?text=Hi%20Corevex%20Tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#1a9e7f] hover:bg-[#0d7d5f] text-white rounded-xl font-semibold transition-colors shadow-lg"
          >
            Contact Corevex <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
