'use client';
import { routes } from '@/shared/constants';
import { Button } from '@/shared/ui/Button';
import { ArrowRightIcon, PersonIcon } from '@/shared/ui/icons';
import { Text } from '@/shared/ui/Typography';
import { Copy, Edit3 } from 'lucide-react';
import Link from 'next/link';
import { useState, FC } from 'react';
import { IStudentsTableProps } from './typings';

export const StudentsTable: FC<IStudentsTableProps> = (props) => {
  const { students } = props;
  const [searchTerm, setSearchTerm] = useState('');

  const lowercasedFilter = searchTerm.toLowerCase();
  const filteredStudents = !searchTerm
    ? students
    : students.filter((student) =>
        Object.values(student).some((value) =>
          String(value).toLowerCase().includes(lowercasedFilter),
        ),
      );

  return (
    <div>
      <div className="relative mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поиск..."
          className="w-full max-w-sm rounded-md border bg-white py-2 pr-4 pl-10 focus:outline-none"
        />
      </div>

      <div className="box-shadow overflow-x-auto rounded-md border">
        <div className="grid grid-cols-[60px_minmax(140px,1fr)_minmax(250px,2fr)_minmax(120px,1fr)_minmax(200px,2fr)_minmax(160px,1fr)_minmax(208px,1fr)] text-center">
          <div className="border-light bg-soft flex items-center justify-center border-r py-3">
            <Text variant="m">
              <PersonIcon className="h-4 w-4" />
            </Text>
          </div>
          <div className="border-light bg-soft flex items-center justify-center border-r">
            <Text variant="m">ID</Text>
          </div>
          <div className="bg-soft border-light flex items-center justify-center border-r px-4">
            <Text variant="m">ФИО</Text>
          </div>
          <div className="border-light bg-soft flex items-center justify-center border-r">
            <Text variant="m">Прогресс</Text>
          </div>
          <div className="bg-soft border-light flex items-center justify-center border-r px-4">
            <Text variant="m">Текущий модуль</Text>
          </div>
          <div className="border-light bg-soft flex items-center justify-center border-r">
            <Text variant="m">Текущий урок</Text>
          </div>
          <div className="bg-soft border-light flex items-center justify-center" />

          {filteredStudents.length > 0 ? (
            filteredStudents.map((row) => (
              <>
                <div className="flex items-center justify-center border-t border-r py-3">
                  <Button
                    variant="white"
                    className="text-soft hover:bg-soft hover:text-light cursor-pointer border-none p-2"
                  >
                    <Edit3 size={18} />
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-1 border-t border-r">
                  <Text variant="m">{row.id}</Text>
                  <Button
                    variant={'white'}
                    className="cursor-pointer border-none p-1 hover:bg-transparent hover:text-black active:text-black!"
                  >
                    <Copy cursor={'pointer'} size={16} />
                  </Button>
                </div>
                <div className="flex items-center justify-center border-t border-r px-4">
                  <Text variant="m">{row.fullName}</Text>
                </div>
                <div className="flex items-center justify-center border-t border-r">
                  <Text variant="m">{row.progress}</Text>
                </div>
                <div className="flex items-center justify-center border-t border-r px-4">
                  <Text variant="m">{row.currentModule}</Text>
                </div>
                <div className="flex items-center justify-center border-t border-r">
                  <Text variant="m">{row.currentLesson}</Text>
                </div>
                <Link
                  href={`${routes.mentor.students}/${row.id}`}
                  className="flex items-center justify-between gap-2 border-t px-4"
                >
                  <div className="flex cursor-pointer items-center gap-2"></div>
                  <ArrowRightIcon color="blue" />
                </Link>
              </>
            ))
          ) : (
            <div className="col-span-full border-t py-8 text-center text-gray-500">
              Студенты не найдены.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
