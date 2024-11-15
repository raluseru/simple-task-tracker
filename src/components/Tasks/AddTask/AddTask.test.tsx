import { render, screen } from '@testing-library/react';
import AddTask from './AddTask';

test('Renders Add a task component', () => {

  render(<AddTask />);

  expect(screen.getByText("Low")).toBeInTheDocument();
  expect(screen.getByText("Medium")).toBeInTheDocument();
  expect(screen.getByText("High")).toBeInTheDocument();

});
