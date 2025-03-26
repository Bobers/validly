
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PencilLine, 
  Flask, 
  BarChart3, 
  Plus, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Timer, 
  Target,
  AlertCircle,
  ChevronRight
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
import AnimatedGradient from '@/components/AnimatedGradient';

// Mock data
const hypotheses = [
  {
    id: 1,
    title: "Adding product recommendations increases average order value",
    status: "In Progress",
    progress: 65,
    daysLeft: 8,
    confidence: 72,
  },
  {
    id: 2,
    title: "Users prefer dark mode UI for our analytics dashboard",
    status: "Validated",
    progress: 100,
    daysLeft: 0,
    confidence: 89,
  },
  {
    id: 3,
    title: "Email reminders increase subscription renewals by 30%",
    status: "Rejected",
    progress: 100,
    daysLeft: 0,
    confidence: 32,
  },
  {
    id: 4,
    title: "Mobile app users convert at 2x the rate of web users",
    status: "Planned",
    progress: 0,
    daysLeft: 14,
    confidence: 0,
  },
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
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
            
            <h3 className="text-2xl font-semibold">{hypotheses.length}</h3>
            <p className="text-muted-foreground text-sm">Hypotheses</p>
          </GlassMorphicCard>
          
          <GlassMorphicCard className="p-6 col-span-1 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="flex justify-between items-start mb-2">
              <div className="bg-green-100 text-green-600 h-10 w-10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <Badge variant="outline" className="border-green-200 text-green-600">Validated</Badge>
            </div>
            
            <h3 className="text-2xl font-semibold">
              {hypotheses.filter(h => h.status === 'Validated').length}
            </h3>
            <p className="text-muted-foreground text-sm">Validated Hypotheses</p>
          </GlassMorphicCard>
          
          <GlassMorphicCard className="p-6 col-span-1 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="flex justify-between items-start mb-2">
              <div className="bg-blue-100 text-blue-600 h-10 w-10 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <Badge variant="outline" className="border-blue-200 text-blue-600">In Progress</Badge>
            </div>
            
            <h3 className="text-2xl font-semibold">
              {hypotheses.filter(h => h.status === 'In Progress').length}
            </h3>
            <p className="text-muted-foreground text-sm">Active Tests</p>
          </GlassMorphicCard>
        </div>
        
        <Tabs defaultValue="all" className="w-full mb-8">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
            <TabsList>
              <TabsTrigger value="all">All Hypotheses</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="validated">Validated</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
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
              {filteredHypotheses.length > 0 ? (
                filteredHypotheses.map((hypothesis) => (
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
                              <span>{hypothesis.daysLeft} days left</span>
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
                            <Flask className="h-4 w-4 mr-2" />
                            Test Design
                          </Button>
                        )}
                      </div>
                      
                      <Button size="sm" variant="ghost" className="text-muted-foreground">
                        Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No hypotheses found.</p>
                  <Button asChild>
                    <Link to="/hypothesis-builder">
                      <Plus className="h-4 w-4 mr-2" />
                      Create your first hypothesis
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="active" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {filteredHypotheses.filter(h => h.status === 'In Progress').length > 0 ? (
                filteredHypotheses
                  .filter(h => h.status === 'In Progress')
                  .map((hypothesis) => (
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
                          
                          <div className="flex items-center space-x-2 text-sm text-amber-600">
                            <Clock className="h-4 w-4" />
                            <span>{hypothesis.daysLeft} days left</span>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="border-t pt-4 pb-4 flex justify-between">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Results
                          </Button>
                          
                          <Button size="sm" variant="outline">
                            <Flask className="h-4 w-4 mr-2" />
                            Test Design
                          </Button>
                        </div>
                        
                        <Button size="sm" variant="ghost" className="text-muted-foreground">
                          Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No active hypotheses found.</p>
                  <Button asChild>
                    <Link to="/hypothesis-builder">
                      <Plus className="h-4 w-4 mr-2" />
                      Create a new hypothesis
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="validated" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {filteredHypotheses.filter(h => h.status === 'Validated').length > 0 ? (
                filteredHypotheses
                  .filter(h => h.status === 'Validated')
                  .map((hypothesis) => (
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
                              <span className="text-sm">Confidence Level</span>
                              <span className="text-sm font-medium">{hypothesis.confidence}%</span>
                            </div>
                            <Progress value={hypothesis.confidence} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="border-t pt-4 pb-4 flex justify-between">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Results
                          </Button>
                        </div>
                        
                        <Button size="sm" variant="ghost" className="text-muted-foreground">
                          Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No validated hypotheses found.</p>
                  <Button asChild>
                    <Link to="/hypothesis-builder">
                      <Plus className="h-4 w-4 mr-2" />
                      Create a new hypothesis
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="rejected" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {filteredHypotheses.filter(h => h.status === 'Rejected').length > 0 ? (
                filteredHypotheses
                  .filter(h => h.status === 'Rejected')
                  .map((hypothesis) => (
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
                              <span className="text-sm">Confidence Level</span>
                              <span className="text-sm font-medium">{hypothesis.confidence}%</span>
                            </div>
                            <Progress value={hypothesis.confidence} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="border-t pt-4 pb-4 flex justify-between">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Results
                          </Button>
                        </div>
                        
                        <Button size="sm" variant="ghost" className="text-muted-foreground">
                          Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No rejected hypotheses found.</p>
                  <Button asChild>
                    <Link to="/hypothesis-builder">
                      <Plus className="h-4 w-4 mr-2" />
                      Create a new hypothesis
                    </Link>
                  </Button>
                </div>
              )}
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
              {hypotheses.slice(0, 3).map((hypothesis) => (
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
              ))}
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
              <Flask className="h-5 w-5 text-primary mr-2" />
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
