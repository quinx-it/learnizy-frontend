export const constants = {
  breadcrumbs: (moduleSeqenceNumber: number, moduleId: string, lessonSequenceNumber: number) => [{ label: `Модуль ${moduleSeqenceNumber}`, href: `/learn/modules/${moduleId}` }, { label: `Урок ${lessonSequenceNumber + 1}`, href: '' }],
};