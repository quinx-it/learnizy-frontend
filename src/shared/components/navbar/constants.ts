import {
  ProjectsIcon,
  APlusIcon,
  CubesMainIcon,
  DiscussionIcon,
  PersonIcon,
  StudentHatIcon,
} from '@shared/ui/icons'

export const constants = {
  links: [
    { href: '/learn', Icon: CubesMainIcon, label: 'Главная' },
    { href: '/learn/modules', Icon: StudentHatIcon, label: 'Модули' },
    { href: '/learn/knowledge-base', Icon: DiscussionIcon, label: 'База знаний' },
    { href: '/learn/exams', Icon: APlusIcon, label: 'Экзамены' },
    { href: '/learn/projects', Icon: ProjectsIcon, label: 'Проекты' },
    { href: '/learn/user-profile', Icon: PersonIcon, label: 'Профиль' },
  ],
}