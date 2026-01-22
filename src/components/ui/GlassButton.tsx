'use client';

import { cn } from '@/lib/utils';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-gradient-to-br from-[#3BC9DB] to-[#38D9A9]',
    'text-white font-semibold',
    'shadow-[0_4px_15px_rgba(56,217,169,0.4)]',
    'hover:from-[#4DD4E5] hover:to-[#4EEAB8]',
    'hover:shadow-[0_6px_20px_rgba(56,217,169,0.5)]',
    'hover:-translate-y-0.5',
    'active:shadow-[0_2px_8px_rgba(56,217,169,0.3)]',
    'active:translate-y-0',
  ].join(' '),
  secondary: [
    'bg-[rgba(255,255,255,0.7)]',
    'backdrop-blur-[10px]',
    'border-2 border-[rgba(59,201,219,0.4)]',
    'text-text-secondary font-medium',
    'hover:bg-[rgba(255,255,255,0.85)]',
    'hover:border-[rgba(59,201,219,0.6)]',
    'hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]',
    'active:bg-[rgba(255,255,255,0.6)]',
  ].join(' '),
  danger: [
    'bg-gradient-to-br from-[#FF8A80] to-[#FF6B6B]',
    'text-white font-semibold',
    'shadow-[0_4px_15px_rgba(255,107,107,0.4)]',
    'hover:shadow-[0_6px_20px_rgba(255,107,107,0.5)]',
    'hover:-translate-y-0.5',
    'active:shadow-[0_2px_8px_rgba(255,107,107,0.3)]',
    'active:translate-y-0',
  ].join(' '),
  ghost: [
    'bg-transparent',
    'text-text-secondary font-medium',
    'hover:bg-[rgba(255,255,255,0.4)]',
    'active:bg-[rgba(255,255,255,0.2)]',
  ].join(' '),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-base',
  lg: 'h-[52px] px-8 text-lg',
};

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    { children, className, variant = 'primary', size = 'md', ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'rounded-full',
          'transition-all duration-200 ease-out',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'disabled:hover:translate-y-0 disabled:hover:shadow-none',
          'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(59,201,219,0.3)]',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GlassButton.displayName = 'GlassButton';

export { GlassButton };
