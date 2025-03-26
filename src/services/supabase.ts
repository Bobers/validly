
import { supabase } from '@/integrations/supabase/client';
import { Hypothesis, HypothesisStatus, HypothesisFormData } from '../types/supabase';

// Hypotheses services
export const hypothesesService = {
  // Get all hypotheses for the current user
  getAll: async (): Promise<Hypothesis[]> => {
    try {
      const { data, error } = await supabase
        .from('hypotheses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching hypotheses:', error);
        throw error;
      }
      
      return (data || []).map(item => ({
        ...item,
        status: item.status as HypothesisStatus
      }));
    } catch (err) {
      console.error('Failed to fetch hypotheses:', err);
      return []; // Return empty array instead of throwing to prevent UI crashes
    }
  },
  
  // Get hypotheses by status
  getByStatus: async (status: HypothesisStatus): Promise<Hypothesis[]> => {
    try {
      const { data, error } = await supabase
        .from('hypotheses')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error(`Error fetching ${status} hypotheses:`, error);
        throw error;
      }
      
      return (data || []).map(item => ({
        ...item,
        status: item.status as HypothesisStatus
      }));
    } catch (err) {
      console.error(`Failed to fetch ${status} hypotheses:`, err);
      return []; // Return empty array instead of throwing
    }
  },
  
  // Get a hypothesis by ID
  getById: async (id: string): Promise<Hypothesis | null> => {
    try {
      const { data, error } = await supabase
        .from('hypotheses')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching hypothesis:', error);
        throw error;
      }
      
      return data ? {
        ...data,
        status: data.status as HypothesisStatus
      } : null;
    } catch (err) {
      console.error('Failed to fetch hypothesis by ID:', err);
      return null; // Return null instead of throwing
    }
  },
  
  // Create a new hypothesis
  create: async (formData: HypothesisFormData): Promise<Hypothesis | null> => {
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      const newHypothesis = {
        title: formData.businessIdea.substring(0, 100), // Use the beginning of business idea as title
        business_idea: formData.businessIdea,
        target_audience: formData.targetAudience,
        expected_outcome: formData.expectedOutcome,
        timeframe: parseInt(formData.timeframe),
        measurement_method: formData.measurementMethod,
        success_criteria: formData.successCriteria,
        status: 'Planned' as HypothesisStatus,
        progress: 0,
        days_left: parseInt(formData.timeframe),
        confidence: 0,
        user_id: user?.id || null,
        created_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('hypotheses')
        .insert([newHypothesis])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating hypothesis:', error);
        throw error;
      }
      
      return data ? {
        ...data,
        status: data.status as HypothesisStatus
      } : null;
    } catch (err) {
      console.error('Failed to create hypothesis:', err);
      return null; // Return null instead of throwing
    }
  },
  
  // Update a hypothesis
  update: async (id: string, updates: Partial<Hypothesis>): Promise<Hypothesis | null> => {
    try {
      const { data, error } = await supabase
        .from('hypotheses')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating hypothesis:', error);
        throw error;
      }
      
      return data ? {
        ...data,
        status: data.status as HypothesisStatus
      } : null;
    } catch (err) {
      console.error('Failed to update hypothesis:', err);
      return null; // Return null instead of throwing
    }
  },
  
  // Delete a hypothesis
  delete: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('hypotheses')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting hypothesis:', error);
        throw error;
      }
      
      return true;
    } catch (err) {
      console.error('Failed to delete hypothesis:', err);
      return false; // Return false to indicate failure
    }
  }
};

export { supabase };
