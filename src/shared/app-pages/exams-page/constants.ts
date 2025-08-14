import { ExamCardProps, ExamStatus } from "./types";

export const examsMock: Array<ExamCardProps> = [
  {
    exam: {
      title: 'Экзамен по модулю 1',
      description: 'Введение',
      questions: 15,
      time: 20,
    },
    status: ExamStatus.Completed,
  },
  {
    exam: {
      title: 'Экзамен по модулю 2',
      description: 'Введение',
      questions: 15,
      time: 20,
    },
    status: ExamStatus.Failed,
  },
  {
    exam: {
      title: 'Экзамен по модулю 3',
      description: 'Введение',
      questions: 15,
      time: 20,
    },
    status: ExamStatus.Available,
  },
  {
    exam: {
      title: 'Экзамен по модулю 4',
      description: 'Введение',
      questions: 15,
      time: 20,
    },
    status: ExamStatus.Unavailable,
  },
]