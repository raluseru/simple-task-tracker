import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "./Filter";
import { PriorityType } from "../../types";
describe("Filter Component", () => {
    test("Renders Filter component with all options", () => {

        const mockOnChange = jest.fn();

        render(<Filter filter="all" onChange={mockOnChange} />);

        // Check that the component is displayed with all elements
        expect(screen.getByText("Filter by Priority:")).toBeInTheDocument();
        expect(screen.getByText("All")).toBeInTheDocument();
        expect(screen.getByText("Low")).toBeInTheDocument();
        expect(screen.getByText("Medium")).toBeInTheDocument();
        expect(screen.getByText("High")).toBeInTheDocument();

    });

    test("calls onChange when a filter option is selected", () => {
        const mockOnChange = jest.fn();
        render(<Filter filter="all" onChange={mockOnChange} />);

        // Simulate a change in the filter select
        fireEvent.change(screen.getByRole("combobox"), {
            target: { value: PriorityType.Medium },
        });

        // Check that onChange was called with the correct value
        expect(mockOnChange).toHaveBeenCalledWith((`${PriorityType.Medium}`));
    });
});
