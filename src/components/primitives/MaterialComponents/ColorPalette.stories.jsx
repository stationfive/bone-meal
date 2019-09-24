import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { muiTheme } from 'storybook-addon-material-ui';
import { Box, Container } from '@material-ui/core';
import { Typo } from '..';
import theme from '../../../themeConfig/theme';

storiesOf('Color Palette', module)
  .addDecorator(muiTheme(theme))
  .add('Color Palette', () => (
    <Container>
      <Typo color="textPrimary">Background color</Typo>
      <Box bgcolor="primary.main" color="primary.contrastText" p={3}>
        <Typo>Primary</Typo>
      </Box>
      <Box bgcolor="secondary.main" color="secondary.contrastText" p={3}>
        <Typo>Secondary</Typo>
      </Box>
    </Container>
  ));
