import React from "react";
import Task from "./Task";
import styled from "styled-components";
import { TaskType } from "types";
import { Draggable, Droppable } from 'react-beautiful-dnd'

const TaskListContainer = styled.div`
display: flex;
flex-wrap: wrap;
background-color: #f4f4f4;
justify-content: center;
padding: 20px 0;
border-radius: 8px;
`;

interface TaskListProps {
    tasks: TaskType[];
    updateTask: (id: number, newTitle: string, newDescription: string) => void;
    deleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, updateTask, deleteTask }) => {
    return (
        <Droppable droppableId="taskList">
            {(provided) => (
                <TaskListContainer
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <Task
                                        task={task}
                                        updateTask={updateTask}
                                        deleteTask={deleteTask}
                                    />
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </TaskListContainer>
            )}
        </Droppable>
    );
};

export default TaskList;
