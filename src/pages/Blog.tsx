import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/products";

export default function Blog() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-['DM_Sans'] font-bold text-[clamp(2rem,4vw,3rem)] text-[#111] mb-2">
            Blog
          </h1>
          <p className="text-sm text-[#666]">
            Islamic articles, book reviews, and product guides
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-12 bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <img
              src={blogPosts[0].image}
              alt={blogPosts[0].title}
              className="w-full h-64 lg:h-full object-cover"
            />
            <div className="p-8 flex flex-col justify-center">
              <span className="inline-block w-fit px-3 py-1 bg-[rgba(26,158,127,0.1)] text-[#1a9e7f] text-xs font-semibold rounded-full mb-4">
                {blogPosts[0].category}
              </span>
              <h2 className="font-['DM_Sans'] font-bold text-xl md:text-2xl text-[#111] mb-3">
                {blogPosts[0].title}
              </h2>
              <p className="text-sm text-[#666] leading-relaxed mb-4">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs text-[#999]">{blogPosts[0].date}</span>
                <span className="flex items-center gap-1 text-xs text-[#999]">
                  <Clock size={12} /> {blogPosts[0].readTime}
                </span>
              </div>
              <button className="inline-flex items-center gap-1 text-sm font-medium text-[#1a9e7f] hover:underline w-fit">
                Read More <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="inline-block px-3 py-1 bg-[rgba(26,158,127,0.1)] text-[#1a9e7f] text-[11px] font-semibold rounded-full mb-3">
                  {post.category}
                </span>
                <h3 className="font-['DM_Sans'] font-semibold text-base text-[#111] mb-2 line-clamp-2 group-hover:text-[#1a9e7f] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-[#666] line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#999]">{post.date}</span>
                    <span className="flex items-center gap-1 text-xs text-[#999]">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>
                  <button className="text-sm font-medium text-[#1a9e7f] hover:underline">
                    Read
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
