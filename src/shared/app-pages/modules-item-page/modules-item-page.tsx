import React from 'react';

type ModuleItemPageProps = {
  id: string;
};

export const ModuleItemPage = ({ id }: ModuleItemPageProps) => {
  return (
    <>
      <h1>Модуль {id}</h1>
    </>
  );
};
