import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getOrderClass = (index: number) => {
  if (index === 2) return 'min-[640px]:max-xl:order-4';
  if (index === 3) return 'min-[640px]:max-xl:order-3';
  return `${index + 1}`;
};
