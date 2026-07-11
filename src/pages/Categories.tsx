import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useCatalog } from "@/lib/catalog";

export default function Categories() {
  const catalog = useCatalog();
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mb-10">
          <h1 className="font-['DM_Sans'] font-bold text-[clamp(2rem,4vw,3rem)] text-[#111] mb-2">
            Categories
          </h1>
          <p className="text-sm text-[#666]">
            Browse our complete collection by category
          </p>
        </div>

        <div className="space-y-12">
          {catalog.categories.map((category) => {
            const categoryProducts = catalog.products.filter((p) => p.categorySlug === category.slug);

            return (
              <section key={category.id} className="overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white">
                <div className="relative isolate min-h-[280px] overflow-hidden px-6 py-10 sm:px-10 lg:min-h-[340px] lg:px-14 lg:py-14">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 -z-20 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/20" />
                  <div className="flex h-full max-w-xl flex-col justify-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#f0e6c0]">
                      Explore the collection
                    </p>
                    <h2 className="font-['DM_Sans'] mb-3 text-3xl font-bold text-white sm:text-4xl">
                      {category.name}
                    </h2>
                    <p className="mb-6 max-w-lg text-sm leading-6 text-white/85 sm:text-base">{category.description}</p>
                    <Link
                      to={`/shop?category=${category.slug}`}
                      className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#1a9e7f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0d7d5f]"
                    >
                      Shop {category.name} <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                {categoryProducts.length > 0 && (
                  <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4 lg:p-8">
                    {categoryProducts.slice(0, 4).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
