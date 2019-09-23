import { configure } from '@storybook/react';

const req = require.context('../src/components', true, /.stories.(t|j)sx$/);
function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
