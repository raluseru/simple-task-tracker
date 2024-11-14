import React from "react";
import styled from "styled-components";
import { PriorityType } from "types";

interface AddTaskProps {
  title: string;
  description: string,
  priority: PriorityType.Low | PriorityType.Medium | PriorityType.High,
  onNameChange: (title: string) => void,
  onDescriptionChange: (description: string) => void,
  onPriorityChange: (priority: PriorityType.Low | PriorityType.Medium | PriorityType.High) => void,
  onSubmitForm: (e: any) => void;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  color: white;
  background-color: rgb(28, 202, 216);
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgba(28, 202, 216,0.7);
  }
`;

const AddTask: React.FC<AddTaskProps> = ({ title, description, priority, onNameChange, onDescriptionChange, onPriorityChange, onSubmitForm }) => {


  return (
    <Form onSubmit={onSubmitForm}>
      <Input
        type="text"
        value={title}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Task Title"
      />
      <Input
        type="text"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Task Description"
      />
      <Select
        value={priority}
        onChange={(e) => onPriorityChange(Number(e.target.value) as PriorityType)}
      >
        <option value={PriorityType.Low}>Low</option>
        <option value={PriorityType.Medium}>Medium</option>
        <option value={PriorityType.High}>High</option>
      </Select>
      <Button type="submit">Add Task</Button>
    </Form>
  );
};

export default AddTask;