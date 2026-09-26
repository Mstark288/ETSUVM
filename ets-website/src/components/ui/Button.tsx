// components/ui/Button.tsx
import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ets-gold disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-ets-gold text-white hover:bg-ets-gold/90 shadow-sm',
    secondary: 'bg-ets-navy text-white hover:bg-ets-navy/90',
    outline: 'border border-ets-navy/20 text-ets-navy hover:bg-ets-navy hover:text-white',
    ghost: 'text-ets-navy hover:bg-ets-navy/5'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}