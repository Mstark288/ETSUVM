// components/layout/Navbar.tsx
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiArrowRight } from 'react-icons/fi';

// Type definitions
interface DropdownItem {
  name: string;
  href: string;
  description: string;
  available: boolean;
}

interface NavigationItem {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
}

// Navigation structure
const navigation: NavigationItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { 
    name: 'Programs', 
    href: '/programs',
    dropdown: [
      { 
        name: 'Diploma in Theology', 
        href: '/programs/diploma-theology', 
        description: '2-year foundational program',
        available: true 
      },
      { 
        name: 'Bachelor of Theology', 
        href: '/programs/bachelor-theology', 
        description: '4-year comprehensive degree',
        available: false 
      },
      { 
        name: 'Master of Divinity', 
        href: '/programs/masters-divinity', 
        description: 'Advanced theological training',
        available: false 
      },
    ]
  },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Faculty', href: '/faculty' },
  { name: 'News', href: '/news' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Handle dropdown with delay for better UX
  const handleMouseEnter = (name: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg shadow-gray-200/50' 
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg overflow-hidden flex items-center justify-center bg-white border border-gray-100 shadow-sm">
              <img
                src="/icons/ets-logo.png"
                alt="ETS Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<span class="text-white font-serif text-2xl font-bold bg-ets-navy w-full h-full flex items-center justify-center">E</span>';
                  }
                }}
              />
            </div>
            <div className="leading-tight">
              <span className="font-serif text-xl lg:text-2xl font-bold text-ets-navy tracking-tight">
                ETS of UVM
              </span>
              <span className="hidden sm:block text-[10px] lg:text-[11px] text-gray-500 font-medium tracking-wide">
                Evangelical Theological Seminary
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                      ? 'text-ets-navy bg-gray-100'
                      : 'text-gray-600 hover:text-ets-navy hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                  {item.dropdown && (
                    <FiChevronDown 
                      className={`ml-1.5 w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180 text-ets-gold' : ''
                      }`} 
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full left-0 w-80 pt-3"
                    >
                      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                        <div className="p-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={`group flex items-start justify-between p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 ${
                                subItem.available ? '' : 'opacity-60'
                              }`}
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-ets-navy group-hover:text-ets-gold transition-colors">
                                    {subItem.name}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{subItem.description}</p>
                              </div>
                              {subItem.available ? (
                                <FiArrowRight className="w-4 h-4 text-gray-400 group-hover:text-ets-gold transition-colors mt-1" />
                              ) : (
                                <span className="text-[10px] font-medium bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full whitespace-nowrap mt-1">
                                  Coming Soon
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Apply Now CTA */}
          <div className="hidden lg:block ml-4">
            <Link
              to="/admissions"
              className="group relative inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white bg-ets-navy rounded-full overflow-hidden transition-all duration-300 hover:bg-ets-navy/90 hover:shadow-lg hover:shadow-ets-navy/20"
            >
              <span className="relative z-10">Apply Now</span>
              <FiArrowRight className="relative z-10 ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span className="absolute inset-0 bg-ets-gold transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-ets-navy rounded-full hover:bg-gray-50 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-t border-gray-100 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={`block px-4 py-3 text-base font-medium rounded-full transition-colors ${
                      location.pathname === item.href
                        ? 'text-ets-navy bg-gray-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                  
                  {item.dropdown && (
                    <div className="ml-4 mt-1 border-l-2 border-gray-100 pl-3 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className={`block px-3 py-2.5 text-sm rounded-full transition-colors ${
                            subItem.available 
                              ? 'text-gray-600 hover:bg-gray-50' 
                              : 'text-gray-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{subItem.name}</span>
                            {!subItem.available && (
                              <span className="text-[10px] font-medium bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full">
                                Soon
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-3 mt-2 border-t border-gray-100">
                <Link
                  to="/admissions"
                  className="flex items-center justify-center px-4 py-3.5 text-base font-semibold text-white bg-ets-navy rounded-full hover:bg-ets-navy/90 transition-colors"
                >
                  Apply Now
                  <FiArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}