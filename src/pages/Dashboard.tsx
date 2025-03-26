import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PencilLine, 
  TestTube, 
  BarChart3, 
  Plus, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Timer, 
  Target,
  AlertCircle,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import GlassMorphicCard from '@/components/GlassMorphicCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { hypothesesService } from '@/services/supabase';
import { Hypothesis, HypothesisStatus } from '@/types/supabase';

const Dashboard = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [hypotheses, setHypotheses] = useState<Hypothesis[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  
  const fetchHypotheses = async () => {
    try {
      setLoading(true);
      let data: Hypothesis[];
      
      if (activeTab === 'all') {
        data = await hypothesesService.getAll();
      } else {
        data = await hypothesesService.getByStatus(activeTab as HypothesisStatus);
      }
      
      setHypotheses(data);
    } catch (error) {
      console.error('Error fetching hypotheses:', error);
      toast({
        title: "Error",
        description: "Failed to load hypotheses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchHypotheses();
  }, [activeTab]);
  
  const filteredHypotheses = hypotheses.filter(hypothesis => 
    hypothesis.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
        return <Timer className="h-4 w-4" />;
    }
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const renderHypothesisList = (hypotheses: Hypothesis[]) => {
    if (loading) {
      return Array(3).fill(0).map((_, index) => (
        <Card key={`skeleton-${index}`} className="overflow-hidden animate-pulse">
          <CardHeader className="pb-3">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/4" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:items-center">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-2 w-full" />
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 pb-4">
            <Skeleton className="h-8 w-24 mr-2" />
            <Skeleton className="h-8 w-24" />
          </CardFooter>
        </Card>
      ));
    }
    
    if (hypotheses.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No hypotheses found.</p>
          <Button asChild>
            <Link to="/hypothesis-builder">
              <Plus className="h-4 w-4 mr-2" />
              Create your first hypothesis
            </Link>
          </Button>
        </div>
      );
    }
    
    return hypotheses.map((hypothesis) => (
      <Card key={hypothesis.id} className="overflow-hidden animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{hypothesis.title}</CardTitle>
            <Badge className={getStatusColor(hypothesis.status)}>
              <span className="flex items-center">
                {getStatusIcon(hypothesis.status)}
                <span className="ml-1">{hypothesis.status}</span>
              </span>
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:items-center">
            <div className="flex-1">
              <div className="mb-1 flex justify-between items-center">
                <span className="text-sm">Test Progress</span>
                <span className="text-sm font-medium">{hypothesis.progress}%</span>
              </div>
              <Progress value={hypothesis.progress} className="h-2" />
            </div>
            
            <div className="flex items-center space-x-4">
              {hypothesis.status === 'In Progress' && (
                <div className="flex items-center space-x-2 text-sm text-amber-600">
                  <Clock className="h-4 w-4" />
                  <span>{hypothesis.days_left} days left</span>
                </div>
              )}
              
              {(hypothesis.status === 'Validated' || hypothesis.status === 'Rejected') && (
                <div className="flex items-center space-x-2 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{hypothesis.confidence}% confidence</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t pt-4 pb-4 flex justify-between">
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Results
            </Button>
            
            {hypothesis.status === 'In Progress' && (
              <Button size="sm" variant="outline">
                <TestTube className="h-4 w-4 mr-2" />
                Test Design
              </Button>
            )}
          </div>
          
          <Button size="sm" variant="ghost" className="text-muted-foreground" asChild>
            <Link to={`/hypothesis/${hypothesis.id}`}>
              Details
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    ));
  };
  
  const validatedCount = hypotheses.filter(h => h.status === 'Validated').length;
  const inProgressCount = hypotheses.filter(h => h.status === 'In Progress').length;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Track and manage your business hypotheses testing process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GlassMorphicCard className="p-6 col-span-1 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex justify-between items-start mb-2">
              <div className="bg-primary/10 text-primary h-10 w-10 rounded-full flex items-center justify-center">
                <Target className="h-5 w-5" />
              </div>
              <Badge variant="outline">Total</Badge>
            </div>
            
            {loading ? (
              <Skeleton className="h-8 w-16 mb-1" />
            ) : (
              <>
                <h3 className="text-2xl font-semibold">{hypotheses.length}</h3>
                <p className="text-muted-foreground text-sm">Hypotheses</p>
              </>
            )}
          </GlassMorphicCard>
          
          <GlassMorphicCard className="p-6 col-span-1 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="flex justify-between items-start mb-2">
              <div className="bg-green-100 text-green-600 h-10 w-10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <Badge variant="outline" className="border-green-200 text-green-600">Validated</Badge>
            </div>
            
            {loading ? (
              <Skeleton className="h-8 w-16 mb-1" />
            ) : (
              <>
                <h3 className="text-2xl font-semibold">{validatedCount}</h3>
                <p className="text-muted-foreground text-sm">Validated Hypotheses</p>
              </>
            )}
          </GlassMorphicCard>
          
          <GlassMorphicCard className="p-6 col-span-1 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="flex justify-between items-start mb-2">
              <div className="bg-blue-100 text-blue-600 h-10 w-10 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <Badge variant="outline" className="border-blue-200 text-blue-600">In Progress</Badge>
            </div>
            
            {loading ? (
              <Skeleton className="h-8 w-16 mb-1" />
            ) : (
              <>
                <h3 className="text-2xl font-semibold">{inProgressCount}</h3>
                <p className="text-muted-foreground text-sm">Active Tests</p>
              </>
            )}
          </GlassMorphicCard>
        </div>
        
        <Tabs defaultValue="all" className="w-full mb-8" onValueChange={handleTabChange}>
          <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
            <TabsList>
              <TabsTrigger value="all">All Hypotheses</TabsTrigger>
              <TabsTrigger value="In Progress">Active</TabsTrigger>
              <TabsTrigger value="Validated">Validated</TabsTrigger>
              <TabsTrigger value="Rejected">Rejected</TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search hypotheses..."
                  className="max-w-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button asChild>
                <Link to="/hypothesis-builder">
                  <Plus className="h-4 w-4 mr-2" />
                  New Hypothesis
                </Link>
              </Button>
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {renderHypothesisList(filteredHypotheses)}
            </div>
          </TabsContent>
          
          <TabsContent value="In Progress" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {renderHypothesisList(filteredHypotheses.filter(h => h.status === 'In Progress'))}
            </div>
          </TabsContent>
          
          <TabsContent value="Validated" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {renderHypothesisList(filteredHypotheses.filter(h => h.status === 'Validated'))}
            </div>
          </TabsContent>
          
          <TabsContent value="Rejected" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {renderHypothesisList(filteredHypotheses.filter(h => h.status === 'Rejected'))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassMorphicCard className="p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <PencilLine className="h-5 w-5 text-primary mr-2" />
              Recently Created Hypotheses
            </h3>
            
            <div className="space-y-4">
              {loading ? (
                Array(3).fill(0).map((_, index) => (
                  <div key={`recent-skeleton-${index}`} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <Skeleton className="h-4 w-48 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                ))
              ) : hypotheses.length > 0 ? (
                hypotheses.slice(0, 3).map((hypothesis) => (
                  <div key={hypothesis.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-sm line-clamp-1">{hypothesis.title}</p>
                      <div className="flex items-center mt-1 space-x-2">
                        <Badge variant="outline" className="text-xs font-normal">
                          {hypothesis.status}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-muted-foreground">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hypotheses created yet.
                </p>
              )}
            </div>
            
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="w-full"
              >
                <Link to="/hypothesis-builder">
                  <Plus className="h-4 w-4 mr-2" />
                  New Hypothesis
                </Link>
              </Button>
            </div>
          </GlassMorphicCard>
          
          <GlassMorphicCard className="p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TestTube className="h-5 w-5 text-primary mr-2" />
              Test Design Templates
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium text-sm">A/B Testing Template</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Compare two versions to determine which performs better
                  </p>
                </div>
                <Button size="sm">Use</Button>
              </div>
              
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium text-sm">Cohort Analysis Template</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Track behavior of specific user groups over time
                  </p>
                </div>
                <Button size="sm">Use</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Survey Template</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Collect qualitative feedback from target audience
                  </p>
                </div>
                <Button size="sm">Use</Button>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
              >
                View All Templates
              </Button>
            </div>
          </GlassMorphicCard>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
