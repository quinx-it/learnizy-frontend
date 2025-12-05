import { styled } from '@mui/material';

export const StyledHeading = styled('h3', {
  shouldForwardProp: (prop) => prop !== 'variant',
})<{ variant?: string | null }>(({ variant = 'xl' }) => {
  const getStyles = () => {
    switch (variant) {
      case 'xl':
        return {
          fontSize: '24px',
          lineHeight: '33px',
          fontWeight: 500,
        };
      case '2xl':
        return {
          fontSize: '28px',
          lineHeight: '38px',
          fontWeight: 500,
        };
      case '3xl':
        return {
          fontSize: '32px',
          lineHeight: '44px',
          fontWeight: 500,
        };
      case '4xl':
        return {
          fontSize: '36px',
          lineHeight: '49px',
          fontWeight: 500,
        };
      case '5xl':
        return {
          fontSize: '40px',
          lineHeight: '55px',
          fontWeight: 500,
        };
      case '6xl':
        return {
          fontSize: '44px',
          lineHeight: '60px',
          fontWeight: 500,
        };
      case '7xl':
        return {
          fontSize: '52px',
          lineHeight: '71px',
          fontWeight: 500,
        };
      case 'xl-bold':
        return {
          fontSize: '24px',
          lineHeight: '26px',
          fontWeight: 700,
        };
      case '2xl-bold':
        return {
          fontSize: '28px',
          lineHeight: '32px',
          fontWeight: 700,
        };
      case '3xl-bold':
        return {
          fontSize: '32px',
          lineHeight: '36px',
          fontWeight: 700,
        };
      case '4xl-bold':
        return {
          fontSize: '36px',
          lineHeight: '40px',
          fontWeight: 700,
        };
      case '5xl-bold':
        return {
          fontSize: '40px',
          lineHeight: '46px',
          fontWeight: 700,
        };
      case '6xl-bold':
        return {
          fontSize: '44px',
          lineHeight: '48px',
          fontWeight: 700,
        };
      case '7xl-bold':
        return {
          fontSize: '52px',
          lineHeight: '58px',
          fontWeight: 700,
        };
      default:
        return {
          fontSize: '24px',
          lineHeight: '33px',
          fontWeight: 500,
        };
    }
  };

  return {
    transition: 'color 0.2s ease-in-out',
    margin: 0,
    ...getStyles(),
  };
});

export const StyledText = styled('p', {
  shouldForwardProp: (prop) => prop !== 'variant',
})<{ variant?: string | null }>(({ variant = 's' }) => {
  const getStyles = () => {
    switch (variant) {
      case 's':
        return {
          fontSize: '12px',
          lineHeight: '16px',
          fontWeight: 500,
        };
      case 'm':
        return {
          fontSize: '16px',
          lineHeight: '22px',
          fontWeight: 500,
        };
      case 'l':
        return {
          fontSize: '20px',
          lineHeight: '27px',
          fontWeight: 500,
        };
      case 's-bold':
        return {
          fontSize: '12px',
          lineHeight: '14px',
          fontWeight: 700,
        };
      case 'm-bold':
        return {
          fontSize: '16px',
          lineHeight: '22px',
          fontWeight: 700,
        };
      case 'l-bold':
        return {
          fontSize: '20px',
          lineHeight: '22px',
          fontWeight: 700,
        };
      case 's-italic':
        return {
          fontSize: '12px',
          lineHeight: '16px',
          fontStyle: 'italic',
          fontWeight: 500,
        };
      case 'm-italic':
        return {
          fontSize: '16px',
          lineHeight: '22px',
          fontStyle: 'italic',
          fontWeight: 500,
        };
      case 'l-italic':
        return {
          fontSize: '20px',
          lineHeight: '27px',
          fontStyle: 'italic',
          fontWeight: 500,
        };
      case 's-bold-italic':
        return {
          fontSize: '12px',
          lineHeight: '16px',
          fontStyle: 'italic',
          fontWeight: 700,
        };
      case 'm-bold-italic':
        return {
          fontSize: '16px',
          lineHeight: '22px',
          fontStyle: 'italic',
          fontWeight: 700,
        };
      case 'l-bold-italic':
        return {
          fontSize: '20px',
          lineHeight: '27px',
          fontStyle: 'italic',
          fontWeight: 700,
        };
      default:
        return {
          fontSize: '12px',
          lineHeight: '16px',
          fontWeight: 500,
        };
    }
  };

  return {
    transition: 'color 0.2s ease-in-out',
    margin: 0,
    ...getStyles(),
  };
});
