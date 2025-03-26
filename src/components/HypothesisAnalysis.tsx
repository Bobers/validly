
import { useState } from 'react';
import { 
  Brain, 
  Lightbulb, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Beaker,
  Gauge,
  Microscope,
  ArrowRightLeft,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { hypothesesService } from '@/services/supabase';
import { Hypothesis } from '@/types/supabase';

interface HypothesisAnalysisProps {
  hypothesis: Hypothesis;
  onAnalysisComplete?: (analysis: any) => void;
}

interface AnalysisResult {
  quality_assessment: string;
  falsifiability_score?: number;
  clarity_score?: number;
  specificity_score?: number;
  testing_procedure: {
    steps: string[];
    timeline?: string;
  };
  confounding_variables: string[];
  evaluation_methods: string[];
  confidence_score: number;
  recommendations?: string[];
}

const HypothesisAnalysis = ({ hypothesis, onAnalysisComplete }: HypothesisAnalysisProps) => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = await hypothesesService.analyzeWithAI(hypothesis);
      setAnalysis(result.analysis);
      
      toast({
        title: "Analysis Complete",
        description: "Your hypothesis has been analyzed using the POPPER methodology.",
      });
      
      if (onAnalysisComplete) {
        onAnalysisComplete(result.analysis);
      }
    } catch (err) {
      console.error('Analysis failed:', err);
      setError('Failed to analyze hypothesis. Please try again.');
      
      toast({
        title: "Analysis Failed",
        description: "There was a problem analyzing your hypothesis.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const getConfidenceColor = (score: number) => {
    if (score >= 70) return "text-green-500";
    if (score >= 40) return "text-amber-500";
    return "text-red-500";
  };
  
  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-6">
      {!analysis && !isAnalyzing && (
        <Card className="border-dashed border-2 bg-background/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5 text-primary" />
              AI Hypothesis Analysis
            </CardTitle>
            <CardDescription>
              Analyze your hypothesis using AI and the POPPER methodology to improve its quality and testing approach
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-6">
            <div className="mx-auto mb-4 bg-primary/10 text-primary h-16 w-16 rounded-full flex items-center justify-center">
              <Lightbulb className="h-8 w-8" />
            </div>
            <p className="text-muted-foreground mb-6">
              Get insights on hypothesis quality, testing procedures, and potential issues
            </p>
            <Button onClick={handleAnalyze}>
              <Brain className="mr-2 h-4 w-4" />
              Analyze Hypothesis
            </Button>
          </CardContent>
        </Card>
      )}
      
      {isAnalyzing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Loader2 className="mr-2 h-5 w-5 text-primary animate-spin" />
              Analyzing Your Hypothesis
            </CardTitle>
            <CardDescription>
              The AI is reviewing your hypothesis using the POPPER methodology
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 py-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Processing...</span>
              <span className="text-sm font-medium">Please wait</span>
            </div>
            <Progress value={65} className="h-2" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </Card>
      )}
      
      {analysis && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-primary" />
                    Hypothesis Analysis Results
                  </CardTitle>
                  <CardDescription>
                    Powered by the POPPER methodology
                  </CardDescription>
                </div>
                <Badge className={`text-xl font-bold ${getConfidenceColor(analysis.confidence_score)}`}>
                  {analysis.confidence_score}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-md font-medium mb-2 flex items-center">
                  <Gauge className="mr-2 h-4 w-4 text-primary" />
                  Quality Assessment
                </h3>
                <p className="text-sm text-muted-foreground">{analysis.quality_assessment}</p>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-3 flex items-center">
                  <Beaker className="mr-2 h-4 w-4 text-primary" />
                  Testing Procedure
                </h3>
                <div className="space-y-2 ml-6">
                  {analysis.testing_procedure.steps.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-primary/10 text-primary h-6 w-6 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 text-xs">
                        {index + 1}
                      </div>
                      <p className="text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-md font-medium mb-2 flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                    Confounding Variables
                  </h3>
                  <ul className="ml-6 space-y-1">
                    {analysis.confounding_variables.map((variable, index) => (
                      <li key={index} className="text-sm text-muted-foreground list-disc ml-2">{variable}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2 flex items-center">
                    <Microscope className="mr-2 h-4 w-4 text-primary" />
                    Evaluation Methods
                  </h3>
                  <ul className="ml-6 space-y-1">
                    {analysis.evaluation_methods.map((method, index) => (
                      <li key={index} className="text-sm text-muted-foreground list-disc ml-2">{method}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {analysis.recommendations && (
                <div>
                  <h3 className="text-md font-medium mb-2 flex items-center">
                    <ArrowRightLeft className="mr-2 h-4 w-4 text-primary" />
                    Recommendations
                  </h3>
                  <ul className="ml-6 space-y-1">
                    {analysis.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-sm text-muted-foreground list-disc ml-2">{recommendation}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-between border-t pt-4">
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground">
                  Analysis confidence:
                </span>
              </div>
              <Button variant="outline" onClick={handleAnalyze}>
                <ArrowRightLeft className="mr-2 h-4 w-4" />
                Re-analyze
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HypothesisAnalysis;
