import {
  ProjectsIcon,
  APlusIcon,
  CubesMainIcon,
  DiscussionIcon,
  PersonIcon,
  StudentHatIcon,
} from '@shared/ui/icons'
import { routes } from '@/shared/constants'

export const constants = {
  links: [
    { href: routes.homePage, Icon: CubesMainIcon, label: 'Главная' },
    { href: routes.modules, Icon: StudentHatIcon, label: 'Модули' },
    { href: routes.knowlegeBase, Icon: DiscussionIcon, label: 'База знаний' },
    { href: routes.exams, Icon: APlusIcon, label: 'Экзамены' },
    { href: routes.projects, Icon: ProjectsIcon, label: 'Проекты' },
    { href: routes.userProfile, Icon: PersonIcon, label: 'Профиль' },
  ],
}