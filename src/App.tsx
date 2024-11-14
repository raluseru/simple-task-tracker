import React, { useState } from "react";

import styled from "styled-components";
import AddTask from "./components/Tasks/AddTask";
import { TaskType, PriorityType } from "./types";

const AppContainer = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 16px;
  background-color: #f4f4f4;
`;
const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [priority, setPriority] = useState<PriorityType>(PriorityType.Low);


  // Add a new task
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim() && newDescription.trim()) {
      const newTask: TaskType = {
        id: Date.now(),
        title: newTitle,
        description: newDescription,
        priority: priority,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTitle("");
      setNewDescription("");
      setPriority(PriorityType.Low);
    }
  };
  return (
    <AppContainer>
      <h1>Task List Exercise</h1>
      {/* Add Task */}
      <AddTask
        title={newTitle}
        description={newDescription}
        priority={priority}
        onNameChange={setNewTitle}
        onDescriptionChange={setNewDescription}
        onPriorityChange={setPriority}
        onSubmitForm={addTask}
      />
      {tasks.map((task, index) => (
        <ul data-index={index}>
          <li>{task.title}</li>
          <li>{task.description}</li>
          <li>{task.priority}</li>
        </ul>
      ))}
    </AppContainer>
  );
}

export default App;
