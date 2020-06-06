import { action } from '@storybook/addon-actions';
import React from 'react';

import Button from './Button';

export default {
  title: 'Button Component',
  component: Button,
};

export const DefaultButton = (): JSX.Element => (
  <Button onClick={action('clicked')}>Default Button</Button>
);
