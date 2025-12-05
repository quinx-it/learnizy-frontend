import { AnswerEvaluation } from '@/api/endpoints/test';

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
    evaluation: AnswerEvaluation.Correct,
    value: EvaluationValue[AnswerEvaluation.Correct],
  },
  [AnswerEvaluation.Partial]: {
    text: EvaluationTextLabel.Partial,
    evaluation: AnswerEvaluation.Partial,
    value: EvaluationValue[AnswerEvaluation.Partial],
  },
  [AnswerEvaluation.Incorrect]: {
    text: EvaluationTextLabel.Incorrect,
    evaluation: AnswerEvaluation.Incorrect,
    value: EvaluationValue[AnswerEvaluation.Incorrect],
  },
  [AnswerEvaluation.Unassessed]: {
    text: EvaluationTextLabel.Unassessed,
    evaluation: AnswerEvaluation.Unassessed,
    value: EvaluationValue[AnswerEvaluation.Unassessed],
  },
};
