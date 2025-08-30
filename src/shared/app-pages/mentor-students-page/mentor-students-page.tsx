import { StudentsTable } from '@/shared/components/students-table/students-table';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import React from 'react';

export const MentorStudentsPage = () => {
  return (
    <div>
      <Breadcrumbs rootLabel={'Главная'} rootDescription="Ментор" />
      <StudentsTable />
    </div>
  );
};
