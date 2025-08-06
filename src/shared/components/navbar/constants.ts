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
    { href: '/', Icon: CubesMainIcon, label: 'Главная' },
    { href: '/modules', Icon: StudentHatIcon, label: 'Модули' },
    { href: '/learn-base', Icon: DiscussionIcon, label: 'База знаний' },
    { href: '/exams', Icon: APlusIcon, label: 'Экзамены' },
    { href: '/projects', Icon: ProjectsIcon, label: 'Проекты' },
    { href: '/user-profile', Icon: PersonIcon, label: 'Профиль' },
  ],
}