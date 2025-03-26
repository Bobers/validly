import { useState } from 'react';
import { analyzeHypothesis, HypothesisInput, HypothesisAnalysis } from '@/lib/supabaseClient';
import { toast } from 'sonner';

export function useHypothesis() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<HypothesisAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitHypothesis = async (formData: HypothesisInput) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // First step: Analyze the hypothesis using the Supabase function
      const analysisResult = await analyzeHypothesis(formData);
      setAnalysis(analysisResult);
      
      // Show success message
      toast.success('Hypothesis analyzed successfully!');
      
      return analysisResult;
    } catch (err) {
      console.error('Error submitting hypothesis:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      
      // Show error message
      toast.error(`Error analyzing hypothesis: ${errorMessage}`);
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setError(null);
  };

  return {
    isLoading,
    analysis,
    error,
    submitHypothesis,
    resetAnalysis
  };
}
