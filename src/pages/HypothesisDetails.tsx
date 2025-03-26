
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  TestTube, 
  BarChart3, 
  Target, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Edit2,
  Trash2,
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import HypothesisAnalysis from '@/components/HypothesisAnalysis';
import { hypothesesService } from '@/services/supabase';
import { Hypothesis, HypothesisStatus } from '@/types/supabase';

const HypothesisDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hypothesis, setHypothesis] = useState<Hypothesis | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    const fetchHypothesis = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await hypothesesService.getById(id);
        setHypothesis(data);
      } catch (error) {
        console.error('Error fetching hypothesis:', error);
        toast({
          title: "Error",
          description: "Failed to load hypothesis details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchHypothesis();
  }, [id, toast]);
  
  const handleAnalysisComplete = async (analysis: any) => {
    if (!hypothesis) return;
    
    try {
      // Update the hypothesis with the analysis
      const updatedHypothesis = await hypothesesService.update(hypothesis.id, {
        ...hypothesis,
        analysis
      });
      
      if (updatedHypothesis) {
        setHypothesis(updatedHypothesis);
      }
    } catch (error) {
      console.error('Error updating hypothesis with analysis:', error);
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Validated':
        return 'bg-green-500 text-white';
      case 'Rejected':
        return 'bg-red-500 text-white';
      case 'In Progress':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Validated':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'Rejected':
        return <XCircle className="h-4 w-4" />;
      case 'In Progress':
        return <Clock className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };
  
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
          
          {loading ? (
            <>
              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-5 w-1/2" />
            </>
          ) : hypothesis ? (
            <>
              <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                <h1 className="text-3xl font-display font-bold">{hypothesis.title}</h1>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(hypothesis.status)}>
                  <span className="flex items-center">
                    {getStatusIcon(hypothesis.status)}
                    <span className="ml-1">{hypothesis.status}</span>
                  </span>
                </Badge>
                
                <p className="text-muted-foreground">
                  Created on {new Date(hypothesis.created_at).toLocaleDateString()}
                </p>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">Hypothesis not found</p>
          )}
        </div>
        
        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        ) : hypothesis ? (
          <div className="space-y-8">
            <Tabs 
              defaultValue="overview" 
              className="w-full" 
              onValueChange={setActiveTab}
              value={activeTab}
            >
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
                <TabsTrigger value="testing">Testing</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Hypothesis Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Business Idea</h3>
                      <p>{hypothesis.business_idea}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Target Audience</h3>
                        <p>{hypothesis.target_audience}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Expected Outcome</h3>
                        <p>{hypothesis.expected_outcome}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Measurement Method</h3>
                        <p>{hypothesis.measurement_method}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Success Criteria</h3>
                        <p>{hypothesis.success_criteria}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Timeframe</h3>
                        <p>{hypothesis.timeframe} days</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Days Left</h3>
                        <p>{hypothesis.days_left} days</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-1 flex justify-between items-center">
                        <h3 className="text-sm font-medium text-muted-foreground">Test Progress</h3>
                        <span className="text-sm font-medium">{hypothesis.progress}%</span>
                      </div>
                      <Progress value={hypothesis.progress} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-6 flex gap-4">
                    <Button>
                      <TestTube className="h-4 w-4 mr-2" />
                      Start Testing
                    </Button>
                    <Button variant="outline" onClick={() => setActiveTab('analysis')}>
                      <Brain className="h-4 w-4 mr-2" />
                      Run AI Analysis
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="analysis" className="space-y-6">
                <HypothesisAnalysis 
                  hypothesis={hypothesis} 
                  onAnalysisComplete={handleAnalysisComplete} 
                />
              </TabsContent>
              
              <TabsContent value="testing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Testing Procedure</CardTitle>
                    <CardDescription>
                      Design and implement tests to validate your hypothesis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-10">
                    <p className="text-muted-foreground mb-6">
                      Coming soon: Design test procedures based on the POPPER methodology
                    </p>
                    <Button disabled>
                      <TestTube className="h-4 w-4 mr-2" />
                      Create Test Design
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="results" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Test Results</CardTitle>
                    <CardDescription>
                      View and analyze the results of your hypothesis tests
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-10">
                    <p className="text-muted-foreground mb-6">
                      Coming soon: Track and visualize test results for your hypothesis
                    </p>
                    <Button disabled>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Results Dashboard
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">Hypothesis Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The hypothesis you're looking for doesn't exist or has been deleted.
              </p>
              <Button asChild>
                <Link to="/dashboard">Return to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default HypothesisDetails;
