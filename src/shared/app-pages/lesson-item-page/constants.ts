import { useTranslation } from 'react-i18next';

export const constants = {
  breadcrumbs: (moduleSequenceNumber: number, moduleId: string, lessonSequenceNumber: number) => {
    const { t } = useTranslation();

    return [
      {
        label: `${t('MODULE')} ${moduleSequenceNumber}`,
        href: `/learn/modules/${moduleId}`,
      },
      { label: `${t('LESSON.ONE')} ${lessonSequenceNumber + 1}`, href: '' },
    ];
  },
};
