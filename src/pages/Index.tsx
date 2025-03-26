import { Link } from 'react-router-dom';
import { 
  PencilLine, 
  TestTube, 
  BarChart, 
  Database, 
  BrainCircuit, 
  ArrowRight, 
  CheckCircle, 
  BarChart3,
  Target,
  Lightbulb,
  Gauge,
  Users2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import TestDesignCard from '@/components/TestDesignCard';
import GlassMorphicCard from '@/components/GlassMorphicCard';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow overflow-hidden">
        <HeroSection />
        
        {/* Key Components Section */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
                Our Platform
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Powerful Components for Hypothesis Testing
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                An integrated system that transforms how businesses validate ideas
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                title="Hypothesis Formation Engine"
                description="Transform fuzzy ideas into properly structured, testable hypotheses with clear variables and measurable outcomes."
                icon={<PencilLine className="h-6 w-6" />}
                delay={100}
              />
              
              <FeatureCard 
                title="Test Design Laboratory"
                description="Create efficient, valid test methodologies based on your hypothesis with sample size calculations and bias detection."
                icon={<TestTube className="h-6 w-6" />}
                delay={200}
              />
              
              <FeatureCard 
                title="Data Collection Accelerator"
                description="Rapidly gather relevant, high-quality data through automated connectors and adaptive collection logic."
                icon={<Database className="h-6 w-6" />}
                delay={300}
              />
              
              <FeatureCard 
                title="Analysis & Interpretation Suite"
                description="Objectively analyze results with advanced statistical methods and beautiful visualizations."
                icon={<BarChart className="h-6 w-6" />}
                delay={400}
              />
              
              <FeatureCard 
                title="Decision Guidance System"
                description="Translate results into clear business decisions with risk quantification and action recommendations."
                icon={<BrainCircuit className="h-6 w-6" />}
                delay={500}
              />
              
              <div className="flex items-center justify-center">
                <GlassMorphicCard className="p-8 text-center h-full flex flex-col justify-center items-center animate-fade-in" hoverEffect={false}>
                  <p className="text-muted-foreground mb-6">Ready to accelerate your business decision-making?</p>
                  <Button 
                    asChild
                    className="rounded-full group"
                  >
                    <Link to="/dashboard">
                      <span>Get Started</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </GlassMorphicCard>
              </div>
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-20 bg-primary/5 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                A Streamlined Process
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From vague idea to actionable insight in four simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="glass-card rounded-2xl p-8 text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
                <div className="bg-primary/10 text-primary h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Form Hypothesis</h3>
                <p className="text-sm text-muted-foreground">
                  Translate your business idea into a properly structured, testable hypothesis
                </p>
              </div>
              
              <div className="glass-card rounded-2xl p-8 text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="bg-primary/10 text-primary h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TestTube className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Design Test</h3>
                <p className="text-sm text-muted-foreground">
                  Create a scientifically rigorous test methodology to validate your hypothesis
                </p>
              </div>
              
              <div className="glass-card rounded-2xl p-8 text-center animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="bg-primary/10 text-primary h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Collect Data</h3>
                <p className="text-sm text-muted-foreground">
                  Gather relevant, high-quality data through automated collection methods
                </p>
              </div>
              
              <div className="glass-card rounded-2xl p-8 text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
                <div className="bg-primary/10 text-primary h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Get Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Receive objective analysis and clear recommendations for business decisions
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Test Methods Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
                Test Design
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Choose The Right Testing Method
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Validly recommends the optimal testing approach based on your hypothesis
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestDesignCard
                title="A/B Testing"
                description="Compare two versions to determine which performs better against your success metrics."
                features={[
                  "Split audience randomly",
                  "Statistical validity analysis",
                  "Real-time results dashboard",
                  "Segment analysis",
                ]}
                icon={<Target className="h-6 w-6" />}
                delay={100}
              />
              
              <TestDesignCard
                title="Cohort Analysis"
                description="Track behavior of specific user groups over time to identify patterns and trends."
                features={[
                  "Custom cohort definitions",
                  "Retention visualization",
                  "Conversion path tracking",
                  "Comparative analysis",
                ]}
                icon={<Users2 className="h-6 w-6" />}
                isPopular={true}
                delay={200}
              />
              
              <TestDesignCard
                title="Multivariate Testing"
                description="Test multiple variables simultaneously to identify optimal combinations."
                features={[
                  "Complex interaction analysis",
                  "Fractional factorial design",
                  "Efficiency optimization",
                  "Full statistical rigor",
                ]}
                icon={<BarChart3 className="h-6 w-6" />}
                delay={300}
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary/5">
          <div className="container mx-auto max-w-4xl">
            <div className="glass-card rounded-2xl overflow-hidden animate-fade-in">
              <div className="p-8 md:p-12">
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                    Ready to test your business hypotheses?
                  </h2>
                  
                  <p className="text-muted-foreground text-lg mb-8">
                    Start turning your business ideas into validated strategies today
                  </p>
                  
                  <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row items-center justify-center">
                    <Button 
                      asChild 
                      size="lg" 
                      className="rounded-full px-8 w-full sm:w-auto"
                    >
                      <Link to="/hypothesis-builder">
                        Start Building Hypotheses
                      </Link>
                    </Button>
                    
                    <Button 
                      asChild 
                      variant="outline" 
                      size="lg" 
                      className="rounded-full px-8 w-full sm:w-auto"
                    >
                      <Link to="/dashboard">
                        View Dashboard
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <svg 
                viewBox="0 0 24 24" 
                className="w-6 h-6 text-primary mr-2"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M20 7L12 3L4 7M20 7V17L12 21M20 7L12 11M12 21L4 17V7M12 21V11M4 7L12 11" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-display font-semibold">Validly</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © 2023 Validly. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
