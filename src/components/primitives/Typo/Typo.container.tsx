import React, { FC } from 'react';

import MuiTypography, { TypographyProps } from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { TypoPublicProps } from './Typo.props';
import typography, {
  appTypoVariantMapping,
} from '../../../themeConfig/typography';

import { fallback } from '../../../utils/Data';

interface Styles {
  root: {};
}

const useStyles = makeStyles(
  (): Styles => ({
    root: ({ variant }: { variant: TypoPublicProps['variant'] }) =>
      fallback(
        // @ts-ignore
        t => t[variant],
        {},
        typography,
      ),
  }),
);

const TypoContainer: FC<TypoPublicProps> = (ownProps: TypoPublicProps) => {
  const variant = fallback(
    // @ts-ignore
    p => appTypoVariantMapping[p.variant],
    ownProps.variant,
    ownProps,
  );

  // todo: deep merge these two results in case `root` is used in both (for e.g.)
  const classes = {
    ...useStyles(ownProps),
    ...ownProps.classes,
  };

  const combinedProps: TypographyProps = {
    ...ownProps,
    variant,
    classes,
  };

  return <MuiTypography {...combinedProps}>{ownProps.children}</MuiTypography>;
};

export default TypoContainer;
