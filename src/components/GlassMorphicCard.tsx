
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassMorphicCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassMorphicCard = ({ 
  children, 
  className,
  hoverEffect = true
}: GlassMorphicCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-2xl",
        hoverEffect && "hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassMorphicCard;
