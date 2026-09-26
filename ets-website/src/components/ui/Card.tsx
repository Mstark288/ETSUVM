// components/ui/Card.tsx
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow ${className}`}>
      {children}
    </div>
  );
}