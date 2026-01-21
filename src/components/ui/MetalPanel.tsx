'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type MetalPanelVariant = 'raised' | 'inset' | 'flat';

interface MetalPanelProps {
  children: ReactNode;
  className?: string;
  variant?: MetalPanelVariant;
}

const variantStyles: Record<MetalPanelVariant, string> = {
  raised: [
    'shadow-[inset_1px_1px_2px_rgba(241,232,217,0.15),inset_-1px_-1px_2px_rgba(20,22,26,0.6),0_2px_4px_rgba(0,0,0,0.3)]',
  ].join(' '),
  inset: [
    'shadow-[inset_-1px_-1px_1px_rgba(241,232,217,0.08),inset_2px_2px_4px_rgba(20,22,26,0.7)]',
  ].join(' '),
  flat: 'shadow-[0_1px_2px_rgba(0,0,0,0.2)]',
};

export function MetalPanel({
  children,
  className,
  variant = 'raised',
}: MetalPanelProps) {
  return (
    <div
      className={cn(
        'rounded-panel bg-panel-base p-4',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
