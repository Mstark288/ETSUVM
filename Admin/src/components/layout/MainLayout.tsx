import type { ReactNode } from 'react';
import Navbar from './Navbar';

interface MainLayoutProps {
  children: ReactNode;
  onUpload: () => void;
}

export default function MainLayout({ children, onUpload }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onUpload={onUpload} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}