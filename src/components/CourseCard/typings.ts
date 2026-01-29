import { type MouseEvent } from 'react';

import { type ICourseResponse } from '@/api/endpoints/admin';

export interface ICourseCardProps extends ICourseResponse {
  className?: string;
  onEdit?: (e: MouseEvent) => void;
  onDelete?: (e: MouseEvent) => void;
}
