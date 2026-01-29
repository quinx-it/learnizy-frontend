'use client';

import { type FC, useState, useMemo } from 'react';

import {
  useGetCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} from '@/api/endpoints/admin';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CourseCard } from '@/components/CourseCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/Dialog';
import ErrorSection from '@/components/ErrorSection';
import FullscreenLoader from '@/components/FullscreenLoader';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import { showToast } from '@/components/Toaster';
import { ROUTES } from '@/const/routes';
import { useTranslation } from '@/hooks';

import {
  BlueButtonSmall,
  CourseCardWrapper,
  CoursesGrid,
  CreateButtonWrapper,
  DialogContentWrapper,
  DialogFooterWrapper,
  FormContent,
  PageContainer,
  WhiteButton,
} from './styles';

const CoursesPage: FC = () => {
  const { t } = useTranslation();

  const queryParams = useMemo(() => ({ page: 0, size: 20 }), []);

  const { data: coursesData, isLoading, isError, refetch } = useGetCoursesQuery(queryParams);

  const [createCourse] = useCreateCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const openCreateModal = () => {
    setEditingCourseId(null);
    setTitle('');
    setDescription('');
    setModalOpen(true);
  };

  const openEditModal = (courseId: number) => {
    const course = coursesData?.content.find((c) => c.id === courseId);

    if (!course) return;

    setEditingCourseId(courseId);
    setTitle(course.title);
    setDescription(course.description);
    setModalOpen(true);
  };

  const handleSaveCourse = async () => {
    try {
      if (editingCourseId) {
        await updateCourse({
          id: editingCourseId,
          data: { title, description },
        }).unwrap();
      } else {
        await createCourse({ title, description }).unwrap();
      }

      setModalOpen(false);
      refetch();
    } catch {
      showToast('error', t('COMMON.ERROR'), t('COURSES_PAGE.ERROR_SAVE'));
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    try {
      await deleteCourse(courseId).unwrap();
      refetch();
    } catch {
      showToast('error', t('COMMON.ERROR'), t('COURSES_PAGE.ERROR_DELETE'));
    }
  };

  if (isLoading) return <FullscreenLoader />;

  if (isError) return <ErrorSection reset={refetch} />;

  return (
    <PageContainer>
      <Breadcrumbs
        rootLabel={t('BREADCRUMBS.COURSES')}
        rootHref={ROUTES.MENTOR_COURSES}
        rootDescription={t('BREADCRUMBS.COURSES_DESC')}
      />
      <CreateButtonWrapper>
        <BlueButtonSmall onClick={openCreateModal}>
          {t('COURSES_PAGE.CREATE_COURSE')}
        </BlueButtonSmall>
      </CreateButtonWrapper>

      {modalOpen && (
        <DialogContentWrapper>
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingCourseId
                    ? t('COURSES_PAGE.EDIT_COURSE')
                    : t('COURSES_PAGE.CREATE_NEW_COURSE')}
                </DialogTitle>
              </DialogHeader>

              <FormContent>
                <Input
                  placeholder={t('COURSES_PAGE.COURSE_TITLE')}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  placeholder={t('COURSES_PAGE.COURSE_DESCRIPTION')}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormContent>

              <DialogFooterWrapper>
                <DialogFooter>
                  <WhiteButton onClick={() => setModalOpen(false)}>
                    {t('COURSES_PAGE.CANCEL')}
                  </WhiteButton>
                  <BlueButtonSmall onClick={handleSaveCourse}>
                    {editingCourseId ? t('COURSES_PAGE.SAVE') : t('COURSES_PAGE.CREATE')}
                  </BlueButtonSmall>
                </DialogFooter>
              </DialogFooterWrapper>
            </DialogContent>
          </Dialog>
        </DialogContentWrapper>
      )}

      <CoursesGrid>
        {(coursesData?.content || []).map((course) => (
          <CourseCardWrapper key={course.id}>
            <CourseCard
              {...course}
              onEdit={() => openEditModal(course.id)}
              onDelete={() => handleDeleteCourse(course.id)}
            />
          </CourseCardWrapper>
        ))}
      </CoursesGrid>
    </PageContainer>
  );
};

export default CoursesPage;
