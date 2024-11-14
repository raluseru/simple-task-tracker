import { render, screen, fireEvent } from '@testing-library/react';
import AddTask from './AddTask';
import { PriorityType } from "../../types";

test('Renders Add a task component', () => {
  const mockOnChangeTitle = jest.fn();
  const mockOnChangeDesc = jest.fn();
  const mockOnChangePriority = jest.fn();
  const mockOnAdd = jest.fn();
  render(<AddTask
    title="task 1"
    description="task 1 desc"
    priority={PriorityType.Medium}
    onNameChange={mockOnChangeTitle}
    onDescriptionChange={mockOnChangeDesc}
    onPriorityChange={mockOnChangePriority}
    onSubmitForm={mockOnAdd} />);

  expect(screen.getByText("Low")).toBeInTheDocument();
  expect(screen.getByText("Medium")).toBeInTheDocument();
  expect(screen.getByText("High")).toBeInTheDocument();

});
test("Calls onChange when a priority option is selected", () => {
  const mockOnChangeTitle = jest.fn();
  const mockOnChangeDesc = jest.fn();
  const mockOnChangePriority = jest.fn();
  const mockOnAdd = jest.fn();
  render(<AddTask
    title="task 1"
    description="task 1 desc"
    priority={PriorityType.Medium}
    onNameChange={mockOnChangeTitle}
    onDescriptionChange={mockOnChangeDesc}
    onPriorityChange={mockOnChangePriority}
    onSubmitForm={mockOnAdd}
  />);

  // Simulate a change in the filter select
  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: PriorityType.Medium },
  });

  // Check that onChange was called with the correct value
  expect(mockOnChangePriority).toHaveBeenCalledWith(PriorityType.Medium);
});