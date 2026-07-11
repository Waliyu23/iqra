import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  CheckCircle, ChevronRight, Star, ArrowRight
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "@/components/ProductCard";
import { testimonials } from "@/data/products";
import { useCatalog } from "@/lib/catalog";

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
  {
    image: "/hero-arrangement.jpg",
    eyebrow: "Welcome to Iqra Bookshop",
    title: "Islamic Books",
    description: "Discover authentic Islamic books, Quranic resources, and meaningful reading for every stage of life.",
  },
  {
    image: "/ramadan-banner.jpg",
    eyebrow: "Curated essentials",
    title: "Islamic Electronics",
    description: "Explore practical electronics designed for daily worship, study, and modern Islamic living.",
  },
  {
    image: "/about-interior.jpg",
    eyebrow: "For growing minds",
    title: "Children's Learning",
    description: "Find engaging educational tools and books that support children’s learning and Islamic values.",
  },
  {
    image: "/cat-decor.jpg",
    eyebrow: "Beautiful for the home",
    title: "Islamic Home Decor",
    description: "Bring elegance and spirituality into your home with thoughtful decor and timeless pieces.",
  },
  {
    image: "/cat-gifts.jpg",
    eyebrow: "Thoughtful gifting",
    title: "Gifts & Accessories",
    description: "Choose meaningful accessories and gifts for celebrations, hospitality, and everyday use.",
  },
];

export default function Home() {
  const catalog = useCatalog();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!heroContentRef.current) return;

    gsap.fromTo(
      heroContentRef.current,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    );
  }, [activeHeroIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(".hero-label", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power3.out" });
      gsap.fromTo(".hero-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power3.out" });
      gsap.fromTo(".hero-body", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.7, ease: "power3.out" });
      gsap.fromTo(".hero-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.9, ease: "power3.out" });
      gsap.fromTo(".hero-badges", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 1.0, ease: "power3.out" });
      gsap.fromTo(".hero-image", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1, delay: 0.6, ease: "power3.out" });

      // Section entrance animations
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        const cards = section.querySelectorAll(".animate-card");
        const texts = section.querySelectorAll(".animate-text");

        gsap.fromTo(cards,
          { y: 60, scale: 0.95, opacity: 0 },
          {
            y: 0, scale: 1, opacity: 1,
            stagger: 0.05,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none none" }
          }
        );

        gsap.fromTo(texts,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const addSectionRef = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const newArrivals = catalog.products.filter((product) => product.isNewArrival);
  const bestsellers = catalog.products.filter((product) => product.isBestseller);
  const featured = catalog.products.filter((product) => product.isFeatured);
  const featuredProduct = featured[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden isolate">
        <div className="absolute inset-0 overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.image}
              className={`absolute inset-0 bg-cover bg-center transition-[transform,opacity] duration-[1400ms] ease-out will-change-transform ${
                index === activeHeroIndex
                  ? "translate-x-0 opacity-100"
                  : index === (activeHeroIndex + 1) % heroSlides.length
                    ? "translate-x-full opacity-0"
                    : "-translate-x-full opacity-0"
              }`}
              style={{
                backgroundImage: `url('${slide.image}')`,
                transformOrigin: "center center",
                animation: index === activeHeroIndex ? "heroZoom 10s ease-in-out infinite alternate" : undefined,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110d]/90 via-[#07110d]/75 to-[#07110d]/40" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full py-20 relative z-10">
          <div className="flex min-h-[60vh] items-end justify-center pb-20">
            {/* Center Content */}
            <div ref={heroContentRef} className="max-w-3xl text-center text-white">
              <span className="hero-label inline-block text-sm font-medium text-[#7ee7c3] uppercase tracking-[0.1em] mb-4">
                {heroSlides[activeHeroIndex].eyebrow}
              </span>
              <h1 className="hero-title font-['DM_Sans'] font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-white mb-6">
                {heroSlides[activeHeroIndex].title}
              </h1>
              <p className="hero-body text-base sm:text-lg text-white/80 max-w-lg mb-8 leading-relaxed">
                {heroSlides[activeHeroIndex].description}
              </p>
              <div className="hero-cta flex flex-wrap justify-center gap-4 mb-10">
                <Link to="/shop" className="btn-primary">
                  Shop Now
                  <ArrowRight size={18} />
                </Link>
                <Link to="/categories" className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20">
                  Explore Categories
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @keyframes heroZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.12); }
        }
      `}</style>

      {/* Featured Categories */}
      <section ref={addSectionRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-8">
            <h2 className="animate-text font-['DM_Sans'] font-bold text-[clamp(1.5rem,3vw,2.5rem)] text-[#111] mb-3">
              Browse by Category
            </h2>
            <p className="animate-text text-sm text-[#666]">
              Find everything you need for your Islamic lifestyle
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {catalog.categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.slug}`}
                className="animate-card group relative h-72 overflow-hidden rounded-2xl"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-['DM_Sans'] font-semibold text-base mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {catalog.products.filter((p) => p.categorySlug === cat.slug).length} Products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section ref={addSectionRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="animate-text font-['DM_Sans'] font-bold text-[clamp(1.5rem,3vw,2rem)] text-[#111]">
                New Arrivals
              </h2>
            </div>
            <Link
              to="/shop?sort=newest"
              className="animate-text flex items-center gap-1 text-sm font-medium text-[#1a9e7f] hover:underline"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.slice(0, 8).map((product) => (
              <div key={product.id} className="animate-card">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Showcases */}
      <section ref={addSectionRef} className="py-16 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="mb-10">
            <h2 className="animate-text font-['DM_Sans'] font-bold text-[clamp(1.5rem,3vw,2.25rem)] text-[#111] mb-3">
              Explore Every Category
            </h2>
            <p className="animate-text text-sm text-[#666] max-w-2xl">
              Browse curated collections from each category and discover the products that best fit your needs.
            </p>
          </div>

          <div className="space-y-10">
            {catalog.categories.map((category) => {
              const categoryProducts = catalog.products
                .filter((product) => product.categorySlug === category.slug)
                .slice(0, 4);

              if (categoryProducts.length === 0) return null;

              return (
                <div key={category.id} className="animate-card">
                  <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <h3 className="font-['DM_Sans'] font-semibold text-xl text-[#111] mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-[#666]">
                        {category.description}
                      </p>
                    </div>
                    <Link
                      to={`/shop?category=${category.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#1a9e7f] hover:underline"
                    >
                      Shop {category.name} <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {categoryProducts.map((product) => (
                      <div key={product.id} className="animate-card">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section ref={addSectionRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="animate-text font-['DM_Sans'] font-bold text-[clamp(1.5rem,3vw,2rem)] text-[#111]">
              Best Sellers
            </h2>
            <Link
              to="/shop?sort=bestselling"
              className="animate-text flex items-center gap-1 text-sm font-medium text-[#1a9e7f] hover:underline"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>

          {featuredProduct && (
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Large Featured */}
              <Link
                to={`/product/${featuredProduct.slug}`}
                className="animate-card relative bg-[#f0e6c0] rounded-2xl p-8 flex flex-col items-center justify-center text-center group overflow-hidden"
              >
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#1a9e7f] text-white text-xs font-semibold rounded-full">
                  Best Seller
                </span>
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-48 h-48 object-contain mb-4 group-hover:scale-105 transition-transform duration-500"
                />
                <h3 className="font-['DM_Sans'] font-semibold text-xl text-[#111] mb-2">
                  {featuredProduct.name}
                </h3>
                <p className="text-2xl font-bold text-[#111] font-['DM_Sans'] mb-4">
                  GH₵{featuredProduct.price}
                </p>
                <span className="btn-primary text-sm">
                  Shop Now <ArrowRight size={16} />
                </span>
              </Link>

              {/* Smaller Grid */}
              <div className="grid grid-cols-2 gap-4">
                {bestsellers.slice(1, 5).map((product) => (
                  <div key={product.id} className="animate-card">
                    <ProductCard product={product} compact />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Iqra */}
      <section ref={addSectionRef} className="py-16 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12">
            <h2 className="animate-text font-['DM_Sans'] font-bold text-[clamp(1.5rem,3vw,2rem)] text-[#111] mb-3">
              Why Choose Iqra Bookshop?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CheckCircle,
                title: "Authentic Products",
                description: "Every book and product is carefully vetted for authenticity and quality.",
              },
              {
                image: "/icons/fast-delivery_5508531.png",
                title: "Fast Delivery",
                description: "We deliver across the country with reliable, trackable shipping.",
              },
              {
                image: "/icons/Secure Payments.jpg",
                title: "Secure Payments",
                description: "Your transactions are protected with industry-standard encryption.",
              },
              {
                image: "/icons/Community Trusted.jpg",
                title: "Community Trusted",
                description: "Serving scholars, families, schools, and mosques since 2015.",
              },
            ].map(({ icon: Icon, image, title, description }) => (
              <div key={title} className="animate-card bg-white rounded-xl p-6 text-center border border-[#e5e5e5]">
                <div className="w-16 h-16 rounded-full bg-[rgba(26,158,127,0.1)] flex items-center justify-center mx-auto mb-4">
                  {image ? (
                    <img src={image} alt="" className="h-10 w-10 rounded-full object-contain mix-blend-multiply" />
                  ) : (
                    <Icon size={28} className="text-[#1a9e7f]" />
                  )}
                </div>
                <h3 className="font-['DM_Sans'] font-semibold text-base text-[#111] mb-2">
                  {title}
                </h3>
                <p className="text-sm text-[#666] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={addSectionRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12">
            <h2 className="animate-text font-['DM_Sans'] font-bold text-[clamp(1.5rem,3vw,2rem)] text-[#111] mb-3">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="animate-card bg-white rounded-xl p-6 border border-[#e5e5e5]">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="text-[#c9a227] fill-[#c9a227]" />
                  ))}
                </div>
                <p className="text-sm text-[#333] italic leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-semibold text-[#111]">{t.name}</div>
                    <div className="text-xs text-[#666]">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section ref={addSectionRef} className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div
            className="animate-card rounded-2xl overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #1a9e7f, #0d7d5f)" }}
          >
            <img
              src="/ramadan-banner.jpg"
              alt="Ramadan Special"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="relative px-8 py-12 md:px-16 md:py-16 text-center">
              <h2 className="animate-text font-['DM_Sans'] font-bold text-[clamp(1.5rem,3vw,2.5rem)] text-white mb-3">
                Ramadan Special: Up to 30% Off
              </h2>
              <p className="animate-text text-white/90 mb-6 max-w-lg mx-auto">
                Prepare for the blessed month with our curated collection of Ramadan essentials.
              </p>
              <Link
                to="/shop"
                className="animate-text inline-flex items-center gap-2 px-8 py-3 bg-white text-[#1a9e7f] rounded-xl font-semibold hover:bg-[#f5f5f5] transition-colors shadow-lg"
              >
                Shop Ramadan Collection <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section ref={addSectionRef} className="py-16 bg-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="animate-text font-['DM_Sans'] font-bold text-2xl text-[#111] mb-3">
            Stay Updated
          </h2>
          <p className="animate-text text-sm text-[#666] mb-6">
            Subscribe to receive updates on new arrivals, special offers, and Islamic articles.
          </p>
          <div className="animate-card flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 h-12 px-5 rounded-xl border border-[#e5e5e5] text-sm focus:outline-none focus:ring-2 focus:ring-[#1a9e7f]/30"
            />
            <button className="h-12 px-8 bg-[#1a9e7f] hover:bg-[#0d7d5f] text-white rounded-xl font-semibold text-sm transition-colors shadow-md">
              Subscribe
            </button>
          </div>
          <p className="animate-text text-xs text-[#999] mt-3">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
