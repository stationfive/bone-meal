import { TypographyProps } from '@material-ui/core/Typography';
import { TypoOptsExtra } from '../../../themeConfig/typography';

export type TypoPublicProps = TypographyProps & {
  variant?: TypographyProps['variant'] | keyof TypoOptsExtra;
};
