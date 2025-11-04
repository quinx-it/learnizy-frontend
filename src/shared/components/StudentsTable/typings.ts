export type StudentType = {
  id: number;
  fullName: string;
  progress: string;
  currentModule: string;
  currentLesson: number;
};

export type RowType = StudentType & {
  status?: 'Проверено' | 'Тест' | 'Запись' | 'Пр. задание' | 'Экзамен';
};

export interface IStudentsTableProps {
  students: RowType[];
}
