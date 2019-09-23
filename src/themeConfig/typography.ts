import {
  TypographyOptions,
  TypographyStyleOptions,
} from '@material-ui/core/styles/createTypography';
import { fontFamilies, rootFontSizePx } from './themeConstants';

const { montserrat } = fontFamilies;
const pxToRem = (n: number) => `${n / rootFontSizePx}rem`;

const typography: TypographyOptions = {
  h1: {
    fontFamily: montserrat,
    fontSize: '24px',
    fontStyle: 'black',
    lineHeight: '91%',
  },
  h2: {
    fontFamily: montserrat,
    fontSize: pxToRem(20),
    fontStyle: 'SemiBold',
    lineHeight: '139%',
  },
  h3: {
    fontFamily: montserrat,
    fontSize: pxToRem(18),
    fontStyle: 'black',
    lineHeight: '121%',
    letterSpacing: '-2%',
  },
  h4: {
    fontFamily: montserrat,
    fontSize: pxToRem(30),
    fontStyle: 'Reg',
    lineHeight: '76%',
  },
  h5: {
    fontFamily: montserrat,
    fontSize: pxToRem(14),
    fontStyle: 'bold',
    letterSpacing: '117%',
  },
  body1: {
    fontFamily: montserrat,
    fontSize: pxToRem(14),
    fontStyle: 'regular',
    lineHeight: '117%',
  },
  body2: {
    fontFamily: montserrat,
    fontSize: pxToRem(14),
    fontStyle: 'light',
    lineHeight: '117%',
  },
};

export interface TypoOptsExtra {
  body0: TypographyStyleOptions;
  body3: TypographyStyleOptions;
  body4: TypographyStyleOptions;
  body5: TypographyStyleOptions;
  formField: TypographyStyleOptions;
  formFieldBold: TypographyStyleOptions;
}

const appTypo: TypoOptsExtra = {
  body0: {
    fontFamily: montserrat,
    fontSize: pxToRem(16),
    lineHeight: '143%',
    // color: colors.primaryWhite,
  },
  body3: {
    fontFamily: montserrat,
    fontSize: pxToRem(12),
    lineHeight: '117%',
    // color: colors.primaryWhite,
  },
  body4: {
    fontFamily: montserrat,
    fontSize: pxToRem(11),
    lineHeight: '104%',
  },
  body5: {
    fontFamily: montserrat,
    fontSize: pxToRem(11),
    lineHeight: '100%',
  },
  formField: {
    fontFamily: montserrat,
    fontSize: pxToRem(16),
    lineHeight: '100%',
    // color: colors.primaryWhite,
    letterSpacing: '1px',
  },
  formFieldBold: {
    fontFamily: montserrat,
    fontSize: pxToRem(16),
    fontStyle: 'bold',
    lineHeight: '100%',
    // color: colors.primaryWhite,
    letterSpacing: '1px',
  },
};

export const appTypoVariantMapping = {
  body3: 'body2',
  body4: 'body2',
  body5: 'body2',
  formField: 'body2',
  formFieldBold: 'body2',
};

export default {
  ...typography,
  ...appTypo,
};
