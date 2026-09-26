// components/layout/Footer.tsx
import { Link } from 'react-router-dom';
import { 
  FiMapPin, 
  FiMail, 
  FiPhone, 
  FiFacebook, 
  FiTwitter, 
  FiYoutube,
  FiChevronRight
} from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Curved Transition */}
      <div className="relative bg-white">
        <svg
          className="absolute bottom-0 w-full h-16 md:h-24 text-gray-900"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 C240,100 480,100 720,80 C960,60 1200,20 1440,50 L1440,100 L0,100 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-14 h-14 rounded-lg overflow-hidden flex items-center justify-center bg-white shadow-lg">
                  <img
                    src="/icons/ets-logo.png"
                    alt="ETS Logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<span class="text-gray-900 font-serif text-2xl font-bold bg-ets-gold w-full h-full flex items-center justify-center">E</span>';
                      }
                    }}
                  />
                </div>
                <div>
                  <span className="font-serif text-xl font-semibold text-white leading-tight">ETS of UVM</span>
                  <span className="text-xs text-gray-400 block mt-0.5">Evangelical Theological Seminary</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Preparing faithful leaders for churches and communities across Africa since 2026, 
                through Union Vision Mission — serving East Africa since 2009.
              </p>
              <div className="flex space-x-3 mt-6">
                {[
                  { icon: FiFacebook, label: 'Facebook' },
                  { icon: FiTwitter, label: 'Twitter' },
                  { icon: FiYoutube, label: 'YouTube' }
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href="#"
                      className="w-10 h-10 bg-gray-800 hover:bg-ets-gold hover:text-gray-900 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'About Us', href: '/about' },
                  { name: 'Programs', href: '/programs' },
                  { name: 'Admissions', href: '/admissions' },
                  { name: 'Faculty', href: '/faculty' },
                  { name: 'News & Events', href: '/news' },
                  { name: 'Contact', href: '/contact' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="group inline-flex items-center text-sm text-gray-400 hover:text-ets-gold transition-colors"
                    >
                      <FiChevronRight className="w-3 h-3 mr-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
                Programs
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/programs/diploma-theology"
                    className="group inline-flex items-center text-sm text-gray-400 hover:text-ets-gold transition-colors"
                  >
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2" />
                    Diploma in Theology
                  </Link>
                </li>
                <li>
                  <Link
                    to="/programs/bachelor-theology"
                    className="group inline-flex items-center text-sm text-gray-400 hover:text-ets-gold transition-colors"
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                    Bachelor of Theology
                    <span className="ml-2 text-[10px] text-yellow-500 font-medium">Soon</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/programs/masters-divinity"
                    className="group inline-flex items-center text-sm text-gray-400 hover:text-ets-gold transition-colors"
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                    Master of Divinity
                    <span className="ml-2 text-[10px] text-yellow-500 font-medium">Soon</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
                Contact
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <FiMapPin className="w-4 h-4 mt-0.5 text-ets-gold flex-shrink-0" />
                  <span className="text-sm text-gray-400">Kampala, Uganda</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FiMail className="w-4 h-4 mt-0.5 text-ets-gold flex-shrink-0" />
                  <div className="space-y-1">
                    <a href="mailto:info@etsuvm.org" className="block text-sm text-gray-400 hover:text-ets-gold transition-colors">
                      info@etsuvm.org
                    </a>
                    <a href="mailto:etsuvmadmin@gmail.com" className="block text-sm text-gray-400 hover:text-ets-gold transition-colors">
                      etsuvmadmin@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <FiPhone className="w-4 h-4 text-ets-gold flex-shrink-0" />
                  <a href="tel:+256XXXXXXXXX" className="text-sm text-gray-400 hover:text-ets-gold transition-colors">
                    +256 XXX XXX XXX
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-xs text-gray-500">
                © {currentYear} ETS — Evangelical Theological Seminary of Union Vision Mission. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-xs text-gray-500">
                <a href="#" className="hover:text-ets-gold transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-ets-gold transition-colors">Terms of Use</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}