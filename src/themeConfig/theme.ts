import { createMuiTheme, Theme } from '@material-ui/core/styles';
import overrides from './overrides';
import palette from './palette';
import typography from './typography';

const theme: Theme = createMuiTheme({
  overrides,
  palette,
  typography,
});

export default theme;
