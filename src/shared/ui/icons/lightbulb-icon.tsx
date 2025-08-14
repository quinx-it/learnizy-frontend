import { IconProps } from '@/shared/types';
import React from 'react';

export const LightbulbIcon = ({ color = 'currentColor', className }: IconProps) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15.4375 19.5V18.2813C15.4375 16.8086 17.0392 15.4157 18.0782 14.4219C19.5427 13.0219 20.3125 11.1409 20.3125 8.93753C20.3125 4.87503 17.0762 1.62503 13 1.62503C12.039 1.62235 11.0869 1.80966 10.1985 2.1762C9.31008 2.54274 8.5029 3.08127 7.82333 3.76083C7.14377 4.44039 6.60524 5.24758 6.2387 6.13599C5.87216 7.02439 5.68485 7.97649 5.68753 8.93753C5.68753 11.0622 6.49038 13.0706 7.9219 14.4219C8.9553 15.3974 10.5625 16.7934 10.5625 18.2813V19.5M11.375 24.375H14.625M10.5625 21.9375H15.4375M13 19.5V13"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.9297 12.1875C14.9297 12.1875 13.8374 13 13 13C12.1626 13 11.0703 12.1875 11.0703 12.1875"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
