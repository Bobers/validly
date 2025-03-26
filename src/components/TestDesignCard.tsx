
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TestDesignCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  isPopular?: boolean;
  className?: string;
  delay?: number;
}

const TestDesignCard = ({ 
  title, 
  description, 
  features, 
  icon,
  isPopular = false,
  className,
  delay = 0
}: TestDesignCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "glass-card rounded-2xl overflow-hidden h-full flex flex-col animate-fade-in transition-all",
        isPopular ? "ring-2 ring-primary" : "",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isPopular && (
        <div className="bg-primary text-primary-foreground text-xs font-medium py-1.5 text-center">
          RECOMMENDED
        </div>
      )}
      
      <div className="p-8 flex-grow">
        <div className="flex justify-between items-start mb-6">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
          {!isPopular && <div className="h-7" />}
        </div>
        
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        
        <p className="text-muted-foreground mb-6 text-balance">
          {description}
        </p>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-8 pt-0">
        <Button 
          className={cn(
            "w-full rounded-xl font-medium transitions-all",
            isHovered ? "shadow-lg" : ""
          )}
        >
          Select This Test
        </Button>
      </div>
    </div>
  );
};

export default TestDesignCard;
