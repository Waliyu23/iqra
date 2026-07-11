export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: string;
  compareAtPrice: string | null;
  categoryId: number;
  categoryName: string;
  categorySlug?: string;
  image: string;
  sku: string;
  stockQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  isBestseller: boolean;
  isNewArrival: boolean;
  rating: string;
  reviewCount: number;
  tags: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  sortOrder: number;
}

export const categories: Category[] = [
  { id: 1, name: "Islamic Books", slug: "islamic-books", description: "Authentic Islamic literature for all ages and levels of knowledge.", image: "/cat-books.jpg", sortOrder: 1 },
  { id: 2, name: "Islamic Electronics", slug: "islamic-electronics", description: "Technology to support your worship and learning.", image: "/cat-electronics.jpg", sortOrder: 2 },
  { id: 3, name: "Children's Learning", slug: "childrens-learning", description: "Fun and educational Islamic products for children.", image: "/cat-children.jpg", sortOrder: 3 },
  { id: 4, name: "Islamic Home Decor", slug: "islamic-home-decor", description: "Bring beauty and inspiration into your home.", image: "/cat-decor.jpg", sortOrder: 4 },
  { id: 5, name: "Gifts & Accessories", slug: "gifts-accessories", description: "Thoughtful gifts for every occasion.", image: "/cat-gifts.jpg", sortOrder: 5 },
];

export const products: Product[] = [];

export const testimonials = [
  {
    id: 1,
    name: "Ahmad K.",
    location: "Lagos",
    rating: 5,
    text: "Iqra Bookshop has been my go-to for Islamic books for years. The selection is unmatched and the service is excellent.",
    image: "/testimonial-1.jpg",
  },
  {
    id: 2,
    name: "Fatima S.",
    location: "Abuja",
    rating: 5,
    text: "The children's Islamic learning toys I bought are wonderful. My kids love them and they're learning so much!",
    image: "/testimonial-1.jpg",
  },
  {
    id: 3,
    name: "Ibrahim M.",
    location: "Kano",
    rating: 5,
    text: "Fast delivery, well-packaged, and authentic products. Highly recommend for anyone looking for quality Islamic resources.",
    image: "/testimonial-3.jpg",
  },
];

export const blogPosts = [
  {
    id: 1,
    title: "10 Essential Islamic Books Every Muslim Should Read",
    excerpt: "Discover the must-have books that will enrich your understanding of Islam and strengthen your faith journey.",
    category: "Book Reviews",
    image: "/blog-books-review.jpg",
    date: "March 15, 2025",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "How to Choose the Right Quran Speaker for Your Home",
    excerpt: "A comprehensive guide to selecting the perfect Quran speaker with features that match your family's needs.",
    category: "Product Guides",
    image: "/product-quran-speaker.jpg",
    date: "March 10, 2025",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "Preparing Your Children for Ramadan: A Parent's Guide",
    excerpt: "Tips and activities to help your children understand and appreciate the blessed month of Ramadan.",
    category: "Islamic Articles",
    image: "/ramadan-banner.jpg",
    date: "March 5, 2025",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "Understanding the Different Types of Prayer Mats",
    excerpt: "From Turkish to Persian designs, learn about the various prayer mat styles and their unique features.",
    category: "Product Guides",
    image: "/product-prayer-mat.jpg",
    date: "February 28, 2025",
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "The Benefits of Learning Arabic for Every Muslim",
    excerpt: "Why learning Arabic can transform your relationship with the Quran and deepen your spiritual connection.",
    category: "Islamic Articles",
    image: "/cat-books.jpg",
    date: "February 20, 2025",
    readTime: "7 min read",
  },
  {
    id: 6,
    title: "Top 5 Azan Clocks for Your Home in 2025",
    excerpt: "Our expert review of the best azan clocks available, comparing features, sound quality, and value.",
    category: "Product Guides",
    image: "/product-azan-clock.jpg",
    date: "February 15, 2025",
    readTime: "5 min read",
  },
];

export const services = [
  {
    id: 1,
    title: "Printing & Graphic Design",
    description: "Professional printing and design services for all your needs. From business cards to banners, we deliver quality workmanship with timely service.",
    icon: "printer",
    features: ["Document printing & photocopying", "Laminating & binding", "Graphic design services", "Business cards & flyers", "Posters & banners", "Invitations & certificates"],
  },
  {
    id: 2,
    title: "WAEC Services",
    description: "Supporting students with WAEC registration and related services. We simplify important educational processes with accurate guidance.",
    icon: "graduation-cap",
    features: ["Registration assistance", "PIN sales", "Online applications", "Result checking support"],
  },
  {
    id: 3,
    title: "Bulk Orders",
    description: "Special pricing and service for large orders. We cater to schools, mosques, and organizations with custom quotes and dedicated support.",
    icon: "package",
    features: ["Custom quotes for large orders", "School & mosque supplies", "Corporate packages", "Delivery coordination"],
  },
  {
    id: 4,
    title: "Custom Orders",
    description: "Can't find what you need? We'll source it for you. Our team specializes in finding rare and specific Islamic products.",
    icon: "search",
    features: ["Product sourcing", "Special requests", "Import assistance", "Personal shopping"],
  },
];

export const corevexServices = [
  { id: 1, title: "E-commerce Website Development", description: "Fully functional online stores with payment integration, inventory management, and customer accounts.", icon: "shopping-cart" },
  { id: 2, title: "Business & Company Websites", description: "Professional websites that establish credibility and attract customers for your business.", icon: "building" },
  { id: 3, title: "School Websites", description: "Educational platforms with student portals, course management, and communication tools.", icon: "school" },
  { id: 4, title: "Clinic & Hospital Websites", description: "Healthcare websites with appointment booking, doctor profiles, and patient resources.", icon: "stethoscope" },
  { id: 5, title: "NGO & Organizational Websites", description: "Purpose-driven websites for non-profits with donation integration and event management.", icon: "heart-handshake" },
  { id: 6, title: "Mobile Application Development", description: "Native and cross-platform mobile apps for iOS and Android devices.", icon: "smartphone" },
  { id: 7, title: "Custom Software Development", description: "Tailored software solutions designed to meet your unique business requirements.", icon: "code" },
  { id: 8, title: "Website Maintenance & Support", description: "Ongoing maintenance, updates, and technical support to keep your site running smoothly.", icon: "wrench" },
  { id: 9, title: "Digital Consulting", description: "Strategic guidance on digital transformation, online marketing, and technology adoption.", icon: "lightbulb" },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return [];
  return products.filter((p) => p.categoryId === category.id);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.toLowerCase().includes(lowerQuery) ||
      p.categoryName.toLowerCase().includes(lowerQuery)
  );
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNewArrival);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller);
}
