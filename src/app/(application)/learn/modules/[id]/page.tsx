'use client';
import { useParams } from 'next/navigation';

const ModuleItemPage = () => {
  const params = useParams(); // { id: string }
  const { id } = params;

  return (
    <>
      <h1>Модуль {id}</h1>
    </>
  );
};

export default ModuleItemPage;
