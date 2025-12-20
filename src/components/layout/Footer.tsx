import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <img src={logo} alt="Ink Matrix" className="h-12 mb-4 brightness-0 invert" />
            <p className="text-primary-foreground/80 text-sm mb-4">
              Premium corporate gifting solutions for businesses of all sizes. 
              Custom merchandise that makes an impression.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-navy-light rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-navy-light rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-navy-light rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-navy-light rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/bulk-orders" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Bulk Orders
                </Link>
              </li>
              <li>
                <Link to="/customization" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Customization
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/drinkware" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Drinkware
                </Link>
              </li>
              <li>
                <Link to="/category/tech-gadgets" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Tech & Gadgets
                </Link>
              </li>
              <li>
                <Link to="/category/office-essentials" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Office Essentials
                </Link>
              </li>
              <li>
                <Link to="/category/bags-travel" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Bags & Travel
                </Link>
              </li>
              <li>
                <Link to="/category/apparel" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Apparel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                <span className="text-primary-foreground/80">
                  123 Corporate Plaza, Business District, Mumbai 400001
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-accent" />
                <a href="tel:+919876543210" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-accent" />
                <a href="mailto:hello@inkmatrix.com" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  hello@inkmatrix.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-light">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>© 2024 Ink Matrix. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
              <Link to="/shipping" className="hover:text-accent transition-colors">Shipping Info</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
