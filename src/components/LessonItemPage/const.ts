const getModulesBasePath = (courseId?: number) =>
  courseId != null ? `/learn/courses/${courseId}/modules` : '/learn/modules';

export const constants = {
  breadcrumbs: (
    t: (key: string) => string,
    moduleSequenceNumber: number,
    moduleId: string,
    lessonSequenceNumber: number,
    courseId?: number,
  ) => {
    const base = getModulesBasePath(courseId);

    return [
      { label: `${t('COMMON.MODULE')} ${moduleSequenceNumber}`, href: `${base}/${moduleId}` },
      { label: `${t('LESSON.ONE')} ${lessonSequenceNumber + 1}`, href: '' },
    ];
  },
};
