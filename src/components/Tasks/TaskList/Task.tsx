import React, { useState } from "react";
import styled, { css } from "styled-components";
import { TaskType, PriorityType } from "types";

const TaskContainer = styled.div<{ $priority: PriorityType }>`
  width: 200px;
  max-width: 200px;
  min-height: 220px;
  max-height: 220px;
  overflow: auto;
  margin-bottom: 10px;
  margin-right:10px;
  padding: 10px 5px;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: rgba(162, 162, 162, 0.45) 0px 25px 20px -20px;
  @media (max-width: 768px) {
    width:  300px;
    max-width: 300px;
  }

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
const TaskHeader = styled.div`
width: 100%;
text-align:right;
margin-bottom: 10px;
`
const TaskTitleWrapper = styled.div`
flex: 1;
flex-grow:1;
padding: 0 8px;
`

const TaskText = styled.div`
`;

const TaskDescription = styled.span`
  font-size: 12px;
`;

const PriorityLabel = styled.span<{ priority: PriorityType }>`
  margin-left: 8px;
  font-size: 10px;
  color: #fff;
  padding:4px 8px;
  border-radius: 4px;
  text-transform: uppercase;

  ${(props) =>
    props.priority === PriorityType.Low &&
    css`
      background-color: rgb(84, 140, 47);
    `}
  ${(props) =>
    props.priority === PriorityType.Medium &&
    css`
    background-color: rgb(233, 217, 133);
    `}
  ${(props) =>
    props.priority === PriorityType.High &&
    css`
    background-color: rgb(204, 68, 75);
    `}
`;

const TaskInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TaskInputDescription = styled.textarea`
flex: 1;
padding: 8px;
border: 1px solid #ddd;
border-radius: 4px;
margin-bottom: 20px;
font-family: inherit;
font-size: 12px;
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
          <TaskInputDescription
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <Button color="#28a745" onClick={handleUpdate}>
            Save
          </Button>
        </>
      ) : (
        <>
          <TaskHeader>
            <Button color="#504B43" onClick={() => setEditing(true)}>
              Edit
            </Button>
            <Button color="#CC444B" onClick={() => deleteTask(task.id)}>
              Delete
            </Button>
          </TaskHeader>

          <TaskTitleWrapper>
            <TaskText>{task.title}</TaskText>
            <TaskDescription>{task.description}</TaskDescription>
            <PriorityLabel priority={task.priority}>
              {PriorityType[task.priority]}
            </PriorityLabel>
          </TaskTitleWrapper>

        </>
      )}
    </TaskContainer>
  );
};

export default Task;
