'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const neoGlassButtonVariants = cva(
  'neo-glass-button relative isolate cursor-pointer rounded-full transition-all',
  {
    variants: {
      variant: {
        default: '',
        primary: 'neo-glass-button-primary',
        danger: 'neo-glass-button-danger',
      },
      size: {
        default: '',
        sm: '',
        lg: '',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const neoGlassButtonTextVariants = cva(
  'neo-glass-button-text relative block select-none',
  {
    variants: {
      size: {
        default: 'px-6 py-3.5 text-base font-semibold',
        sm: 'px-4 py-2 text-sm font-medium',
        lg: 'px-8 py-4 text-lg font-semibold',
        icon: 'flex h-10 w-10 items-center justify-center',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface NeoGlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neoGlassButtonVariants> {
  contentClassName?: string;
}

const NeoGlassButton = React.forwardRef<HTMLButtonElement, NeoGlassButtonProps>(
  ({ className, children, variant, size, contentClassName, disabled, ...props }, ref) => {
    return (
      <div
        className={cn(
          'neo-glass-button-wrap cursor-pointer rounded-full inline-block',
          disabled && 'pointer-events-none',
          className
        )}
      >
        <button
          className={cn(neoGlassButtonVariants({ variant, size }))}
          ref={ref}
          disabled={disabled}
          {...props}
        >
          <span
            className={cn(
              neoGlassButtonTextVariants({ size }),
              contentClassName
            )}
          >
            {children}
          </span>
        </button>
        <div className="neo-glass-button-shadow rounded-full" />
      </div>
    );
  }
);

NeoGlassButton.displayName = 'NeoGlassButton';

export { NeoGlassButton, neoGlassButtonVariants };
