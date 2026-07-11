import { CheckCircle, Target, Users, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Hero */}
        <div className="bg-[#f5f5f5] rounded-2xl p-8 md:p-16 text-center mb-16">
          <h1 className="font-['DM_Sans'] font-bold text-[clamp(2rem,4vw,3rem)] text-[#111] mb-4">
            About Iqra Bookshop
          </h1>
          <p className="text-base text-[#666] max-w-2xl mx-auto leading-relaxed">
            Your trusted destination for authentic Islamic books, educational resources, electronics, home decor, gifts, and professional services. Serving the community with integrity since 2015.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="font-['DM_Sans'] font-bold text-2xl text-[#111] mb-4">
              Our Story
            </h2>
            <p className="text-sm text-[#333] leading-relaxed mb-4">
              Iqra Bookshop was founded in 2015 with a simple mission: to make authentic Islamic knowledge and quality products accessible to everyone. What started as a small bookstore has grown into a comprehensive Islamic lifestyle centre serving individuals, families, schools, mosques, and organizations across the country.
            </p>
            <p className="text-sm text-[#333] leading-relaxed mb-4">
              Over the years, we have expanded our offerings to include Islamic electronics, children&apos;s learning products, home decor, and thoughtful gifts. We have also built professional service divisions including printing, graphic design, WAEC services, and through Corevex Tech Solutions, modern digital solutions for businesses.
            </p>
            <p className="text-sm text-[#333] leading-relaxed">
              Today, Iqra Bookshop stands as a trusted name in the community, known for our commitment to authenticity, quality, and excellent customer service. We continue to grow while staying true to our founding principles.
            </p>
          </div>
          <div>
            <img
              src="/about-interior.jpg"
              alt="Iqra Bookshop Interior"
              className="rounded-2xl shadow-lg w-full h-[300px] md:h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Mission */}
        <div className="bg-[rgba(26,158,127,0.05)] rounded-2xl p-8 md:p-12 text-center mb-16">
          <Target size={36} className="text-[#1a9e7f] mx-auto mb-4" />
          <h2 className="font-['DM_Sans'] font-semibold text-xl md:text-2xl text-[#111] max-w-3xl mx-auto leading-relaxed">
            Our mission is to make authentic Islamic knowledge, quality products, essential community services, and innovative technology solutions accessible to everyone.
          </h2>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="font-['DM_Sans'] font-bold text-2xl text-[#111] text-center mb-8">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: CheckCircle,
                title: "Authenticity",
                description: "Every product we sell is verified for authenticity. We work directly with reputable publishers and manufacturers to ensure our customers receive genuine, high-quality items.",
              },
              {
                icon: Award,
                title: "Quality",
                description: "We never compromise on quality. From the books on our shelves to the services we provide, excellence is our standard. We carefully vet every product before it reaches our customers.",
              },
              {
                icon: Users,
                title: "Community",
                description: "We serve our community with integrity and care. Whether you are a student, scholar, family, or organization, we are here to support your journey with personalized service.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-xl border border-[#e5e5e5] p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-[rgba(26,158,127,0.1)] flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-[#1a9e7f]" />
                </div>
                <h3 className="font-['DM_Sans'] font-semibold text-lg text-[#111] mb-2">
                  {title}
                </h3>
                <p className="text-sm text-[#666] leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Who We Serve */}
        <div className="mb-16">
          <h2 className="font-['DM_Sans'] font-bold text-2xl text-[#111] text-center mb-8">
            Who We Serve
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Individuals", "Families", "Students", "Teachers", "Scholars",
              "Mosques", "Schools", "Organizations", "Businesses", "Government", "NGOs",
            ].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-[#f5f5f5] rounded-full text-sm text-[#333] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Founder */}
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src="/founder-photo.jpg"
              alt="Founder"
              className="w-40 h-52 md:w-48 md:h-60 object-cover rounded-xl shadow-lg flex-shrink-0"
            />
            <div className="text-center md:text-left">
              <h3 className="font-['DM_Sans'] font-bold text-xl text-[#111] mb-1">
                Abdulrahman Ibrahim
              </h3>
              <p className="text-sm text-[#1a9e7f] font-medium mb-4">
                Founder & CEO
              </p>
              <p className="text-sm text-[#666] leading-relaxed max-w-lg">
                With over 15 years of experience in Islamic retail and community service, Abdulrahman founded Iqra Bookshop with a vision to create a one-stop centre for authentic Islamic resources. His passion for education and community development drives everything we do.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
