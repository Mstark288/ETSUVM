// components/layout/MainLayout.tsx
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import Navbar from './Navbar';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll to top immediately when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />

      {/* Back to Top Button - Visible when scrolled down */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-ets-gold text-ets-navy rounded-full shadow-2xl hover:bg-ets-navy hover:text-white transition-colors duration-300 flex items-center justify-center border-2 border-white/20"
            aria-label="Back to top"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <FiArrowUp size={24} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}