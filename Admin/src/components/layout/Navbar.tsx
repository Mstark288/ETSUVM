// src/components/layout/Navbar.tsx
import { auth } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { FiLogOut, FiUpload } from 'react-icons/fi';

interface NavbarProps {
  onUpload: () => void;
}

export default function Navbar({ onUpload }: NavbarProps) {
  const { user, isAdmin } = useAuth();

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            {/* ETS Logo */}
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-white border border-gray-200">
              <img
                src="/icons/ets-logo.png"
                alt="ETSUVM Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback to letter E if logo not found
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<span class="text-white font-serif text-lg font-bold bg-ets-navy w-full h-full flex items-center justify-center">E</span>';
                  }
                }}
              />
            </div>
            <div>
              <span className="font-serif font-semibold text-gray-900">ETS Staff Portal</span>
              <span className="text-xs text-gray-500 block -mt-0.5">{user?.email}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isAdmin && (
              <button
                onClick={onUpload}
                className="inline-flex items-center px-4 py-2 bg-ets-navy text-white rounded-lg hover:bg-ets-navy/90 transition-colors text-sm font-medium"
              >
                <FiUpload className="mr-2 w-4 h-4" />
                Upload
              </button>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              <FiLogOut className="mr-2 w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}