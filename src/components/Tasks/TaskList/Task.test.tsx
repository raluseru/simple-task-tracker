import { render, screen } from '@testing-library/react';
import Task from './Task';
test('Renders a task component', () => {
    const mockOnUpdateTask = jest.fn();
    const mockOnDeleteTask = jest.fn();
    const taskData = {
        id: 1,
        title: "Task 1",
        description: "Task 1 description",
        priority: 2
    }
    render(<Task
        key="1"
        task={taskData}
        updateTask={mockOnUpdateTask}
        deleteTask={mockOnDeleteTask} />);

    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("Task 1")).toBeInTheDocument();

});