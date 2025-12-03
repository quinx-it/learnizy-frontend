import { AnswerEvaluation } from '@/api/endpoints/test';

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
    evaluation: AnswerEvaluation.CORRECT,
    value: EvaluationValue[AnswerEvaluation.CORRECT],
  },
  [AnswerEvaluation.PARTIAL]: {
    text: EvaluationTextLabel.PARTIAL,
    evaluation: AnswerEvaluation.PARTIAL,
    value: EvaluationValue[AnswerEvaluation.PARTIAL],
  },
  [AnswerEvaluation.INCORRECT]: {
    text: EvaluationTextLabel.INCORRECT,
    evaluation: AnswerEvaluation.INCORRECT,
    value: EvaluationValue[AnswerEvaluation.INCORRECT],
  },
  [AnswerEvaluation.UNASSESSED]: {
    text: EvaluationTextLabel.UNASSESSED,
    evaluation: AnswerEvaluation.UNASSESSED,
    value: EvaluationValue[AnswerEvaluation.UNASSESSED],
  },
};
