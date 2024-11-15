import React from "react";
import styled from "styled-components";
import { PriorityType } from "../../types";

const FilterContainer = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 10px;
width: 100%;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 200px;
  cursor: pointer;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

interface FilterProps {
  filter: "all" | PriorityType.Low | PriorityType.Medium | PriorityType.High;
  onChange: (filter: "all" | PriorityType.Low | PriorityType.Medium | PriorityType.High) => void;
}

const Filter: React.FC<FilterProps> = ({ filter, onChange }) => {
  return (
    <FilterContainer>
      <Label>Filter by Priority: </Label>
      <Select value={filter} onChange={(e) => onChange(e.target.value as "all" | PriorityType.Low | PriorityType.Medium | PriorityType.High)}>
        <option value="all">All</option>
        <option value={PriorityType.Low}>Low</option>
        <option value={PriorityType.Medium}>Medium</option>
        <option value={PriorityType.High}>High</option>
      </Select>
    </FilterContainer>
  );
};

export default Filter;
