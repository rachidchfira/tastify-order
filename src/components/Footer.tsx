
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-4 text-brand-yellow">TastyBowl</h2>
            <p className="mb-4 text-gray-300">
              Authentic Vietnamese cuisine with a modern twist. Order online for delivery or pickup in Ho Chi Minh City.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-brand-yellow transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-brand-yellow transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-brand-yellow transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-brand-orange">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-brand-yellow transition-colors">Home</Link></li>
              <li><Link to="/menu" className="text-gray-300 hover:text-brand-yellow transition-colors">Menu</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-brand-yellow transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-brand-yellow transition-colors">Contact</Link></li>
              <li><Link to="/order" className="text-gray-300 hover:text-brand-yellow transition-colors">Order Online</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-brand-orange">Opening Hours</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>10:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>11:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>12:00 - 22:00</span>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-brand-orange">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-brand-yellow shrink-0 mt-1" />
                <span>123 Nguyen Hue Boulevard, District 1, Ho Chi Minh City, Vietnam</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-brand-yellow" />
                <span>+84 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-brand-yellow" />
                <span>info@tastybowl.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} TastyBowl. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
