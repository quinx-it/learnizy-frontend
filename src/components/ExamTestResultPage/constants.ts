import { AnswerEvaluation } from '@/api/endpoints/test';

export const EvaluationValue = {
  [AnswerEvaluation.Correct]: 1,
  [AnswerEvaluation.Partial]: 0.5,
  [AnswerEvaluation.Incorrect]: 0,
  [AnswerEvaluation.Unassessed]: 0,
};

export const evaluationMap = {
  [AnswerEvaluation.Correct]: {
    translationKey: 'EVALUATION.CORRECT',
    evaluation: AnswerEvaluation.Correct,
    value: EvaluationValue[AnswerEvaluation.Correct],
  },
  [AnswerEvaluation.Partial]: {
    translationKey: 'EVALUATION.PARTIAL',
    evaluation: AnswerEvaluation.Partial,
    value: EvaluationValue[AnswerEvaluation.Partial],
  },
  [AnswerEvaluation.Incorrect]: {
    translationKey: 'EVALUATION.INCORRECT',
    evaluation: AnswerEvaluation.Incorrect,
    value: EvaluationValue[AnswerEvaluation.Incorrect],
  },
  [AnswerEvaluation.Unassessed]: {
    translationKey: 'EVALUATION.UNASSESSED',
    evaluation: AnswerEvaluation.Unassessed,
    value: EvaluationValue[AnswerEvaluation.Unassessed],
  },
};
