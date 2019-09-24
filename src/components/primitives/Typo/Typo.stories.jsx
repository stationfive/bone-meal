import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { muiTheme } from 'storybook-addon-material-ui';
import { Box, Container } from '@material-ui/core';
import Typo from '.';
import theme from '../../../themeConfig/theme';

storiesOf('Typography', module)
  .addDecorator(muiTheme(theme))
  .add('Typo', () => (
    <Container>
      <Box bgcolor="background.default" color="text.primary">
        <Typo>Standard</Typo>
        <Typo variant="h1">Heading1</Typo>
        <Typo variant="h2">Heading2</Typo>
        <Typo variant="h3">Heading3</Typo>
        <Typo variant="h4">Heading4</Typo>
        <Typo variant="h5">Heading5</Typo>
        <Typo variant="body0">Body0</Typo>
        <Typo variant="body1">Body1</Typo>
        <Typo variant="body2">Body2</Typo>
        <Typo variant="body3">Body3</Typo>
        <Typo variant="body4">Body4</Typo>
        <Typo variant="body5">Body5</Typo>
        <Typo variant="formField">FormField</Typo>
        <Typo variant="formFieldBold">FormFieldBold</Typo>
      </Box>
    </Container>
  ));
