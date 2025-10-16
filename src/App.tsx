import { useState, useEffect } from 'react';
import { ProfilerFlow } from './components/ProfilerFlow';
import { SurveyEditor } from './components/SurveyEditor';
import { DeployedScreen } from './components/DeployedScreen';
import { supabase, Survey, Question } from './lib/supabase';
import { generateSurveyQuestions } from './lib/surveyGenerator';

type AppState = 'profiler' | 'editor' | 'deployed';

function App() {
  const [appState, setAppState] = useState<AppState>('editor');
  const [currentSurvey, setCurrentSurvey] = useState<Survey | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeSurvey = async () => {
      const defaultProfileData = {
        industry: 'Technology',
        useCase: 'Employee Engagement',
        role: 'HR Manager',
        teamType: 'Team',
      };

      const tempUserId = crypto.randomUUID();

      const { data: survey, error: surveyError } = await supabase
        .from('surveys')
        .insert({
          user_id: tempUserId,
          title: `${defaultProfileData.useCase} Survey`,
          status: 'draft',
          personalization_signals: {
            industry: defaultProfileData.industry,
            use_case: defaultProfileData.useCase,
            role: defaultProfileData.role,
            team_type: defaultProfileData.teamType,
          },
        })
        .select()
        .single();

      if (surveyError || !survey) {
        console.error('Error creating survey:', surveyError);
        setIsLoading(false);
        return;
      }

      const generatedQuestions = generateSurveyQuestions({
        industry: defaultProfileData.industry,
        useCase: defaultProfileData.useCase,
        role: defaultProfileData.role,
        teamType: defaultProfileData.teamType,
      });

      const questionsToInsert = generatedQuestions.map((q) => ({
        ...q,
        survey_id: survey.id,
      }));

      const { data: insertedQuestions, error: questionsError } = await supabase
        .from('questions')
        .insert(questionsToInsert)
        .select();

      if (questionsError || !insertedQuestions) {
        console.error('Error creating questions:', questionsError);
        setIsLoading(false);
        return;
      }

      setCurrentSurvey(survey);
      setQuestions(insertedQuestions);
      setIsLoading(false);
    };

    initializeSurvey();
  }, []);

  const regenerateSurvey = async (signals: Record<string, string>) => {
    if (!currentSurvey) return;

    setIsLoading(true);

    await supabase.from('questions').delete().eq('survey_id', currentSurvey.id);

    const { error: updateError } = await supabase
      .from('surveys')
      .update({ personalization_signals: signals, updated_at: new Date().toISOString() })
      .eq('id', currentSurvey.id);

    if (updateError) {
      console.error('Error updating survey:', updateError);
      setIsLoading(false);
      return;
    }

    const generatedQuestions = generateSurveyQuestions({
      industry: signals.industry,
      useCase: signals.use_case,
      role: signals.role,
      teamType: signals.team_type,
    });

    const questionsToInsert = generatedQuestions.map((q) => ({
      ...q,
      survey_id: currentSurvey.id,
    }));

    const { data: insertedQuestions, error: questionsError } = await supabase
      .from('questions')
      .insert(questionsToInsert)
      .select();

    if (questionsError || !insertedQuestions) {
      console.error('Error creating questions:', questionsError);
      setIsLoading(false);
      return;
    }

    setCurrentSurvey({ ...currentSurvey, personalization_signals: signals });
    setQuestions(insertedQuestions);
    setIsLoading(false);
  };

  const deploySurvey = async () => {
    if (!currentSurvey) return;

    const { error } = await supabase
      .from('surveys')
      .update({
        status: 'deployed',
        deployed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', currentSurvey.id);

    if (error) {
      console.error('Error deploying survey:', error);
      return;
    }

    setAppState('deployed');
  };

  const startNewSurvey = () => {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Creating your personalized survey...</p>
        </div>
      </div>
    );
  }

  if (appState === 'editor' && currentSurvey && questions.length > 0) {
    return (
      <SurveyEditor
        survey={currentSurvey}
        questions={questions}
        onDeploy={deploySurvey}
        onRegenerateAll={regenerateSurvey}
        initialExpanded={true}
      />
    );
  }

  if (appState === 'deployed' && currentSurvey) {
    return <DeployedScreen surveyId={currentSurvey.id} onCreateNew={startNewSurvey} />;
  }

  return null;
}

export default App;
