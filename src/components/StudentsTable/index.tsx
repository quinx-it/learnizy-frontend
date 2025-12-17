'use client';

import { Box } from '@mui/material';
import { Copy, Edit3 } from 'lucide-react';
import Image from 'next/image';
import { useState, type FC } from 'react';

import { Text } from '@/components/Typography';
import { ROUTES } from '@/const/routes';
import { useTranslation } from '@/hooks';

import { type IStudentsTableProps } from './typings';

import {
  Cell,
  CopyButton,
  EditButton,
  EmptyMessage,
  HeaderCell,
  LinkCell,
  PersonIconWrapper,
  RowWrapper,
  SearchContainer,
  SearchInput,
  TableGrid,
  TableWrapper,
} from './styles';

const StudentsTable: FC<IStudentsTableProps> = (props) => {
  const { students } = props;
  const { t } = useTranslation();
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
          placeholder={t('COMMON_LABELS.SEARCH')}
        />
      </SearchContainer>

      <TableWrapper>
        <TableGrid>
          <HeaderCell hasBorder hasPadding={false}>
            <PersonIconWrapper>
              <Image src="/images/person-icon.svg" alt="Person icon" width={12} height={12} />
            </PersonIconWrapper>
          </HeaderCell>
          <HeaderCell hasBorder hasPadding={false}>
            <Text variant="m">{t('MENTOR.STUDENTS_TABLE.ID')}</Text>
          </HeaderCell>
          <HeaderCell hasBorder hasPadding>
            <Text variant="m">{t('MENTOR.STUDENTS_TABLE.FULL_NAME')}</Text>
          </HeaderCell>
          <HeaderCell hasBorder hasPadding={false}>
            <Text variant="m">{t('MENTOR.STUDENTS_TABLE.PROGRESS')}</Text>
          </HeaderCell>
          <HeaderCell hasBorder hasPadding>
            <Text variant="m">{t('MENTOR.STUDENTS_TABLE.CURRENT_MODULE')}</Text>
          </HeaderCell>
          <HeaderCell hasBorder hasPadding={false}>
            <Text variant="m">{t('MENTOR.STUDENTS_TABLE.CURRENT_LESSON')}</Text>
          </HeaderCell>
          <HeaderCell hasBorder={false} hasPadding={false}>
            <Text variant="m">{t('MENTOR.STUDENTS_TABLE.STATUS')}</Text>
          </HeaderCell>

          {filteredStudents.length > 0 ? (
            filteredStudents.map((row) => (
              <RowWrapper key={row.id}>
                <Cell hasBorder hasPadding={false}>
                  <EditButton variant="white" aria-label={t('MENTOR.STUDENTS_TABLE.EDIT')}>
                    <Edit3 size={18} />
                  </EditButton>
                </Cell>
                <Cell hasBorder hasPadding={false}>
                  <Text variant="m">{row.id}</Text>
                  <CopyButton variant="white">
                    <Copy cursor="pointer" size={16} />
                  </CopyButton>
                </Cell>
                <Cell hasBorder hasPadding>
                  <Text variant="m">{row.fullName}</Text>
                </Cell>
                <Cell hasBorder hasPadding={false}>
                  <Text variant="m">{row.progress}</Text>
                </Cell>
                <Cell hasBorder hasPadding>
                  <Text variant="m">{row.currentModule}</Text>
                </Cell>
                <Cell hasBorder hasPadding={false}>
                  <Text variant="m">{row.currentLesson}</Text>
                </Cell>
                <LinkCell href={`${ROUTES.MENTOR_STUDENTS}/${row.id}`}>
                  <Image
                    src="/images/arrow-right-icon.svg"
                    alt="Arrow right icon"
                    width={9}
                    height={16}
                    style={{ color: '#238BA7' }}
                  />
                </LinkCell>
              </RowWrapper>
            ))
          ) : (
            <EmptyMessage>{t('MENTOR.STUDENTS_TABLE.NOT_FOUND')}</EmptyMessage>
          )}
        </TableGrid>
      </TableWrapper>
    </Box>
  );
};

export default StudentsTable;
