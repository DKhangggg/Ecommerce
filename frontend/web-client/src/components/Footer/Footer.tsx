import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-[#f9f3e7] to-[#f8e7c9] mt-16 rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] text-[#4b3a2b]">
      <div className="max-w-[1400px] mx-auto px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#b97b48] to-[#a06a3e] rounded-lg flex items-center justify-center text-white shadow-[0_6px_20px_rgba(185,123,72,0.3)]">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 80 80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <path d="M20 30h40l-6 16H26z" />
                  <circle cx="30" cy="60" r="4" fill="currentColor" />
                  <circle cx="54" cy="60" r="4" fill="currentColor" />
                  <path d="M40 38v-16M40 22l-5 5M40 22l5 5" strokeWidth="3.5" />
                </svg>
              </div>
              <span className="text-2xl font-bold">ShopElegant</span>
            </div>
            <p className="text-sm text-[#7b614a]">
              Your trusted destination for premium quality products. We bring
              elegance and style to your everyday shopping experience.
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-md bg-white/70 border border-[rgba(185,123,72,0.2)] flex items-center justify-center text-[#b97b48] hover:bg-[#b97b48] hover:text-white transition-transform hover:-translate-y-1"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-md bg-white/70 border border-[rgba(185,123,72,0.2)] flex items-center justify-center text-[#b97b48] hover:bg-[#b97b48] hover:text-white transition-transform hover:-translate-y-1"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-md bg-white/70 border border-[rgba(185,123,72,0.2)] flex items-center justify-center text-[#b97b48] hover:bg-[#b97b48] hover:text-white transition-transform hover:-translate-y-1"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                aria-label="Youtube"
                className="w-10 h-10 rounded-md bg-white/70 border border-[rgba(185,123,72,0.2)] flex items-center justify-center text-[#b97b48] hover:bg-[#b97b48] hover:text-white transition-transform hover:-translate-y-1"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-[#4b3a2b] pb-2">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a
                  href="/products"
                  className="text-[#7b614a] hover:text-[#b97b48]"
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="/categories"
                  className="text-[#7b614a] hover:text-[#b97b48]"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="/deals"
                  className="text-[#7b614a] hover:text-[#b97b48]"
                >
                  Special Deals
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-[#7b614a] hover:text-[#b97b48]"
                >
                  About Us
                </a>
              </li>
              <li>
                <a href="/blog" className="text-[#7b614a] hover:text-[#b97b48]">
                  Blog
                </a>
              </li>
              <li>
                <a href="/faq" className="text-[#7b614a] hover:text-[#b97b48]">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Customer Support</h3>
            <ul className="flex flex-col gap-4 text-sm text-[#7b614a]">
              <li className="flex gap-3 items-start">
                <Phone size={18} className="text-[#b97b48] mt-1" />
                <div>
                  <strong className="block text-[#4b3a2b]">Hotline</strong>
                  <span>1800-888-999</span>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <Mail size={18} className="text-[#b97b48] mt-1" />
                <div>
                  <strong className="block text-[#4b3a2b]">Email</strong>
                  <span>support@shopelegant.com</span>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin size={18} className="text-[#b97b48] mt-1" />
                <div>
                  <strong className="block text-[#4b3a2b]">Address</strong>
                  <span>123 Commerce Street, District 1</span>
                </div>
              </li>
            </ul>
            <div className="bg-white/70 p-4 rounded-lg border border-[rgba(185,123,72,0.1)]">
              <strong>Working Hours:</strong>
              <p className="text-sm">Mon - Fri: 8:00 AM - 9:00 PM</p>
              <p className="text-sm">Sat - Sun: 9:00 AM - 6:00 PM</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Information</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a
                  href="/shipping"
                  className="text-[#7b614a] hover:text-[#b97b48]"
                >
                  Shipping Policy
                </a>
              </li>
              <li>
                <a
                  href="/returns"
                  className="text-[#7b614a] hover:text-[#b97b48]"
                >
                  Return & Exchange
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-[#7b614a] hover:text-[#b97b48]"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-[#7b614a] hover:text-[#b97b48]"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/payment"
                  className="text-[#7b614a] hover:text-[#b97b48]"
                >
                  Payment Methods
                </a>
              </li>
            </ul>
            <div className="bg-white/70 p-4 rounded-lg border border-[rgba(185,123,72,0.1)]">
              <h4 className="font-semibold">Newsletter</h4>
              <p className="text-sm text-[#7b614a]">
                Subscribe for exclusive offers
              </p>
              <div className="flex gap-2 mt-3">
                <input
                  className="flex-1 px-4 py-2 border-2 border-[rgba(185,123,72,0.2)] rounded-md"
                  type="email"
                  placeholder="Your email"
                />
                <button className="px-4 py-2 bg-gradient-to-br from-[#b97b48] to-[#a06a3e] text-white rounded-md font-semibold shadow-[0_4px_12px_rgba(185,123,72,0.3)]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[rgba(0,0,0,0.03)] border-t border-[rgba(185,123,72,0.1)]">
        <div className="max-w-[1400px] mx-auto px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#7b614a]">
            &copy; 2025 ShopElegant. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#7b614a]">We accept:</span>
            <div className="flex gap-3 text-xl">
              <span>💳</span>
              <span>🏦</span>
              <span>📱</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
