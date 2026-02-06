import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, hoverEffect = true }) => {
  return (
    <div className={cn(
      "glass-card rounded-[24px] p-6",
      hoverEffect && "hover:scale-[1.02] hover:shadow-xl transition-all duration-300",
      className
    )}>
      {children}
    </div>
  );
};
