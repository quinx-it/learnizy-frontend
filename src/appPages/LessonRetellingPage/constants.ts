import { routes } from '@/constants';
import { globalConstants } from '@/constants';

const { moduleLabel, lessonLabel, retellingLabel } = globalConstants.rootBreadcrumbLabels;

export const constants = {
  breadcrumbs: (
    moduleSequenceOrder: number,
    moduleId: string,
    lessonId: string,
    sequenceOrder: number,
  ) => [
    { label: `${moduleLabel} ${moduleSequenceOrder}`, href: `${routes.user.modules}/${moduleId}` },
    {
      label: `${lessonLabel} ${sequenceOrder}`,
      href: `${routes.user.modules}/${moduleId}/${lessonId}`,
    },
    { label: retellingLabel, href: '' },
  ],
};
