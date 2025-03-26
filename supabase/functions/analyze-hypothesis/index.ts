
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { hypothesis } = await req.json();
    
    if (!hypothesis) {
      return new Response(
        JSON.stringify({ error: 'Hypothesis data is required' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Analyzing hypothesis:', hypothesis.title);
    
    // Create the system prompt using POPPER methodology
    const systemPrompt = `You are an expert in the scientific method and hypothesis testing using Karl Popper's methodology.
    
The POPPER framework consists of these key aspects:
1. Problem Identification - Clearly define the business problem or opportunity
2. Observation - Gather relevant data and observations about the current state
3. Prediction - Form a testable, falsifiable prediction
4. Procedure - Design a rigorous experiment to test the prediction
5. Evaluation - Analyze experimental results objectively
6. Refinement - Update beliefs based on evidence and iterate if necessary

Analyze the hypothesis and provide:
1. An assessment of the hypothesis quality (is it falsifiable, clear, and specific?)
2. A detailed testing procedure following the POPPER methodology
3. Potential confounding variables to control for
4. Methods to measure and evaluate results
5. A confidence score (1-100) on the likelihood of validation based on your analysis

Your response should be structured and formatted as JSON.`;

    // Prepare the user message with hypothesis details
    const userMessage = `Please analyze this business hypothesis:
    
Title: ${hypothesis.title}
Business Idea: ${hypothesis.business_idea}
Target Audience: ${hypothesis.target_audience}
Expected Outcome: ${hypothesis.expected_outcome}
Timeframe: ${hypothesis.timeframe} days
Measurement Method: ${hypothesis.measurement_method}
Success Criteria: ${hypothesis.success_criteria}
Current Status: ${hypothesis.status}`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to analyze hypothesis', details: errorData }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;
    
    console.log('Analysis completed successfully');

    return new Response(
      JSON.stringify({ analysis: JSON.parse(analysis) }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-hypothesis function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
