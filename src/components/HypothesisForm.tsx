
import { useState } from 'react';
import { 
  PencilLine, 
  ChevronRight, 
  Target, 
  Users, 
  Calendar, 
  Gauge, 
  BarChart3, 
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";

const HypothesisForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessIdea: '',
    targetAudience: '',
    expectedOutcome: '',
    timeframe: '30',
    measurementMethod: '',
    successCriteria: '',
  });
  
  const [generatedHypothesis, setGeneratedHypothesis] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleGenerate = () => {
    // In a real application, this would call an API to generate the hypothesis
    const hypothesis = `If we offer ${formData.businessIdea} to ${formData.targetAudience}, then we will see ${formData.expectedOutcome} within ${formData.timeframe} days, which we will measure using ${formData.measurementMethod} with a success threshold of ${formData.successCriteria}.`;
    
    setGeneratedHypothesis(hypothesis);
    
    toast({
      title: "Hypothesis Generated",
      description: "Your hypothesis has been successfully created.",
    });
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PencilLine className="mr-2 h-5 w-5 text-primary" />
                Define Your Idea
              </CardTitle>
              <CardDescription>
                Start by describing your business idea or assumption you want to test
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  What is your business idea or assumption?
                </label>
                <Textarea
                  name="businessIdea"
                  value={formData.businessIdea}
                  onChange={handleInputChange}
                  placeholder="e.g., Adding a recommendation feature will increase user engagement"
                  className="resize-none h-24"
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Who is your target audience?
                </label>
                <Textarea
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  placeholder="e.g., Mobile app users aged 25-34 who have made at least 3 purchases"
                  className="resize-none h-24"
                />
              </div>
            </CardContent>
          </>
        );
      
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5 text-primary" />
                Define Expected Outcomes
              </CardTitle>
              <CardDescription>
                Specify what results you expect to see and how you'll measure them
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  What outcome do you expect to see?
                </label>
                <Textarea
                  name="expectedOutcome"
                  value={formData.expectedOutcome}
                  onChange={handleInputChange}
                  placeholder="e.g., A 15% increase in daily active users"
                  className="resize-none h-24"
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Timeframe for results (days)
                </label>
                <Select 
                  value={formData.timeframe} 
                  onValueChange={(value) => handleSelectChange('timeframe', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </>
        );
      
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gauge className="mr-2 h-5 w-5 text-primary" />
                Define Measurement Criteria
              </CardTitle>
              <CardDescription>
                Specify how you'll measure success and what constitutes a successful test
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  How will you measure results?
                </label>
                <Textarea
                  name="measurementMethod"
                  value={formData.measurementMethod}
                  onChange={handleInputChange}
                  placeholder="e.g., Google Analytics event tracking of feature usage"
                  className="resize-none h-24"
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Success criteria
                </label>
                <Textarea
                  name="successCriteria"
                  value={formData.successCriteria}
                  onChange={handleInputChange}
                  placeholder="e.g., At least 20% of users engage with the feature within the first week"
                  className="resize-none h-24"
                />
              </div>
              
              {generatedHypothesis && (
                <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20 animate-fade-in">
                  <h4 className="font-medium text-sm mb-2 flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    Generated Hypothesis
                  </h4>
                  <p className="text-sm">
                    {generatedHypothesis}
                  </p>
                </div>
              )}
            </CardContent>
          </>
        );
        
      default:
        return null;
    }
  };
  
  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return formData.businessIdea.trim() !== '' && formData.targetAudience.trim() !== '';
      case 2:
        return formData.expectedOutcome.trim() !== '' && formData.timeframe !== '';
      case 3:
        return formData.measurementMethod.trim() !== '' && formData.successCriteria.trim() !== '';
      default:
        return false;
    }
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto animate-scale-in shadow-soft border">
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex space-x-4">
          <div 
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            1
          </div>
          <div 
            className={`h-0.5 w-8 ${
              currentStep >= 2 ? 'bg-primary' : 'bg-muted'
            }`}
          />
          <div 
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            2
          </div>
          <div 
            className={`h-0.5 w-8 ${
              currentStep >= 3 ? 'bg-primary' : 'bg-muted'
            }`}
          />
          <div 
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            3
          </div>
        </div>
        
        <div className="text-sm font-medium text-muted-foreground">
          Step {currentStep} of 3
        </div>
      </div>
      
      {renderStepContent()}
      
      <CardFooter className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          Back
        </Button>
        
        {currentStep < 3 ? (
          <Button
            onClick={handleNext}
            disabled={!isStepComplete()}
            className="space-x-2"
          >
            <span>Continue</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleGenerate}
            disabled={!isStepComplete()}
          >
            Generate Hypothesis
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default HypothesisForm;
