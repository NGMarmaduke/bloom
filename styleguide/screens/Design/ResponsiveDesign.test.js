import React from 'react';
import { render } from 'react-dom';

import ResponsiveDesign from './ResponsiveDesign';

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link: ({ children }) => <span>{ children }</span>,
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<ResponsiveDesign />, div);
});
