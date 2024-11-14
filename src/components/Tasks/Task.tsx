import React, { useState } from "react";
import styled, { css } from "styled-components";
import { TaskType, PriorityType } from "../../types";

const TaskContainer = styled.div<{ $priority: PriorityType }>`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;

  ${(props) =>
    props.$priority === PriorityType.Low &&
    css`
      border-left: 5px solid rgb(84, 140, 47);
    `}
  ${(props) =>
    props.$priority === PriorityType.Medium &&
    css`
      border-left: 5px solid rgb(233, 217, 133);
    `}
  ${(props) =>
    props.$priority === PriorityType.High &&
    css`
      border-left: 5px solid rgb(204, 68, 75);
    `}
`;

const TaskTitleWrapper = styled.div`
flex: 1;
padding: 0 8px;
`

const TaskText = styled.div`
`;

const TaskDescription = styled.span`
  font-size: 10px;
`;

const PriorityLabel = styled.span<{ priority: PriorityType }>`
  margin-left: 8px;
  font-size: 12px;
  color: #999;
  font-weight: bold;
  text-transform: capitalize;

  ${(props) =>
    props.priority === PriorityType.Low &&
    css`
      color: rgb(84, 140, 47);
    `}
  ${(props) =>
    props.priority === PriorityType.Medium &&
    css`
      color: rgb(233, 217, 133);
    `}
  ${(props) =>
    props.priority === PriorityType.High &&
    css`
      color: rgb(204, 68, 75);
    `}
`;

const TaskInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button<{ color: string; }>`
  margin-left: 8px;
  padding: 5px 8px;
  border: none;
  background-color: ${(props) => props.color || "#007bff"};
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: "#0056b3";
  }
`;


interface TaskProps {
  task: TaskType;
  updateTask: (id: number, newTitle: string, newDescription: string) => void;
  deleteTask: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, updateTask, deleteTask }) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleUpdate = () => {
    updateTask(task.id, newTitle, newDescription);
    setEditing(false);
  };

  return (
    <TaskContainer $priority={task.priority}>
      {editing ? (
        <>
          <TaskInput
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <TaskInput
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <Button color="#28a745" onClick={handleUpdate}>
            Save
          </Button>
        </>
      ) : (
        <>
          <TaskTitleWrapper>

            <TaskText>{task.title}</TaskText>
            <TaskDescription>{task.description}</TaskDescription>
          </TaskTitleWrapper>
          <PriorityLabel priority={task.priority}>
            {PriorityType[task.priority]}
          </PriorityLabel>
          <Button color="#504B43" onClick={() => setEditing(true)}>
            Edit
          </Button>
          <Button color="#CC444B" onClick={() => deleteTask(task.id)}>
            Delete
          </Button>
        </>
      )}
    </TaskContainer>
  );
};

export default Task;
