import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="modern-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-column">
            <div className="footer-logo">
              <div className="footer-logo-icon">
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
              <span className="footer-logo-text">ShopElegant</span>
            </div>
            <p className="footer-description">
              Your trusted destination for premium quality products. We bring
              elegance and style to your everyday shopping experience.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook" className="footer-social-link">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="footer-social-link">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="footer-social-link">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Youtube" className="footer-social-link">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="/products">All Products</a>
              </li>
              <li>
                <a href="/categories">Categories</a>
              </li>
              <li>
                <a href="/deals">Special Deals</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/faq">FAQs</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Customer Support</h3>
            <ul className="footer-contact">
              <li>
                <Phone size={18} />
                <div>
                  <strong>Hotline</strong>
                  <span>1800-888-999</span>
                </div>
              </li>
              <li>
                <Mail size={18} />
                <div>
                  <strong>Email</strong>
                  <span>support@shopelegant.com</span>
                </div>
              </li>
              <li>
                <MapPin size={18} />
                <div>
                  <strong>Address</strong>
                  <span>123 Commerce Street, District 1</span>
                </div>
              </li>
            </ul>
            <div className="footer-hours">
              <strong>Working Hours:</strong>
              <p>Mon - Fri: 8:00 AM - 9:00 PM</p>
              <p>Sat - Sun: 9:00 AM - 6:00 PM</p>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Information</h3>
            <ul className="footer-links">
              <li>
                <a href="/shipping">Shipping Policy</a>
              </li>
              <li>
                <a href="/returns">Return & Exchange</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
              <li>
                <a href="/payment">Payment Methods</a>
              </li>
            </ul>
            <div className="footer-newsletter">
              <h4>Newsletter</h4>
              <p>Subscribe for exclusive offers</p>
              <div className="footer-newsletter-form">
                <input type="email" placeholder="Your email" />
                <button type="button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-copyright">
            <p>&copy; 2025 ShopElegant. All rights reserved.</p>
            <div className="footer-payment">
              <span>We accept:</span>
              <div className="footer-payment-icons">
                <span>💳</span>
                <span>🏦</span>
                <span>📱</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
