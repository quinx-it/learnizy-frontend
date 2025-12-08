import { AnswerEvaluation } from '@/api/endpoints/test';

import {
  EvaluationTextCorrect,
  EvaluationTextIncorrect,
  EvaluationTextPartial,
  EvaluationTextPending,
} from './styles';

export const EvaluationValue = {
  [AnswerEvaluation.Correct]: 1,
  [AnswerEvaluation.Partial]: 0.5,
  [AnswerEvaluation.Incorrect]: 0,
  [AnswerEvaluation.Unassessed]: 0,
};

export const evaluationMap = {
  [AnswerEvaluation.Correct]: {
    translationKey: 'EVALUATION.CORRECT',
    component: EvaluationTextCorrect,
    value: EvaluationValue[AnswerEvaluation.Correct],
  },
  [AnswerEvaluation.Partial]: {
    translationKey: 'EVALUATION.PARTIAL',
    component: EvaluationTextPartial,
    value: EvaluationValue[AnswerEvaluation.Partial],
  },
  [AnswerEvaluation.Incorrect]: {
    translationKey: 'EVALUATION.INCORRECT',
    component: EvaluationTextIncorrect,
    value: EvaluationValue[AnswerEvaluation.Incorrect],
  },
  [AnswerEvaluation.Unassessed]: {
    translationKey: 'EVALUATION.UNASSESSED',
    component: EvaluationTextPending,
    value: EvaluationValue[AnswerEvaluation.Unassessed],
  },
};
