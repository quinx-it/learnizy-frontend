'use client';

import { Box } from '@mui/material';
import { Copy, Edit3 } from 'lucide-react';
import { useState, FC } from 'react';

import { ArrowRightIcon, PersonIcon } from '@/components/Icons';
import { Text } from '@/components/Typography';
import { routes } from '@/constants';

import { IStudentsTableProps } from './typings';

import {
  Cell,
  CopyButton,
  EditButton,
  EmptyMessage,
  HeaderCell,
  LinkCell,
  RowWrapper,
  SearchContainer,
  SearchInput,
  TableGrid,
  TableWrapper,
} from './styles';

const StudentsTable: FC<IStudentsTableProps> = (props) => {
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
    <Box>
      <SearchContainer>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поиск..."
        />
      </SearchContainer>

      <TableWrapper>
        <TableGrid>
          <HeaderCell $hasBorder $hasPadding={false}>
            <Text variant="m">
              <PersonIcon className="h-4 w-4" />
            </Text>
          </HeaderCell>
          <HeaderCell $hasBorder $hasPadding={false}>
            <Text variant="m">ID</Text>
          </HeaderCell>
          <HeaderCell $hasBorder $hasPadding>
            <Text variant="m">ФИО</Text>
          </HeaderCell>
          <HeaderCell $hasBorder $hasPadding={false}>
            <Text variant="m">Прогресс</Text>
          </HeaderCell>
          <HeaderCell $hasBorder $hasPadding>
            <Text variant="m">Текущий модуль</Text>
          </HeaderCell>
          <HeaderCell $hasBorder $hasPadding={false}>
            <Text variant="m">Текущий урок</Text>
          </HeaderCell>
          <HeaderCell $hasBorder={false} $hasPadding={false} />

          {filteredStudents.length > 0 ? (
            filteredStudents.map((row) => (
              <RowWrapper key={row.id}>
                <Cell $hasBorder $hasPadding={false}>
                  <EditButton variant="white">
                    <Edit3 size={18} />
                  </EditButton>
                </Cell>
                <Cell $hasBorder $hasPadding={false}>
                  <Text variant="m">{row.id}</Text>
                  <CopyButton variant="white">
                    <Copy cursor="pointer" size={16} />
                  </CopyButton>
                </Cell>
                <Cell $hasBorder $hasPadding>
                  <Text variant="m">{row.fullName}</Text>
                </Cell>
                <Cell $hasBorder $hasPadding={false}>
                  <Text variant="m">{row.progress}</Text>
                </Cell>
                <Cell $hasBorder $hasPadding>
                  <Text variant="m">{row.currentModule}</Text>
                </Cell>
                <Cell $hasBorder $hasPadding={false}>
                  <Text variant="m">{row.currentLesson}</Text>
                </Cell>
                <LinkCell href={`${routes.mentor.students}/${row.id}`}>
                  <ArrowRightIcon color="blue" />
                </LinkCell>
              </RowWrapper>
            ))
          ) : (
            <EmptyMessage>Студенты не найдены.</EmptyMessage>
          )}
        </TableGrid>
      </TableWrapper>
    </Box>
  );
};

export default StudentsTable;
