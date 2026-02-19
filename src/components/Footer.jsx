import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-pink-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-900 rounded-lg flex items-center justify-center font-bold">
                V
              </div>
              <span className="text-lg sm:text-xl font-bold">Velora</span>
            </div>
            <p className="text-pink-200 text-sm sm:text-base">Connecting renters and homeowners across the region.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-200">
              <li><a href="/rentals" className="hover:text-white transition-colors text-sm sm:text-base">Browse Rentals</a></li>
              <li><a href="/renters" className="hover:text-white transition-colors text-sm sm:text-base">Renters</a></li>
              <li><a href="/about" className="hover:text-white transition-colors text-sm sm:text-base">About Us</a></li>
              <li><a href="/faq" className="hover:text-white transition-colors text-sm sm:text-base">FAQ</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Support</h3>
            <ul className="space-y-2 text-pink-200">
              <li><a href="/help" className="hover:text-white transition-colors text-sm sm:text-base">Help Center</a></li>
              <li><a href="/report-abuse" className="hover:text-white transition-colors text-sm sm:text-base">Report Abuse</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors text-sm sm:text-base">Contact Us</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors text-sm sm:text-base">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-pink-200">
                <Phone size={16} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">+9190-XXXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-2 text-pink-200">
                <Mail size={16} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">info@Velora.com</span>
              </div>
              <div className="flex items-center space-x-2 text-pink-200">
                <MapPin size={16} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-pink-700 pt-6 sm:pt-8">
          <div className="flex justify-center space-x-4 sm:space-x-6">
            <a href="#" className="text-pink-200 hover:text-white transition-colors">
              <Facebook size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="#" className="text-pink-200 hover:text-white transition-colors">
              <Twitter size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="#" className="text-pink-200 hover:text-white transition-colors">
              <Linkedin size={20} className="sm:w-6 sm:h-6" />
            </a>
          </div>
          <p className="text-center text-pink-200 text-xs sm:text-sm mt-4">
            © 2024 Velora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
