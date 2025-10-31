export const constants = {
  breadcrumbs: (
    t: (key: string) => string,
    moduleSequenceNumber: number,
    moduleId: string,
    lessonSequenceNumber: number,
  ) => [
    { label: `${t('MODULE')} ${moduleSequenceNumber}`, href: `/learn/modules/${moduleId}` },
    { label: `${t('LESSON.ONE')} ${lessonSequenceNumber + 1}`, href: '' },
  ],
};
