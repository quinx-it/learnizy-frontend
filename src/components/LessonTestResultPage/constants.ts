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
  [AnswerEvaluation.CORRECT]: 1,
  [AnswerEvaluation.PARTIAL]: 0.5,
  [AnswerEvaluation.INCORRECT]: 0,
  [AnswerEvaluation.UNASSESSED]: 0,
};

export const evaluationMap = {
  [AnswerEvaluation.CORRECT]: {
    text: EvaluationTextLabel.CORRECT,
    component: EvaluationTextCorrect,
    value: EvaluationValue[AnswerEvaluation.CORRECT],
  },
  [AnswerEvaluation.PARTIAL]: {
    text: EvaluationTextLabel.PARTIAL,
    component: EvaluationTextPartial,
    value: EvaluationValue[AnswerEvaluation.PARTIAL],
  },
  [AnswerEvaluation.INCORRECT]: {
    text: EvaluationTextLabel.INCORRECT,
    component: EvaluationTextIncorrect,
    value: EvaluationValue[AnswerEvaluation.INCORRECT],
  },
  [AnswerEvaluation.UNASSESSED]: {
    text: EvaluationTextLabel.UNASSESSED,
    component: EvaluationTextPending,
    value: EvaluationValue[AnswerEvaluation.UNASSESSED],
  },
};
