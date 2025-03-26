
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedGradient from './AnimatedGradient';

const features = [
  "Transform vague ideas into structured hypotheses",
  "Design appropriate tests in minutes",
  "Collect & analyze data efficiently",
  "Get clear, actionable guidance",
];

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatedGradient />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              Business Hypothesis Testing, Reimagined
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-balance">
            <span className="heading-gradient">Validate business ideas</span> with scientific precision
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 text-balance">
            Transform fuzzy concepts into rigorous tests and data-driven decisions in days, not months.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              asChild
              size="lg" 
              className="rounded-full font-medium text-base px-8 py-6 group transitions-all"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link to="/dashboard">
                Start Testing
                <ArrowRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="rounded-full font-medium text-base px-8 py-6 border-2"
            >
              <Link to="/hypothesis-builder">
                Build Hypothesis
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center animate-fade-in"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span className="text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Abstract shape at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
