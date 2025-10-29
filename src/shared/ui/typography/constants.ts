import { cva } from 'class-variance-authority';

export const headingVariants = cva('leading-normal transition-colors', {
  variants: {
    variant: {
      xl: 'text-[24px] leading-[33px] font-medium',
      '2xl': 'text-[28px] leading-[38px] font-medium',
      '3xl': 'text-[32px] leading-[44px] font-medium',
      '4xl': 'text-[36px] leading-[49px] font-medium',
      '5xl': 'text-[40px] leading-[55px] font-medium',
      '6xl': 'text-[44px] leading-[60px] font-medium',
      '7xl': 'text-[52px] leading-[71px] font-medium',

      'xl-bold': 'text-[24px] leading-[26px] font-bold',
      '2xl-bold': 'text-[28px] leading-[32px] font-bold',
      '3xl-bold': 'text-[32px] leading-[36px] font-bold',
      '4xl-bold': 'text-[36px] leading-[40px] font-bold',
      '5xl-bold': 'text-[40px] leading-[46px] font-bold',
      '6xl-bold': 'text-[44px] leading-[48px] font-bold',
      '7xl-bold': 'text-[52px] leading-[58px] font-bold',
    },
  },
  defaultVariants: {
    variant: 'xl',
  },
});

export const textVariants = cva('leading-normal transition-colors', {
  variants: {
    variant: {
      s: 'text-[12px] leading-[16px] font-medium',
      m: 'text-[16px] leading-[22px] font-medium',
      l: 'text-[20px] leading-[27px] font-medium',

      's-bold': 'text-[12px] leading-[14px] font-bold',
      'm-bold': 'text-[16px] leading-[22px] font-bold',
      'l-bold': 'text-[20px] leading-[22px] font-bold',

      's-italic': 'text-[12px] leading-[16px] italic font-medium',
      'm-italic': 'text-[16px] leading-[22px] italic font-medium',
      'l-italic': 'text-[20px] leading-[27px] italic font-medium',

      's-bold-italic': 'text-[12px] leading-[16px] italic font-bold',
      'm-bold-italic': 'text-[16px] leading-[22px] italic font-bold',
      'l-bold-italic': 'text-[20px] leading-[27px] italic font-bold',
    },
  },
  defaultVariants: {
    variant: 's',
  },
});
