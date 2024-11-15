import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { TaskProvider } from "./context/TaskContext";
test('Renders Task List Exercise title', () => {
  render(<TaskProvider><App /></TaskProvider>);

  const titleElement = screen.getByText(/Task List Exercise/i);
  expect(titleElement).toBeInTheDocument();
});
