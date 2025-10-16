import { Question } from './supabase';

interface GenerationParams {
  industry?: string;
  useCase?: string;
  role?: string;
  teamType?: string;
}

export function generateSurveyQuestions(params: GenerationParams): Omit<Question, 'id' | 'survey_id' | 'created_at' | 'updated_at'>[] {
  const { industry = 'Business', useCase = 'Employee Engagement', role = 'HR', teamType = 'Team' } = params;

  const templates: Record<string, Omit<Question, 'id' | 'survey_id' | 'created_at' | 'updated_at'>[]> = {
    'Employee Engagement': [
      {
        question_text: 'How satisfied are you with your current role and responsibilities?',
        question_type: 'multiple_choice',
        options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
        order_index: 0,
        ai_generated: true,
      },
      {
        question_text: 'What motivates you most in your work? Please share your thoughts.',
        question_type: 'text_entry',
        options: [],
        order_index: 1,
        ai_generated: true,
      },
      {
        question_text: 'How would you rate the work-life balance at our organization?',
        question_type: 'dropdown',
        options: ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor'],
        order_index: 2,
        ai_generated: true,
      },
      {
        question_text: 'Do you feel valued and appreciated for your contributions?',
        question_type: 'multiple_choice',
        options: ['Always', 'Often', 'Sometimes', 'Rarely', 'Never'],
        order_index: 3,
        ai_generated: true,
      },
      {
        question_text: 'What suggestions do you have for improving team collaboration?',
        question_type: 'text_entry',
        options: [],
        order_index: 4,
        ai_generated: true,
      },
    ],
    'Customer Satisfaction': [
      {
        question_text: 'How would you rate your overall experience with our product/service?',
        question_type: 'multiple_choice',
        options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'],
        order_index: 0,
        ai_generated: true,
      },
      {
        question_text: 'What did you like most about your experience?',
        question_type: 'text_entry',
        options: [],
        order_index: 1,
        ai_generated: true,
      },
      {
        question_text: 'How likely are you to recommend us to a friend or colleague?',
        question_type: 'dropdown',
        options: ['Extremely Likely', 'Very Likely', 'Somewhat Likely', 'Not Very Likely', 'Not at All Likely'],
        order_index: 2,
        ai_generated: true,
      },
    ],
    'Market Research': [
      {
        question_text: 'Which features are most important to you when choosing a product in this category?',
        question_type: 'multiple_choice',
        options: ['Price', 'Quality', 'Brand Reputation', 'Customer Service', 'Features'],
        order_index: 0,
        ai_generated: true,
      },
      {
        question_text: 'What challenges are you currently facing that our solution could address?',
        question_type: 'text_entry',
        options: [],
        order_index: 1,
        ai_generated: true,
      },
      {
        question_text: 'How often do you purchase products in this category?',
        question_type: 'dropdown',
        options: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annually', 'Rarely'],
        order_index: 2,
        ai_generated: true,
      },
    ],
  };

  return templates[useCase] || templates['Employee Engagement'];
}

export function regenerateQuestion(
  currentText: string,
  type: 'multiple_choice' | 'text_entry' | 'dropdown',
  style: 'concise' | 'casual'
): string {
  if (style === 'concise') {
    const conciseVersions: Record<string, string> = {
      'How satisfied are you with your current role and responsibilities?': 'Rate your satisfaction with your role',
      'What motivates you most in your work? Please share your thoughts.': 'What motivates you at work?',
      'How would you rate the work-life balance at our organization?': 'Rate your work-life balance',
      'Do you feel valued and appreciated for your contributions?': 'Do you feel valued for your work?',
      'What suggestions do you have for improving team collaboration?': 'How can we improve team collaboration?',
      'How would you rate your overall experience with our product/service?': 'Rate your overall experience',
      'What did you like most about your experience?': 'What did you like most?',
      'How likely are you to recommend us to a friend or colleague?': 'Would you recommend us?',
      'Which features are most important to you when choosing a product in this category?': 'What features matter most to you?',
      'What challenges are you currently facing that our solution could address?': 'What challenges can we help solve?',
      'How often do you purchase products in this category?': 'Purchase frequency?',
    };
    return conciseVersions[currentText] || currentText.replace(/Please share your thoughts\.?|at our organization/gi, '').trim();
  } else {
    const casualVersions: Record<string, string> = {
      'How satisfied are you with your current role and responsibilities?': 'How are you feeling about your role these days?',
      'What motivates you most in your work? Please share your thoughts.': 'What gets you excited about coming to work?',
      'How would you rate the work-life balance at our organization?': 'How\'s your work-life balance going?',
      'Do you feel valued and appreciated for your contributions?': 'Do you feel like your work is appreciated?',
      'What suggestions do you have for improving team collaboration?': 'Got any ideas for how we could work better as a team?',
      'How would you rate your overall experience with our product/service?': 'How was your experience with us?',
      'What did you like most about your experience?': 'What stood out to you in a good way?',
      'How likely are you to recommend us to a friend or colleague?': 'Would you tell your friends about us?',
      'Which features are most important to you when choosing a product in this category?': 'What do you look for when shopping for something like this?',
      'What challenges are you currently facing that our solution could address?': 'What problems are you dealing with that we might help with?',
      'How often do you purchase products in this category?': 'How often do you buy stuff like this?',
    };
    return casualVersions[currentText] || currentText.replace(/our organization/gi, 'things').replace(/please share your thoughts/gi, '');
  }
}
