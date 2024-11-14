import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import TaskList from "./components/Tasks/TaskList";
import AddTask from "./components/Tasks/AddTask";
import Filter from "./components/Filter/Filter";
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
  const [filter, setFilter] = useState<"all" | PriorityType.Low | PriorityType.Medium | PriorityType.High>("all");

  // Load tasks from localStorage on initial render
  const loadTasksFromLocalStorage = () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks && savedTasks.length) {
      return JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        priority: Number(task.priority) as PriorityType,
      }));
    }
    return [];
  };

  useEffect(() => {
    const tasksFromLocalStorage = loadTasksFromLocalStorage();
    setTasks(tasksFromLocalStorage);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);
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

  // Update task title and description
  const updateTask = (id: number, newTitle: string, newDescription: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle, description: newDescription } : task
    );
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Filter tasks based on priority
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {

      if (filter === "all") return true
      else return task.priority === Number(filter)

    })
  }, [tasks, filter]);

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
      {/* Priority Filter */}
      <Filter filter={filter} onChange={setFilter} />
      {/* Display task list */}
      <TaskList
        tasks={filteredTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </AppContainer>
  );
}

export default App;
