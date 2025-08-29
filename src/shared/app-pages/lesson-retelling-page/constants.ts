import { routes } from "@/shared/constants";
import { globalConstants } from '@shared/constants'

const { moduleLabel, lessonLabel, retellingLabel } = globalConstants.rootBreadcrumbLabels

export const constants = {
  breadcrumbs: (moduleSequenceOrder: number, lessonSequenceOrder: number) => [
    { label: `${moduleLabel} ${moduleSequenceOrder}`, href: `${routes.user.modules}/${moduleSequenceOrder}` },
    {
      label: `${lessonLabel} ${lessonSequenceOrder}`,
      href: `${routes.user.modules}/${moduleSequenceOrder}/${lessonSequenceOrder}`,
    },
    { label: retellingLabel, href: '' },
  ],
};