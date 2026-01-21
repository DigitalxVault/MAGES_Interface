'use client';

import { cn } from '@/lib/utils';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface RivetButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-metal-mid hover:bg-metal-light',
    'active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.4)]',
    'shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(241,232,217,0.15)]',
  ].join(' '),
  secondary: [
    'bg-panel-tint hover:bg-metal-mid',
    'active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.4)]',
    'shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(241,232,217,0.15)]',
  ].join(' '),
  danger: [
    'bg-danger-red hover:bg-[#D03818]',
    'active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.5)]',
    'shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(241,232,217,0.15)]',
  ].join(' '),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'min-h-[48px] px-4 text-sm',
  md: 'min-h-[56px] px-6 text-base',
  lg: 'min-h-[64px] px-8 text-lg',
};

const RivetButton = forwardRef<HTMLButtonElement, RivetButtonProps>(
  (
    { children, className, variant = 'primary', size = 'md', ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'rounded-button font-button uppercase tracking-wider',
          'text-text-primary transition-all duration-150',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          '[text-shadow:0_1px_0_rgba(255,255,255,0.12),0_-1px_0_rgba(0,0,0,0.55)]',
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

RivetButton.displayName = 'RivetButton';

export { RivetButton };
