import { AnswerEvaluation } from '@/api/endpoints/test';

import {
  EvaluationTextCorrect,
  EvaluationTextIncorrect,
  EvaluationTextPartial,
  EvaluationTextPending,
} from './styles';

export enum EvaluationTextLabel {
  Correct = 'Верно',
  Partial = 'Частично верно',
  Incorrect = 'Неверно',
  Unassessed = 'Ответ находится на проверке',
}

export const EvaluationValue = {
  [AnswerEvaluation.Correct]: 1,
  [AnswerEvaluation.Partial]: 0.5,
  [AnswerEvaluation.Incorrect]: 0,
  [AnswerEvaluation.Unassessed]: 0,
};

export const evaluationMap = {
  [AnswerEvaluation.Correct]: {
    text: EvaluationTextLabel.Correct,
    component: EvaluationTextCorrect,
    value: EvaluationValue[AnswerEvaluation.Correct],
  },
  [AnswerEvaluation.Partial]: {
    text: EvaluationTextLabel.Partial,
    component: EvaluationTextPartial,
    value: EvaluationValue[AnswerEvaluation.Partial],
  },
  [AnswerEvaluation.Incorrect]: {
    text: EvaluationTextLabel.Incorrect,
    component: EvaluationTextIncorrect,
    value: EvaluationValue[AnswerEvaluation.Incorrect],
  },
  [AnswerEvaluation.Unassessed]: {
    text: EvaluationTextLabel.Unassessed,
    component: EvaluationTextPending,
    value: EvaluationValue[AnswerEvaluation.Unassessed],
  },
};
