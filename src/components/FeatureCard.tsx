
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  delay?: number;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  className,
  delay = 0
}: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-2xl p-8 h-full animate-fade-in",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      
      <p className="text-muted-foreground text-balance">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
