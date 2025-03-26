
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  PencilLine, 
  Flask, 
  BarChart3, 
  Target, 
  Database, 
  BrainCircuit, 
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import HypothesisForm from '@/components/HypothesisForm';
import GlassMorphicCard from '@/components/GlassMorphicCard';

const HypothesisBuilder = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <Button 
            asChild 
            variant="ghost" 
            className="mb-6"
          >
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          
          <h1 className="text-3xl font-display font-bold mb-2">Build Your Hypothesis</h1>
          <p className="text-muted-foreground">
            Transform your business idea into a properly structured, testable hypothesis
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <HypothesisForm />
          </div>
          
          <div className="space-y-6">
            <GlassMorphicCard className="p-6 animate-fade-in">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Great Hypotheses
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 text-primary h-8 w-8 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <PencilLine className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Be Specific</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Use precise language and define clear variables
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 text-primary h-8 w-8 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <Target className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Ensure Measurability</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Define outcomes that can be quantitatively measured
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 text-primary h-8 w-8 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <Flask className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Think About Testing</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Consider how you'll test the hypothesis from the start
                    </p>
                  </div>
                </div>
              </div>
            </GlassMorphicCard>
            
            <GlassMorphicCard className="p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <h3 className="text-lg font-semibold mb-4">
                The Hypothesis Testing Process
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 text-primary h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-sm">Form Hypothesis</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Structure your business assumption
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 text-primary h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-sm">Design Test</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Create efficient validation methods
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 text-primary h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-sm">Collect Data</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Gather relevant information
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 text-primary h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-sm">Analyze Results</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Draw objective conclusions
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 text-primary h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    5
                  </div>
                  <div>
                    <p className="font-medium text-sm">Make Decisions</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Take action based on findings
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="sm"
                >
                  Learn More About The Process
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </GlassMorphicCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HypothesisBuilder;
