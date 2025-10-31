import { NotFoundPage } from '@/pages/notFound-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Not Found',
  description: 'Sorry, this page does not exist.',
};

export default function GlobalNotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <NotFoundPage />
    </div>
  );
}
