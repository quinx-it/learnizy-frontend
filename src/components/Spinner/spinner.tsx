import { FC } from 'react';

import { SpinnerVariantPropsType, SpinnerPropsType } from './typings';

const Circle = ({ size = 24, className = '', ...props }: SpinnerVariantPropsType) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`animate-spin ${className}`}
    {...props}
  >
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke="currentColor"
      strokeWidth="10"
      fill="none"
      strokeLinecap="round"
      strokeDasharray="200"
      strokeDashoffset="100"
    />
  </svg>
);

const Ring = ({ size = 24, className = '', ...props }: SpinnerVariantPropsType) => (
  <svg
    height={size}
    className={className}
    stroke="currentColor"
    viewBox="0 0 44 44"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Loading...</title>
    <g fill="none" fillRule="evenodd" strokeWidth="2">
      <circle cx="22" cy="22" r="1">
        <animate
          attributeName="r"
          begin="0s"
          calcMode="spline"
          dur="1.8s"
          keySplines="0.165, 0.84, 0.44, 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
          values="1; 20"
        />
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          calcMode="spline"
          dur="1.8s"
          keySplines="0.3, 0.61, 0.355, 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
          values="1; 0"
        />
      </circle>
      <circle cx="22" cy="22" r="1">
        <animate
          attributeName="r"
          begin="-0.9s"
          calcMode="spline"
          dur="1.8s"
          keySplines="0.165, 0.84, 0.44, 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
          values="1; 20"
        />
        <animate
          attributeName="stroke-opacity"
          begin="-0.9s"
          calcMode="spline"
          dur="1.8s"
          keySplines="0.3, 0.61, 0.355, 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
          values="1; 0"
        />
      </circle>
    </g>
  </svg>
);

export const Spinner: FC<SpinnerPropsType> = (props) => {
  const { variant, className, ...restProps } = props;

  switch (variant) {
    case 'ring':
      return <Ring {...restProps} className={className} />;
    case 'circle':
      return <Circle {...restProps} className={className} />;
    default:
      return <Circle {...restProps} className={className} />;
  }
};
