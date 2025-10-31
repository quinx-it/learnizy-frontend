import { routes } from '@/shared/constants';
import { globalConstants } from '@/shared/constants/constants';

export const FAQ_SEO = {
  ru: {
    title: 'Частые вопросы о подготовке к собеседованиям и гарантии трудоустройства',
    description:
      'Ответы на вопросы о подготовке к IT-собеседованиям в Learnizy: длительность обучения, гарантии трудоустройства, модель ISA, работа с менторами, AI-тренажер.',
    keywords:
      'часто задаваемые вопросы learnizy, isa модель оплаты, гарантия трудоустройства java, ai тренажер собеседования, ментор java разработки, сроки обучения java',
    ogTitle:
      'Узнай все о процессе обучения, гарантиях трудоустройства и модели ISA. Прозрачные условия и ответы на частые вопросы.',
    ogDescription:
      'Всё о модели ISA, гарантии трудоустройства, AI-тренажере и поддержке менторов в Learnizy',
    fullUrl: 'https://learnizy.com/faq',
    baseUrLClean: 'https://learnizy.com/faq',
    ogLocale: 'ru_RU',
  },
  en: {
    title: 'Frequently Asked Questions about Interview Preparation and Job Guarantee',
    description:
      'Answers to questions about IT interview preparation at Learnizy: course duration, job guarantee, ISA model, mentor support, AI simulator.',
    keywords:
      'faq learnizy, isa payment model, java job guarantee, ai interview simulator, java mentor, course duration',
    ogTitle:
      'Learn everything about the learning process, job guarantees, and the ISA model. Transparent conditions and answers to common questions.',
    ogDescription:
      'All about ISA model, job guarantee, AI simulator, and mentor support at Learnizy',
    fullUrl: 'https://learnizy.com/en/faq',
    baseUrLClean: 'https://learnizy.com/en/faq',
    ogLocale: 'en_US',
  },
};

export const constants = {
  breadCrumbs: [
    {
      label: globalConstants.rootBreadcrumbLabels.faqLabel,
      href: routes.user.frequentlyAskedQuestions,
    },
  ],
  accordionItems: [
    {
      value: 'item-1',
      heading: 'Как сохраняется мой прогресс?',
      content:
        'Прогресс сохраняется автоматически. Вы можете выйти в любой момент и вернуться — система запомнит, где вы остановились.',
      bgColor: 'bg-blue-100',
      iconColor: 'text-cyan-700',
    },
    {
      value: 'item-2',
      heading: 'Как сохраняется мой прогресс?',
      content:
        'Прогресс сохраняется автоматически. Вы можете выйти в любой момент и вернуться — система запомнит, где вы остановились.',
      bgColor: 'bg-violet-100',
      textColor: 'text-violet-600',
      iconColor: 'text-violet-600',
    },
    {
      value: 'item-3',
      heading: 'Как сохраняется мой прогресс?',
      content:
        'Прогресс сохраняется автоматически. Вы можете выйти в любой момент и вернуться — система запомнит, где вы остановились.',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-orange-500',
    },
    {
      value: 'item-4',
      heading: 'Как сохраняется мой прогресс?',
      content:
        'Прогресс сохраняется автоматически. Вы можете выйти в любой момент и вернуться — система запомнит, где вы остановились.',
      bgColor: 'bg-blue-100',
      iconColor: 'text-cyan-700',
    },
    {
      value: 'item-5',
      heading: 'Как сохраняется мой прогресс?',
      content:
        'Прогресс сохраняется автоматически. Вы можете выйти в любой момент и вернуться — система запомнит, где вы остановились.',
      bgColor: 'bg-violet-100',
      textColor: 'text-violet-600',
      iconColor: 'text-violet-600',
    },
  ],
};
