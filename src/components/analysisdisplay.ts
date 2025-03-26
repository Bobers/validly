import React from 'react';
import { HypothesisAnalysis } from '@/lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Clipboard, CheckCircle, AlertCircle } from 'lucide-react';

interface AnalysisDisplayProps {
  analysis: HypothesisAnalysis;
  onReset: () => void;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, onReset }) => {
  // Function to determine confidence level color
  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-emerald-500';
    if (score >= 40) return 'bg-yellow-500';
    if (score >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Function to get confidence text
  const getConfidenceText = (score: number) => {
    if (score >= 80) return 'Very High';
    if (score >= 60) return 'High';
    if (score >= 40) return 'Moderate';
    if (score >= 20) return 'Low';
    return 'Very Low';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Hypothesis Analysis</h2>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          New Analysis
        </Button>
      </div>

      {/* Confidence Score */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Confidence Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Score: {analysis.confidence_score}/100</span>
              <Badge variant={analysis.confidence_score >= 60 ? "default" : "destructive"}>
                {getConfidenceText(analysis.confidence_score)}
              </Badge>
            </div>
            <Progress
              value={analysis.confidence_score}
              className={`h-2 ${getConfidenceColor(analysis.confidence_score)}`}
            />
            <p className="text-sm text-muted-foreground mt-2">
              This score represents our confidence in the potential validation of your hypothesis based on its structure, clarity, and testability.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quality Assessment */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Quality Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{analysis.quality_assessment}</p>
        </CardContent>
      </Card>

      {/* Testing Procedure */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Testing Procedure</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm whitespace-pre-line">{analysis.testing_procedure}</p>
        </CardContent>
      </Card>

      {/* Confounding Variables */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Potential Confounding Variables</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1">
            {analysis.confounding_variables.map((variable, index) => (
              <li key={index} className="text-sm">{variable}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Evaluation Methods */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Recommended Evaluation Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1">
            {analysis.evaluation_methods.map((method, index) => (
              <li key={index} className="text-sm">{method}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Improvement Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1">
            {analysis.recommendations.map((recommendation, index) => (
              <li key={index} className="text-sm">{recommendation}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisDisplay;
