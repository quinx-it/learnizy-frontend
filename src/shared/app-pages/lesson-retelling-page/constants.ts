import { routes } from '@/shared/constants';
import { globalConstants } from '@/shared/constants';

const { moduleLabel, lessonLabel, retellingLabel } = globalConstants.rootBreadcrumbLabels;

export const constants = {
  breadcrumbs: (moduleId: string, lessonId: string) => [
    { label: `${moduleLabel} ${moduleId}`, href: `${routes.user.modules}/${moduleId}` },
    { label: `${lessonLabel} ${lessonId}`, href: `${routes.user.modules}/${moduleId}/${lessonId}` },
    { label: retellingLabel, href: '' },
  ],
};
