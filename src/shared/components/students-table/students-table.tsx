'use client'
import { routes } from '@/shared/constants';
import { Button } from '@/shared/ui/button';
import { ArrowRightIcon, PersonIcon } from '@/shared/ui/icons';
import { Text } from '@/shared/ui/typography';
import {Copy, Edit3 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Row = {
  id: string;
  name: string;
  progress: number;
  module: string;
  lesson: number;
  status: 'Проверено' | 'Тест' | 'Запись' | 'Пр. задание' | 'Экзамен';
};

const data: Row[] = [
  {
    id: '123456',
    name: 'Петров Петр Петрович',
    progress: 20,
    module: '1. Введение',
    lesson: 4,
    status: 'Проверено',
  },
  {
    id: '123456',
    name: 'Петров Петр Петрович',
    progress: 50,
    module: '1. Введение',
    lesson: 5,
    status: 'Тест',
  },
  {
    id: '123456',
    name: 'Петров Петр Петрович',
    progress: 10,
    module: '1. Введение',
    lesson: 3,
    status: 'Запись',
  },
  {
    id: '123456',
    name: 'Петров Петр Петрович',
    progress: 65,
    module: '1. Введение',
    lesson: 2,
    status: 'Пр. задание',
  },
  {
    id: '123456',
    name: 'Петров Петр Петрович',
    progress: 70,
    module: '1. Введение',
    lesson: 2,
    status: 'Экзамен',
  },
];

const statusColors: Record<Row['status'], string> = {
  Проверено: 'text-gray-600 bg-gray-600',
  Тест: 'text-yellow-500 bg-yellow-500',
  Запись: 'text-sky-500 bg-sky-500',
  'Пр. задание': 'text-purple-500 bg-purple-500',
  Экзамен: 'text-red-500 bg-red-500',
};

export const StudentsTable = () => {
  return (
    <div className="p-6">
      <div className="box-shadow overflow-x-auto rounded-md border">
        <div className="grid grid-cols-[60px_minmax(140px,1fr)_minmax(250px,2fr)_minmax(120px,1fr)_minmax(200px,2fr)_minmax(160px,1fr)_minmax(208px,1fr)] text-center">
          <div className="border-light bg-soft flex items-center justify-center border-r py-3">
            <Text variant="m"><PersonIcon className='w-4 h-4' /></Text>
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
          <div className="bg-soft border-light flex items-center justify-center">
            <Text variant="m">Статус</Text>
          </div>

          {data.map((row, i) => (
            <>
              <div
                key={`edit-${i}`}
                className="flex items-center justify-center border-t border-r py-3"
              >
                <Button
                  variant={'white'}
                  className="text-soft hover:bg-soft hover:text-light cursor-pointer border-none p-2"
                >
                  <Edit3 size={18} />
                </Button>
              </div>
              <div
                key={`id-${i}`}
                className="flex items-center justify-center gap-1 border-t border-r"
              >
                <Text variant="m">{row.id}</Text>
                <Button
                  variant={'white'}
                  className="cursor-pointer border-none p-1 hover:bg-transparent hover:text-black active:text-black!"
                >
                  <Copy cursor={'pointer'} size={16} />
                </Button>
              </div>
              <div
                key={`name-${i}`}
                className="flex items-center justify-center border-t border-r px-4"
              >
                <Text variant="m">{row.name}</Text>
              </div>
              <div
                key={`progress-${i}`}
                className="flex items-center justify-center border-t border-r"
              >
                <Text variant="m">{row.progress}%</Text>
              </div>
              <div
                key={`module-${i}`}
                className="flex items-center justify-center border-t border-r px-4"
              >
                <Text variant="m">{row.module}</Text>
              </div>
              <div
                key={`lesson-${i}`}
                className="flex items-center justify-center border-t border-r"
              >
                <Text variant="m">{row.lesson}</Text>
              </div>
              <Link
                href={`${routes.mentor.students}/studentId`}
                key={`status-${i}`}
                className="flex items-center justify-between gap-2 border-t px-4"
              >
                <div className="flex cursor-pointer items-center gap-2">
                  <span
                    className={`h-[9px] w-[9px] rounded-full ${statusColors[row.status].split(' ')[1]}`}
                  ></span>
                  <Text variant="m" className={statusColors[row.status].split(' ')[0]}>
                    {row.status}
                  </Text>
                </div>
                <ArrowRightIcon color="blue" />
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
