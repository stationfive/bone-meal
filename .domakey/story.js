const tmplBody = `import React from 'react';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import {
  Container,
  Box,
  CssBaseline,
} from '@material-ui/core';

import theme from '../../../themeConfig/theme';
//import YourImport from './';

storiesOf('{{fileName}}', module)
  .addDecorator(muiTheme(theme))
  .add('{{fileName}} primary', () => (
    <>
      <CssBaseline />
      <Container bgcolor="background.default">
      </Container>
    </>
  ));
`;

module.exports = async ({ cliArgs, cliFlags, templateName, makey }) => {
  const filePathFull = cliArgs[0] || (await makey.ask('File path of new story:'));

  if (!filePathFull) throw Error('Domakey story aborted with no file name provided');

  const [fileName] = (
    (fileSplit) => [
      fileSplit[fileSplit.length - 1],
      filePathFull.substr(0, filePathFull.length - fileSplit[fileSplit.length - 1].length),
    ]
  )(filePathFull.split('/'));

  makey.createFile(
    `./src/${filePathFull}.stories.jsx`,
    makey.templateReplace(tmplBody, { fileName }),
  );
 };
