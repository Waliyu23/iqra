import { useState } from "react";
import {
  MapPin, Phone, Mail, Clock, Instagram, Facebook, MessageCircle,
  Send, CheckCircle
} from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "General",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", subject: "General", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-['DM_Sans'] font-bold text-[clamp(2rem,4vw,3rem)] text-[#111] mb-2">
            Contact Us
          </h1>
          <p className="text-sm text-[#666]">
            We&apos;d love to hear from you. Reach out anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-3 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-[#e5e5e5] p-5">
                <div className="w-10 h-10 rounded-lg bg-[rgba(26,158,127,0.1)] flex items-center justify-center mb-3">
                  <MapPin size={18} className="text-[#1a9e7f]" />
                </div>
                <h3 className="font-['DM_Sans'] font-semibold text-sm text-[#111] mb-1">Address</h3>
                <p className="text-sm text-[#666]">Kumasi, Aboabo Post Office, Airport Road - Ghana</p>
              </div>

              <div className="bg-white rounded-xl border border-[#e5e5e5] p-5">
                <div className="w-10 h-10 rounded-lg bg-[rgba(26,158,127,0.1)] flex items-center justify-center mb-3">
                  <Phone size={18} className="text-[#1a9e7f]" />
                </div>
                <h3 className="font-['DM_Sans'] font-semibold text-sm text-[#111] mb-1">Phone</h3>
                <p className="text-sm text-[#666]">+233 556 600 270</p>
                <a
                  href="https://wa.me/233556600270"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#1a9e7f] font-medium mt-1 hover:underline"
                >
                  <MessageCircle size={12} /> WhatsApp
                </a>
              </div>

              <div className="bg-white rounded-xl border border-[#e5e5e5] p-5">
                <div className="w-10 h-10 rounded-lg bg-[rgba(26,158,127,0.1)] flex items-center justify-center mb-3">
                  <Mail size={18} className="text-[#1a9e7f]" />
                </div>
                <h3 className="font-['DM_Sans'] font-semibold text-sm text-[#111] mb-1">Email</h3>
                <p className="text-sm text-[#666]">info@iqrabookshop.com</p>
              </div>

              <div className="bg-white rounded-xl border border-[#e5e5e5] p-5">
                <div className="w-10 h-10 rounded-lg bg-[rgba(26,158,127,0.1)] flex items-center justify-center mb-3">
                  <Clock size={18} className="text-[#1a9e7f]" />
                </div>
                <h3 className="font-['DM_Sans'] font-semibold text-sm text-[#111] mb-1">Hours</h3>
                <p className="text-sm text-[#666]">Mon - Sat: 9AM - 8PM</p>
                <p className="text-sm text-[#666]">Sunday: 10AM - 6PM</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl border border-[#e5e5e5] p-5">
              <h3 className="font-['DM_Sans'] font-semibold text-sm text-[#111] mb-3">Follow Us</h3>
              <div className="flex items-center gap-3">
                <a href="#" className="w-10 h-10 rounded-lg bg-[#f5f5f5] flex items-center justify-center hover:bg-[#1a9e7f] hover:text-white transition-colors text-[#666]">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-[#f5f5f5] flex items-center justify-center hover:bg-[#1a9e7f] hover:text-white transition-colors text-[#666]">
                  <Facebook size={18} />
                </a>
                <a
                  href="https://wa.me/233556600270"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#f5f5f5] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors text-[#666]"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-[#f5f5f5] rounded-xl h-[250px] flex items-center justify-center border border-[#e5e5e5]">
              <div className="text-center">
                <MapPin size={36} className="text-[#1a9e7f] mx-auto mb-2" />
                <p className="text-sm text-[#666]">Google Map Integration</p>
                <p className="text-xs text-[#999]">Kumasi, Aboabo Post Office, Airport Road - Ghana</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-[#e5e5e5] p-6">
              <h2 className="font-['DM_Sans'] font-semibold text-lg text-[#111] mb-5">
                Send a Message
              </h2>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-[rgba(26,158,127,0.1)] flex items-center justify-center mb-4">
                    <CheckCircle size={28} className="text-[#1a9e7f]" />
                  </div>
                  <h3 className="font-['DM_Sans'] font-semibold text-base text-[#111] mb-2">
                    Thank You!
                  </h3>
                  <p className="text-sm text-[#666]">
                    We&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#333] mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full h-11 px-4 rounded-lg border border-[#e5e5e5] text-sm focus:outline-none focus:ring-2 focus:ring-[#1a9e7f]/30"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#333] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full h-11 px-4 rounded-lg border border-[#e5e5e5] text-sm focus:outline-none focus:ring-2 focus:ring-[#1a9e7f]/30"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#333] mb-1.5">
                      Subject
                    </label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full h-11 px-4 rounded-lg border border-[#e5e5e5] text-sm focus:outline-none focus:ring-2 focus:ring-[#1a9e7f]/30 bg-white"
                    >
                      <option>General</option>
                      <option>Order Inquiry</option>
                      <option>Product Question</option>
                      <option>Service Request</option>
                      <option>Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#333] mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[#e5e5e5] text-sm focus:outline-none focus:ring-2 focus:ring-[#1a9e7f]/30 resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 bg-[#1a9e7f] hover:bg-[#0d7d5f] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
