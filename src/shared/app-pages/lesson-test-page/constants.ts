import { LessonQuestionItemType } from '@/shared/components/lesson-question';
import { globalConstants, routes } from '@/shared/constants';

const { moduleLabel, lessonLabel } = globalConstants.rootBreadcrumbLabels;

export const constants = {
  title: 'Тест по уроку',
  description:
    'Пройдите короткий тест, чтобы закрепить материал и проверить понимание темы.\nНе спешите — внимательно читайте вопросы, ведь именно сейчас вы закрепляете знания,которые пригодятся на собеседовании.',
  questionAmount: ' 📋 Количество вопросов: ',
  procent: '🎯 Минимальный процент для прохождения:',
  breadcrumbs: (moduleId: string, lessonId: string) => [
    { label: `${moduleLabel} ${moduleId}`, href: `${routes.user.modules}/${moduleId}` },
    {
      label: `${lessonLabel} ${lessonId}`,
      href: `${routes.user.modules}/${moduleId}/${lessonId}`,
    },
    { label: `Тест по уроку`, href: '' },
  ],

  questions: [
    {
      type: 'checkbox',
      index: 1,
      totalQuestions: 3,
      question: {
        text: 'Выберите правильные варианты ответа',
        questionId: 41,
        options: [
          { id: 'opt1', label: 'Вариант 1', value: 'option1' },
          { id: 'opt2', label: 'Вариант 2', value: 'option2' },
          { id: 'opt3', label: 'Вариант 3', value: 'option3' },
          { id: 'opt4', label: 'Вариант 4', value: 'option4' },
        ],
      },
    },
    {
      type: 'field',
      index: 2,
      totalQuestions: 3,
      question: {
        text: 'Введите ваш ответ',
        questionId: 42,
        options: [
          { id: 'opt5', label: 'Вариант 1', value: 'option5' },
          { id: 'opt6', label: 'Вариант 2', value: 'option6' },
          { id: 'opt7', label: 'Вариант 3', value: 'option7' },
          { id: 'opt8', label: 'Вариант 4', value: 'option8' },
        ],
      },
    },
    {
      index: 3,
      totalQuestions: 3,
      question: {
        text: 'Стандартный вопрос',
        questionId: 43,
        options: [
          { id: 'opt9', label: 'Вариант 1', value: 'option9' },
          { id: 'opt10', label: 'Вариант 2', value: 'option10' },
          { id: 'opt11', label: 'Вариант 3', value: 'option11' },
          { id: 'opt12', label: 'Вариант 4', value: 'option12' },
        ],
      },
    },
  ] as LessonQuestionItemType[],
};
