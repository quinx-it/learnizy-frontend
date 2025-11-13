import { AnswerEvaluation } from '@/api/endpoints/test';

import {
  EvaluationTextCorrect,
  EvaluationTextIncorrect,
  EvaluationTextPartial,
  EvaluationTextPending,
} from './styles';

export enum EvaluationTextLabel {
  CORRECT = 'Верно',
  PARTIAL = 'Частично верно',
  INCORRECT = 'Неверно',
  UNASSESSED = 'Ответ находится на проверке',
}

export const EvaluationValue = {
  CORRECT: 1,
  PARTIAL: 0.5,
  INCORRECT: 0,
  UNASSESSED: 0,
} as const;

export const evaluationMap = {
  [AnswerEvaluation.CORRECT]: {
    text: EvaluationTextLabel.CORRECT,
    component: EvaluationTextCorrect,
    value: EvaluationValue.CORRECT,
  },
  [AnswerEvaluation.PARTIAL]: {
    text: EvaluationTextLabel.PARTIAL,
    component: EvaluationTextPartial,
    value: EvaluationValue.PARTIAL,
  },
  [AnswerEvaluation.INCORRECT]: {
    text: EvaluationTextLabel.INCORRECT,
    component: EvaluationTextIncorrect,
    value: EvaluationValue.INCORRECT,
  },
  [AnswerEvaluation.UNASSESSED]: {
    text: EvaluationTextLabel.UNASSESSED,
    component: EvaluationTextPending,
    value: EvaluationValue.UNASSESSED,
  },
} as const;
