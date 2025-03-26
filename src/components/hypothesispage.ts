import React from 'react';
import { useHypothesis } from '@/hooks/useHypothesis';
import AnalysisDisplay from '@/components/AnalysisDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

// Form validation schema
const hypothesisSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  business_idea: z.string().min(10, "Business idea must be at least 10 characters"),
  target_audience: z.string().min(3, "Target audience must be at least 3 characters"),
  expected_outcome: z.string().min(10, "Expected outcome must be at least 10 characters"),
  timeframe: z.string().min(1, "Timeframe is required"),
  measurement_method: z.string().min(5, "Measurement method must be at least 5 characters"),
  success_criteria: z.string().min(5, "Success criteria must be at least 5 characters"),
  status: z.string().default("draft"),
});

type HypothesisFormValues = z.infer<typeof hypothesisSchema>;

const HypothesisPage: React.FC = () => {
  const { isLoading, analysis, submitHypothesis, resetAnalysis } = useHypothesis();
  
  // Setup form with validation
  const form = useForm<HypothesisFormValues>({
    resolver: zodResolver(hypothesisSchema),
    defaultValues: {
      title: "",
      business_idea: "",
      target_audience: "",
      expected_outcome: "",
      timeframe: "30",
      measurement_method: "",
      success_criteria: "",
      status: "draft",
    },
  });

  const onSubmit = async (data: HypothesisFormValues) => {
    await submitHypothesis(data);
  };

  const handleReset = () => {
    resetAnalysis();
    form.reset();
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Hypothesis Testing</h1>
      
      {analysis ? (
        <AnalysisDisplay analysis={analysis} onReset={handleReset} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Create Hypothesis</CardTitle>
            <CardDescription>
              Define your business hypothesis using the POPPER methodology for scientific validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hypothesis Title</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., 'Introducing feature X will increase user engagement'" {...field} />
                      </FormControl>
                      <FormDescription>
                        A clear, concise title for your hypothesis
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Business Idea */}
                <FormField
                  control={form.control}
                  name="business_idea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Idea</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your business idea or hypothesis in detail" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Clearly define the problem or opportunity your idea addresses
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Target Audience */}
                <FormField
                  control={form.control}
                  name="target_audience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., 'Small business owners aged 25-45'" {...field} />
                      </FormControl>
                      <FormDescription>
                        Who is this hypothesis targeting?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Expected Outcome */}
                <FormField
                  control={form.control}
                  name="expected_outcome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Outcome</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What specific result do you expect from testing this hypothesis?" 
                          className="min-h-[80px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Form a clear, testable prediction
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Timeframe */}
                  <FormField
                    control={form.control}
                    name="timeframe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timeframe (days)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" placeholder="30" {...field} />
                        </FormControl>
                        <FormDescription>
                          How long will it take to test this hypothesis?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Status - hidden initially as it's a draft by default */}
                  <input type="hidden" {...form.register("status")} value="draft" />
                </div>

                {/* Measurement Method */}
                <FormField
                  control={form.control}
                  name="measurement_method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Measurement Method</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., 'A/B testing with control group'" {...field} />
                      </FormControl>
                      <FormDescription>
                        How will you collect and analyze data?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Success Criteria */}
                <FormField
                  control={form.control}
                  name="success_criteria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Success Criteria</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., '15% increase in user retention'" {...field} />
                      </FormControl>
                      <FormDescription>
                        Define the threshold for considering this hypothesis validated
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Hypothesis"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HypothesisPage;