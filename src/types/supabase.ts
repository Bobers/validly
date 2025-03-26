
export type HypothesisStatus = 'Planned' | 'In Progress' | 'Validated' | 'Rejected';

export interface Hypothesis {
  id: string;
  title: string;
  business_idea: string;
  target_audience: string;
  expected_outcome: string;
  timeframe: number;
  measurement_method: string;
  success_criteria: string;
  status: HypothesisStatus;
  progress: number;
  days_left: number;
  confidence: number;
  created_at: string;
  user_id: string | null;
  analysis?: any; // Optional property to store AI analysis
}

export interface HypothesisFormData {
  businessIdea: string;
  targetAudience: string;
  expectedOutcome: string;
  timeframe: string;
  measurementMethod: string;
  successCriteria: string;
}
