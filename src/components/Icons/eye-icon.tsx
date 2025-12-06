import { Icon } from '@/components/Icon';
import { IIconProps } from '@/types';

type EyeIconPropsType = {
  open?: boolean;
};

export const EyeIcon = ({ className, open = false }: IIconProps & EyeIconPropsType) => {
  if (open) {
    return (
      <Icon className={className}>
        <svg
          width="22"
          height="16"
          viewBox="0 0 22 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 8C14 8.79565 13.6839 9.55871 13.1213 10.1213C12.5587 10.6839 11.7956 11 11 11C10.2044 11 9.44129 10.6839 8.87868 10.1213C8.31607 9.55871 8 8.79565 8 8C8 7.20435 8.31607 6.44129 8.87868 5.87868C9.44129 5.31607 10.2044 5 11 5C11.7956 5 12.5587 5.31607 13.1213 5.87868C13.6839 6.44129 14 7.20435 14 8Z"
            stroke="#0C0C0C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 8C2.6 3.903 6.336 1 11 1C15.664 1 19.4 3.903 21 8C19.4 12.097 15.664 15 11 15C6.336 15 2.6 12.097 1 8Z"
            stroke="#0C0C0C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Icon>
    );
  }

  return (
    <Icon className={className}>
      <svg
        width="22"
        height="18"
        viewBox="0 0 22 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.73 2.073C10.1516 2.02419 10.5756 1.99982 11 2C15.664 2 19.4 4.903 21 9C20.6126 9.99656 20.0893 10.9348 19.445 11.788M5.52 3.519C3.48 4.764 1.9 6.693 1 9C2.6 13.097 6.336 16 11 16C12.9321 16.0102 14.8292 15.484 16.48 14.48M8.88 6.88C8.6014 7.1586 8.3804 7.48935 8.22963 7.85335C8.07885 8.21736 8.00125 8.6075 8.00125 9.0015C8.00125 9.3955 8.07885 9.78564 8.22963 10.1496C8.3804 10.5137 8.6014 10.8444 8.88 11.123C9.1586 11.4016 9.48934 11.6226 9.85335 11.7734C10.2174 11.9242 10.6075 12.0018 11.0015 12.0018C11.3955 12.0018 11.7856 11.9242 12.1496 11.7734C12.5137 11.6226 12.8444 11.4016 13.123 11.123"
          stroke="#0C0C0C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M3 1L19 17" stroke="#0C0C0C" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </Icon>
  );
};
