import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { constants } from './constants';

const ApplicationHomePage = () => {
  return (
    <>
      <Breadcrumbs rootDescription={constants.main.description} />
    </>
  );
};

export default ApplicationHomePage;
