import React, { useState } from "react";
import styled from "styled-components";
import { PriorityType } from "types";
import { useTaskContext } from "../../../context/TaskContext";
import { TaskType } from "types"
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 16px;
  background-color: #f4f4f4;
  max-width: 300px;
`;

const TaskInputDescription = styled.textarea`
flex: 1;
padding: 8px;
border: 1px solid #ddd;
border-radius: 4px;
margin-bottom: 10px;
font-family: inherit;
font-size: 12px;
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

const AddTask: React.FC = () => {

  const { addTask } = useTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<PriorityType>(PriorityType.Low);
  const handleAddTask = () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and description are required.")
      return
    }

    const newTask: TaskType = {
      id: Date.now(), // Unique ID for the task
      title,
      description,
      priority,
    };

    addTask(newTask)
    setTitle("")
    setDescription("");
    setPriority(PriorityType.Low);
  };
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
      />
      <TaskInputDescription
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <Select
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
      >
        <option value={PriorityType.Low}>Low priority</option>
        <option value={PriorityType.Medium}>Medium priority</option>
        <option value={PriorityType.High}>High priority</option>
      </Select>
      <Button onClick={handleAddTask}>Add Task</Button>
    </Form>
  );
};

export default AddTask;