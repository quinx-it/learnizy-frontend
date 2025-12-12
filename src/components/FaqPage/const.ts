import { routes } from '@/const';
import { globalConstants } from '@/const/constants';
import { type TranslationFunctionType } from '@/types';

export const createConstants = (t: TranslationFunctionType) => ({
  breadCrumbs: [
    {
      label: globalConstants.rootBreadcrumbLabels.faqLabel,
      href: routes.user.frequentlyAskedQuestions,
    },
  ],
  accordionItems: [
    {
      value: 'item-1',
      heading: t('FAQ.PROGRESS_QUESTION'),
      content: t('FAQ.PROGRESS_ANSWER'),
      bgColor: 'bg-blue-100',
      iconColor: 'text-cyan-700',
    },
    {
      value: 'item-2',
      heading: t('FAQ.PROGRESS_QUESTION'),
      content: t('FAQ.PROGRESS_ANSWER'),
      bgColor: 'bg-violet-100',
      textColor: 'text-violet-600',
      iconColor: 'text-violet-600',
    },
    {
      value: 'item-3',
      heading: t('FAQ.PROGRESS_QUESTION'),
      content: t('FAQ.PROGRESS_ANSWER'),
      bgColor: 'bg-yellow-100',
      iconColor: 'text-orange-500',
    },
    {
      value: 'item-4',
      heading: t('FAQ.PROGRESS_QUESTION'),
      content: t('FAQ.PROGRESS_ANSWER'),
      bgColor: 'bg-blue-100',
      iconColor: 'text-cyan-700',
    },
    {
      value: 'item-5',
      heading: t('FAQ.PROGRESS_QUESTION'),
      content: t('FAQ.PROGRESS_ANSWER'),
      bgColor: 'bg-violet-100',
      textColor: 'text-violet-600',
      iconColor: 'text-violet-600',
    },
  ],
});
