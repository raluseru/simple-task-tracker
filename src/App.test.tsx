import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Task List Exercise title', () => {
  render(<App />);

  const titleElement = screen.getByText(/Task List Exercise/i);
  expect(titleElement).toBeInTheDocument();
});
