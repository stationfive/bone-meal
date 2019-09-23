import { colors } from './themeConstants';

const { darkBlack, primaryBlue, primaryWhite, darkTeal } = colors;

const palette = {
  background: {
    default: darkBlack,
  },
  primary: {
    main: primaryBlue,
    contrastText: darkBlack,
  },
  secondary: {
    main: darkTeal,
    contrastText: primaryWhite,
  },
  text: {
    primary: primaryWhite,
  },
};

export default palette;
