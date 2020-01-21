// .storybook/config.js

import { configure } from '@storybook/react';
import '../src/index.css';

configure(require.context('../src/components', true, /\.stories\.js$/), module);