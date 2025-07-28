import { NotFoundPage } from '@/shared/app-pages/notFound-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Not Found',
  description: 'Sorry, this page does not exist.',
};

export default function NotFound() {
  return <NotFoundPage />;
}
